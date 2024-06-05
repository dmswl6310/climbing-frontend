import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Client, type IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import { MdOutlineClose, MdOutlineSupportAgent } from "react-icons/md";
import Socket from "./Socket";
import { SERVER_ADDRESS, SOCKET_ADDRESS } from "@/constants/constants";

interface ChatModalProps {
  gymId: string;
  gymName: string;
}

const ChatModal = ({ gymId, gymName }: ChatModalProps) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<null | Client>(null);
  const [roomId, setRoomId] = useState<null | string>(null);

  useEffect(() => {
    if (!session || client) return;

    const clientInstance = new Client({
      brokerURL: `${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session.jwt.accessToken },
    });

    const joinRoom = async () => {
      // 추후 existing room fetch 로직 추가 (성공 시 fetch한 roomId 사용)
      // ↓ 신규 room 생성
      try {
        const res = await fetch(`${SERVER_ADDRESS}/chat/room/${gymId}`, {
          method: "POST",
          headers: { Authorization: "Bearer " + session.jwt.accessToken },
        });
        if (res.redirected) throw new Error("로그인이 필요한 서비스입니다.");
        const { roomId } = await res.json();
        setRoomId(roomId);
      } catch (e) {
        console.log(e);
      }
    };

    clientInstance.activate();

    clientInstance.onConnect = () => {
      joinRoom();
      setClient(clientInstance);
    };

    clientInstance.onStompError = (frame: IFrame) => {
      console.log("에러 발생");
      console.log(frame); // 에러 확인
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const toggleModal = () => {
    if (isOpen) {
      setIsOpen(false);
      if (client && client.connected) {
        client.publish({
          destination: "/app/chat/message",
          body: JSON.stringify({
            type: "LEAVE",
            roomId: roomId,
          }),
        });
      }
    } else if (!isOpen) {
      setIsOpen(true);
      if (client && client.connected) {
        client.publish({
          destination: "/app/chat/message",
          body: JSON.stringify({
            type: "ENTER",
            roomId: roomId,
            sender: session?.user.email,
          }),
        });
      }
    }
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.Button $isOpen={isOpen} onClick={toggleModal}>
          {isOpen ? <MdOutlineClose size="2.2rem" /> : <MdOutlineSupportAgent size="2.2rem" />}
        </S.Button>
        {isOpen && <Socket gymName={gymName} client={client} roomId={roomId} />}
      </S.Modal>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: fixed;
    z-index: 100;
    bottom: 40px;
    right: 40px;
  `,
  Modal: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  Button: styled.div<{ $isOpen: boolean }>`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ $isOpen }) => ($isOpen ? "coral" : "black")};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
  `,
};

export default ChatModal;
