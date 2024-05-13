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
  const clientRef = useRef<Client | null>(null);

  const onServerMessage = (res: Message) => {
    if (!session) return;
    const messageBody = JSON.parse(res.body);
    const { type, message, sender } = messageBody;
    console.log(messageBody);

    if (type === "TALK") {
      const newMessage = {
        userType: sender === session.user.email ? "manager" : "customer",
        message,
        time: Date.now(),
      };
      setMessages((prev) => [...(prev ?? []), newMessage]);
    }
  };

  useEffect(() => {
    if (!session || clientRef.current) return;

    clientRef.current = new Client({
      brokerURL: `ws://${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session.jwt.accessToken },
    });
    const client = clientRef.current;

    requestData({
      option: "GET",
      url: `/chat/room/${roomId}`,
      token: session.jwt.accessToken,
      onSuccess: (roomData: Chatroom) => setRoomName(roomData.roomName),
    });

    const onClientConnect = () => {
      client.subscribe(`/queue/chat/room/${roomId}`, onServerMessage);
      client.publish({
        destination: "/app/chat/message",
        body: JSON.stringify({
          type: "ENTER",
          roomId,
          sender: session.user.email,
        }),
      });
    };

    const onClientError = (frame: IFrame) => {
      console.log("에러 발생");
      console.log(frame); // 에러 확인
    };

    client.onConnect = onClientConnect;
    client.onStompError = onClientError;
    client.activate();

    return () => {
      client.publish({
        destination: "/app/chat/message",
        body: JSON.stringify({
          type: "LEAVE",
          roomId,
        }),
      });
      client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleSend = (message: string) => {
    if (message === "" || !clientRef.current) return;
    if (!clientRef.current.connected) {
      console.log("소켓 연결 안됨");
      return;
    }
    clientRef.current.publish({
      destination: "/app/chat/message",
      body: JSON.stringify({
        type: "TALK",
        roomId,
        sender: session?.user.email,
        message,
      }),
    });
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
  // 채팅기록 fetch해서 props로 전달, 컴포넌트 내에 상태를 갖고 초기값을 fetch한 기록으로 설정
  return { props: { roomId } };
};

export default ChatPopup;
