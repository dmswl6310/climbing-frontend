import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Client, IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import ChatForm from "./ChatForm";
import ChatHistory from "./ChatHistory";
import { SOCKET_ADDRESS } from "@/constants/constants";

const Socket = () => {
  const { data: session, status } = useSession();
  console.log(session); // 세션 확인
  const clientRef = useRef(
    new Client({
      brokerURL: `ws://${SOCKET_ADDRESS}/ws/chat`,
      // connectHeaders: { Authorization: "Bearer " + session?.jwt },
    }),
  );
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const client = clientRef.current;
    console.log("STOMP 클라이언트:"); // 클라이언트 생성 확인
    console.log(client);

    const onClientConnect = () => {
      console.log("연결 성공");
      console.log("구독 시도");
      client.subscribe("/app", (message) => {
        console.log(message); // 서버에서 도착한 메시지 확인
      });
      client.publish({
        destination: "/queue",
        body: JSON.stringify({
          type: "ENTER",
          roodId: "testId",
          sender: "test user",
          message: "유저 test user가 접속했습니다.",
        }),
      });
    };

    const onClientDisconnect = () => {
      console.log("연결 종료");
    };

    const onClientError = (frame: IFrame) => {
      console.log("에러 발생");
      console.log(frame); // 에러 확인
    };

    client.onConnect = onClientConnect;
    client.onDisconnect = onClientDisconnect;
    client.onStompError = onClientError;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const handleSend = (message: string) => {
    if (!clientRef.current.connected) {
      console.log("소켓 연결 안됨");
      return;
    }
    clientRef.current.publish({
      destination: "/queue",
      body: JSON.stringify({ type: "TALK", roodId: "testId", sender: "test user", message }),
    });
    setMessages((prev) => [...prev, message]);
  };

  return (
    <S.Wrapper>
      <S.Container>
        <ChatHistory messages={messages} />
        <ChatForm handleSend={handleSend} />
      </S.Container>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    box-sizing: border-box;
    position: absolute;
    bottom: 70px;
    right: 70px;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #cacaca;
    background: #fafafa;
    width: 300px;
    height: 450px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  `,
};

export default Socket;
