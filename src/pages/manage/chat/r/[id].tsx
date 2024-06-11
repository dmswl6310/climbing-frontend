import { useEffect, useRef, useState, type ReactElement } from "react";
import { useSession } from "next-auth/react";
import { Client, Message, type IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import ChatHistory, { type MessageFormat } from "@/components/chat/ChatHistory";
import ChatForm from "@/components/chat/ChatForm";
import GlobalStyle from "@/styles/global-styles";
import LoadContainer from "@/components/manage/LoadContainer";
import LoginPrompt from "@/components/common/LoginPrompt";
import { requestData } from "@/service/api";
import { getFormattedChatHistory } from "@/ChatHistoryContext";
import { SOCKET_ADDRESS } from "@/constants/constants";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { NextPageWithLayout } from "@/pages/_app";
import type { Chatroom } from "@/constants/manage/types";

const ChatPopup: NextPageWithLayout = ({
  roomId,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data: session, status } = useSession();
  const [roomName, setRoomName] = useState<null | string>(null);
  const [messages, setMessages] = useState<MessageFormat[] | undefined>(undefined);
  const [client, setClient] = useState<Client | null>(null);

  const onServerMessage = (response: Message) => {
    if (!session) return;
    const messageBody = JSON.parse(response.body);
    const { message, sender, createdAt } = messageBody;

    const newMessage = {
      userType: sender === session.user.nickname ? "manager" : "customer",
      message,
      createdAt,
    };
    setMessages((prev) => [...(prev ?? []), newMessage]);
  };

  useEffect(() => {
    if (!session || client) return;

    const clientInstance = new Client({
      brokerURL: `${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session.jwt.accessToken },
    });

    requestData({
      option: "GET",
      url: `/chat/room/${roomId}`,
      token: session.jwt.accessToken,
      onSuccess: (roomData: Chatroom) => setRoomName(roomData.roomName),
    });

    const fetchHistory = async () =>
      requestData({
        option: "GET",
        url: `/chat/find/message/${roomId}`,
        token: session.jwt.accessToken,
        onSuccess: (data) => {
          const loadedHistory = getFormattedChatHistory(
            data,
            session.user.nickname,
            "customer",
            "manager",
          );
          setMessages(loadedHistory);
        },
        onError: () => {
          console.log("에러 발생");
        },
      });

    clientInstance.activate();

    clientInstance.onConnect = () => {
      clientInstance.subscribe(`/queue/chat/room/${roomId}`, onServerMessage);
      setClient(clientInstance);
    };

    clientInstance.onStompError = (frame: IFrame) => {
      console.log("에러 발생");
      console.log(frame); // 에러 확인
    };

    fetchHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleSend = (message: string) => {
    if (message === "" || !session) return false;
    if (!client || !client.connected) {
      console.log("소켓 연결 안됨");
      return false;
    }
    client.publish({
      destination: "/app/chat/message",
      body: JSON.stringify({
        roomId,
        sender: session.user.nickname,
        message,
      }),
    });
    return true;
  };

  if (status === "loading")
    return (
      <LoadContainer>
        <BarLoader />
      </LoadContainer>
    );
  return (
    <S.Wrapper>
      {session ? (
        <>
          <S.Header>{roomName && `${roomName}님의 문의`}</S.Header>
          <S.Container>
            <ChatHistory speaker="manager" history={messages} />
            <ChatForm placeholder="답변하기" handleSend={handleSend} />
          </S.Container>
        </>
      ) : (
        <LoginPrompt />
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 100vh;
  `,
  Header: styled.div`
    display: grid;
    place-content: center start;
    padding: 12px 8px;
    box-shadow: 0 1px 5px #d0d0d0;
    font-weight: 700;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px;
    height: calc(100% - 70px);
  `,
};

ChatPopup.getLayout = (page: ReactElement) => (
  <>
    <GlobalStyle />
    {page}
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const roomId = context.query.id;
  return { props: { roomId } };
};

export default ChatPopup;
