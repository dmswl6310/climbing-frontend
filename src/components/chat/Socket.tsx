import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Client, Message, type IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import ChatForm from "./ChatForm";
import ChatHistory from "./ChatHistory";
import LoginPrompt from "../common/LoginPrompt";
import { type ChatHistoryProps, ChatHistoryContext } from "@/ChatHistoryContext";
import { SERVER_ADDRESS, SOCKET_ADDRESS } from "@/constants/constants";

const Socket = ({ gymName, gymId }: { gymName: string; gymId: string }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const clientRef = useRef<null | Client>(null);
  const roomRef = useRef(null);
  const { history, updateHistory } = useContext(ChatHistoryContext);
  const currentHistory = useRef(history);

  const onServerMessage = (res: Message) => {
    if (!session || !roomRef.current) return;
    const messageBody = JSON.parse(res.body);
    const { type, message, sender } = messageBody;
    console.log(messageBody);

    if (type === "TALK") {
      const newMessage = {
        userType: sender === session.user.email ? "customer" : "admin",
        message,
        time: Date.now(),
      };
      const newHistory: ChatHistoryProps = { ...currentHistory.current };
      newHistory[roomRef.current as keyof typeof newHistory] = [
        ...(currentHistory.current?.[roomRef.current as keyof typeof currentHistory.current] || []),
        newMessage,
      ];
      currentHistory.current = { ...currentHistory.current, ...newHistory };
      updateHistory((prev) => ({ ...prev, ...newHistory }));
    }
  };

  useEffect(() => {
    if (!session) return setIsLoading(false);

    clientRef.current = new Client({
      brokerURL: `ws://${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session.jwt.accessToken },
    });
    const client = clientRef.current;

    const connectClient = async () => {
      try {
        await getRoomId();
      } catch (e) {
        console.log(e);
        return;
      }

      client.onConnect = () => {
        console.log("roomId: " + roomRef.current);
        client.subscribe(`/queue/chat/room/${roomRef.current}`, onServerMessage);
        client.publish({
          destination: "/app/chat/message",
          body: JSON.stringify({
            type: "ENTER",
            roomId: roomRef.current,
            sender: session.user.email,
          }),
        });
      };

      client.onStompError = (frame: IFrame) => {
        console.log("에러 발생");
        console.log(frame); // 에러 확인
      };

      client.activate();
      setIsLoading(false);
    };

    const getRoomId = async () => {
      const res = await fetch(`${SERVER_ADDRESS}/chat/room`, {
        method: "POST",
        headers: { Authorization: "Bearer " + session.jwt.accessToken },
      });
      if (res.redirected) throw new Error("로그인이 필요한 서비스입니다.");
      const { roomId } = await res.json();
      roomRef.current = roomId;
    };

    const loadedHistory: ChatHistoryProps = {};

    // 해당 room의 이전 채팅기록 fetch하고 context에 업데이트
    // fetch()
    // loadedHistory[roomRef.current as keyof typeof loadedHistory] = "fetch한 값"
    // updateHistory((prev) => ({ ...prev, ...loadedHistory }));
    // currentHistory.current = {...loadedHistory}

    connectClient();

    return () => {
      client.publish({
        destination: "/app/chat/message",
        body: JSON.stringify({
          type: "LEAVE",
          roomId: roomRef.current,
        }),
      });
      client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = (message: string) => {
    if (message === "") return;
    if (!clientRef.current || !clientRef.current.connected) {
      console.log("소켓 연결 안됨");
      return;
    }
    if (roomRef.current === "") {
      console.log("입장한 방이 없음");
      return;
    }
    clientRef.current.publish({
      destination: "/app/chat/message",
      body: JSON.stringify({
        type: "TALK",
        roomId: roomRef.current,
        sender: session?.user.email,
        message,
      }),
    });
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>{gymName}</S.Header>
        {isLoading ? null : session ? (
          <>
            <ChatHistory
              speaker="customer"
              history={currentHistory.current?.[roomRef.current ?? ""]}
            />
            <ChatForm placeholder="문의를 남겨주세요 :)" handleSend={handleSend} />
          </>
        ) : (
          <LoginPrompt />
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
};

export default Socket;
