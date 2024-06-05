import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Client, type StompSubscription, type Message } from "@stomp/stompjs";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import ChatForm from "./ChatForm";
import ChatHistory from "./ChatHistory";
import ErrorFallback from "../common/ErrorFallback";
import LoginPrompt from "../common/LoginPrompt";
import { type ChatHistoryProps, ChatHistoryContext } from "@/ChatHistoryContext";

interface SocketProps {
  gymName: string;
  client: Client | null;
  roomId: string | null;
}

const Socket = ({ gymName, client, roomId }: SocketProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const subscriptionRef = useRef<null | StompSubscription>(null);
  const { history, updateHistory } = useContext(ChatHistoryContext);
  const currentHistory = useRef(history);

  const onServerMessage = (res: Message) => {
    if (!roomId) return;
    const messageBody = JSON.parse(res.body);
    const { type, message, sender } = messageBody;
    console.log(messageBody);

    if (type === "TALK") {
      const newMessage = {
        userType: sender === session?.user.email ? "customer" : "manager",
        message,
        time: Date.now(),
      };
      const newHistory: ChatHistoryProps = { ...currentHistory.current };
      newHistory[roomId as keyof typeof newHistory] = [
        ...(currentHistory.current?.[roomId as keyof typeof currentHistory.current] || []),
        newMessage,
      ];
      currentHistory.current = { ...currentHistory.current, ...newHistory };
      updateHistory((prev) => ({ ...prev, ...newHistory }));
    }
  };

  useEffect(() => {
    if (!isLoading) return;
    if ((!session && !client && !isLoading) || (client && !client.connected)) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    if (client?.connected && !subscriptionRef.current) {
      console.log("roomId: " + roomId);
      subscriptionRef.current = client.subscribe(`/queue/chat/room/${roomId}`, onServerMessage);
      setIsLoading(false);
    }

    // const loadedHistory: ChatHistoryProps = {};

    // 해당 room의 이전 채팅기록 fetch하고 context에 업데이트
    // fetch()
    // loadedHistory[roomId as keyof typeof loadedHistory] = "fetch한 값"
    // updateHistory((prev) => ({ ...prev, ...loadedHistory }));
    // currentHistory.current = {...loadedHistory}

    return () => {
      subscriptionRef.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, client]);

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
        type: "TALK",
        roomId: roomId,
        sender: session.user.email,
        message,
      }),
    });
    return true;
  };

  return (
    <S.Wrapper>
      <S.Container>
        {isError ? (
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
