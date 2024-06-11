import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Client, type StompSubscription, type Message } from "@stomp/stompjs";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import ChatForm from "./ChatForm";
import ChatHistory from "./ChatHistory";
import ErrorFallback from "../common/ErrorFallback";
import LoginPrompt from "../common/LoginPrompt";
import {
  type ChatHistoryProps,
  ChatHistoryContext,
  getFormattedChatHistory,
} from "@/ChatHistoryContext";
import { requestData } from "@/service/api";

interface SocketProps {
  gymName: string;
  client: Client | null;
  roomId: string | null;
  isRoomFetchError: boolean;
  isSocketError: boolean;
}

const Socket = ({ gymName, client, roomId, isRoomFetchError, isSocketError }: SocketProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const subscriptionRef = useRef<null | StompSubscription>(null);
  const { history, updateHistory } = useContext(ChatHistoryContext);
  const currentHistory = useRef(history);

  // session값은 page visibility가 바뀔 때마다 갱신되기 때문에 사이드이펙트를 줄이기 위해 session dependency를 분리
  useEffect(() => {
    if (!session) setIsLoading(false);
  }, [session]);

  useEffect(() => {
    if (!session || !isLoading || !client || !roomId) return;

    const onServerMessage = (response: Message) => {
      const messageBody = JSON.parse(response.body);
      const { message, sender, createdAt } = messageBody;
      const newMessage = {
        userType: sender === session.user.nickname ? "customer" : "manager",
        message,
        createdAt,
      };
      const newHistory: ChatHistoryProps = { ...currentHistory.current };
      newHistory[roomId as keyof typeof newHistory] = [
        ...(currentHistory.current?.[roomId as keyof typeof currentHistory.current] || []),
        newMessage,
      ];
      currentHistory.current = { ...currentHistory.current, ...newHistory };
      updateHistory((prev) => ({ ...prev, ...newHistory }));
    };

    const fetchHistory = async () =>
      requestData({
        option: "GET",
        url: `/chat/find/message/${roomId}`,
        token: session.jwt.accessToken,
        onSuccess: (data) => {
          const loadedHistory: ChatHistoryProps = {};
          loadedHistory[roomId as keyof ChatHistoryProps] = getFormattedChatHistory(
            data,
            session.user.nickname,
            "manager",
            "customer",
          );
          updateHistory((prev) => ({ ...prev, ...loadedHistory }));
          currentHistory.current = { ...loadedHistory };
        },
        onError: () => {
          console.log("에러 발생");
        },
      });

    subscriptionRef.current = client.subscribe(`/queue/chat/room/${roomId}`, onServerMessage);
    setIsLoading(false);
    // 이전 채팅 기록을 fetch하고 context에 저장
    if (!currentHistory.current || !currentHistory.current[roomId]) fetchHistory();

    return () => subscriptionRef.current?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = (message: string) => {
    if (message === "") return false;
    if (!session) {
      console.log("로그인한 유저가 아님");
      return false;
    }
    if (!client || !client.connected) {
      console.log("소켓 연결 안됨");
      return false;
    }
    if (!roomId || roomId === "") {
      console.log("입장한 방이 없음");
      return false;
    }
    client.publish({
      destination: "/app/chat/message",
      body: JSON.stringify({
        roomId: roomId,
        sender: session.user.nickname,
        message,
      }),
    });
    return true;
  };

  return (
    <S.Wrapper>
      <S.Container>
        {isSocketError || isRoomFetchError ? (
          <ErrorFallback error={"Server error"} resetErrorBoundary={() => {}} />
        ) : (
          <>
            <S.Header>{gymName}</S.Header>
            {isLoading ? (
              <S.Loader>
                연결 중...
                <BarLoader />
              </S.Loader>
            ) : session ? (
              <>
                <ChatHistory speaker="customer" history={currentHistory.current?.[roomId ?? ""]} />
                <ChatForm placeholder="문의를 남겨주세요 :)" handleSend={handleSend} />
              </>
            ) : (
              <LoginPrompt />
            )}
          </>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    box-sizing: border-box;
    position: absolute;
    bottom: 75px;
    right: 0;
    border-radius: 16px;
    padding: 20px;
    border: 1px solid #cacaca;
    box-shadow: 0 3px 7px #cacaca;
    background: white;
    width: 370px;
    height: 500px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  `,
  Header: styled.div`
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
    padding-bottom: 8px;
    -webkit-box-shadow: 0 3px 7px -7px #cacaca;
    -moz-box-shadow: 0 3px 7px -7px #cacaca;
    box-shadow: 0 3px 7px -7px #cacaca;
  `,
  Loader: styled.div`
    display: grid;
    place-content: center center;
    height: 100%;
    text-align: center;
    gap: 1.3rem;
  `,
};

export default Socket;
