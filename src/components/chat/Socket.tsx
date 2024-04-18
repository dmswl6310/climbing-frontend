import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Client, IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import ChatForm from "./ChatForm";
import ChatHistory from "./ChatHistory";
import { SOCKET_ADDRESS } from "@/constants/constants";
import type { MessageFormat } from "./ChatHistory";

const Socket = () => {
  const { data: session, status } = useSession();
  console.log("세션");
  console.log(session); // 세션 확인

  const clientRef = useRef(
    new Client({
      brokerURL: `ws://${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session?.user.token },
    }),
  );
  const roomRef = useRef("");
  const [messages, setMessages] = useState<MessageFormat[]>(sampleData);

  useEffect(() => {
    const client = clientRef.current;
    console.log("STOMP 클라이언트:"); // 클라이언트 생성 확인
    console.log(client);

    const onClientConnect = () => {
      console.log("연결 성공");
      console.log("구독 시도");
      client.subscribe("/app", (message) => {
        console.log(message); // 서버에서 도착한 메시지 확인
        // ENTER 타입일 경우 리턴받은 roomId를 ref에 저장
        // roomRef.current = roomId;

        // TALK 타입일 경우 리턴받은 message를 현재 상태에 추가
        // setMessages((prev) => [...prev, message]);
      });
      client.publish({
        destination: "/queue",
        body: JSON.stringify({
          type: "ENTER",
          sender: "testUser@gmail.com",
        }),
      });
    };

    const onClientDisconnect = () => {
      console.log("연결 종료");
      client.publish({
        destination: "/queue",
        body: JSON.stringify({
          type: "LEAVE",
        }),
      });
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
    if (roomRef.current === "") {
      console.log("입장한 방이 없음");
      return;
    }
    clientRef.current.publish({
      destination: "/queue",
      body: JSON.stringify({
        type: "TALK",
        roomId: roomRef.current,
        sender: "testUser@gmail.com",
        message,
      }),
    });

    // 렌더링 확인용 (테스트 후 삭제)
    // const pickRandomUser = () => {
    //   const rand = Math.random() * 100;
    //   return rand > 50 ? "customer" : "admin";
    // };
    // setMessages((prev) => [...prev, { userType: pickRandomUser(), message, time: Date.now() }]);
  };

  return (
    <S.Wrapper>
      <S.Container>
        <ChatHistory history={messages} />
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
    border-radius: 16px;
    padding: 20px;
    border: 1px solid #cacaca;
    box-shadow: 0 3px 7px #cacaca;
    width: 370px;
    height: 500px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  `,
};

const sampleData = [
  {
    userType: "customer",
    message: "dflkajsdf",
    time: 1711215412079,
  },
  {
    userType: "admin",
    message: "dflkajsdf",
    time: 1711225692079,
  },
  {
    userType: "admin",
    message: "dflkajsdf",
    time: 1712226312579,
  },
  {
    userType: "customer",
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis nesciunt maxime nam vel accusantium fugiat enim recusandae cumque est eligendi?",
    time: 1712226412091,
  },
  {
    userType: "admin",
    message: "dflkajsdf",
    time: 1712237512879,
  },
  {
    userType: "admin",
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis nesciunt maxime nam vel accusantium fugiat enim recusandae cumque est eligendi?",
    time: 1712237622981,
  },
];

export default Socket;
