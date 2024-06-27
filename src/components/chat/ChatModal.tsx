import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Client, type IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import { MdOutlineClose, MdOutlineSupportAgent } from "react-icons/md";
import Socket from "./Socket";
import { SERVER_ADDRESS, SOCKET_ADDRESS } from "@/constants/constants";
import { COLOR } from "@/styles/global-color";
import type { ChatModalProps, FetchedChatroom } from "@/constants/chat/types";

const fetchChatroom = async (
  gymId: string,
  nickname: string,
  token: string,
): Promise<FetchedChatroom> => {
  console.log("fetching chatroom");
  try {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeout = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(`${SERVER_ADDRESS}/chat/room-check/${nickname}/${gymId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      signal,
    });
    if (!response.ok) throw new Error("roomId를 불러올 수 없습니다.");
    clearTimeout(timeout);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
  return { exists: false, roomId: null };
};

const createRoom = async (gymId: string, nickname: string, token: string) => {
  console.log("creating room");
  try {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeout = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(`${SERVER_ADDRESS}/chat/room/${nickname}/${gymId}`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      signal,
    });
    if (response.redirected) throw new Error("로그인이 필요한 서비스입니다.");
    clearTimeout(timeout);
    const { id } = await response.json();
    console.log(id);
    return id;
  } catch (e) {
    console.log(e);
    // 에러 로깅
  }
  return null;
};

const ChatModal = ({ gymId, gymName }: ChatModalProps) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<null | Client>(null);
  const [roomId, setRoomId] = useState<null | string>(null);
  const [isRoomFetchError, setIsRoomFetchError] = useState(false);
  const [isSocketError, setIsSocketError] = useState(false);

  useEffect(() => {
    if (!session || client) return;

    const clientInstance = new Client({
      brokerURL: `${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session.jwt.accessToken },
    });

    const enterRoom = async () => {
      let roomId;
      const token = session.jwt.accessToken;
      const nickname = session.user.nickname;
      const chatroomData = await fetchChatroom(gymId, nickname, token);

      if (chatroomData.exists) roomId = chatroomData.roomId;
      else roomId = await createRoom(gymId, nickname, token);
      if (!roomId) return setIsRoomFetchError(true);

      setRoomId(roomId);
    };

    clientInstance.activate();

    clientInstance.onConnect = () => {
      setClient(clientInstance);
      enterRoom();
    };

    clientInstance.onStompError = (frame: IFrame) => {
      console.log("에러 발생");
      console.log(frame); // 에러 확인
      setIsSocketError(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <S.Wrapper>
      <S.Modal>
        <S.Button $isOpen={isOpen} onClick={toggleModal}>
          {isOpen ? <MdOutlineClose size="2.2rem" /> : <S.ModalIcon size="2.2rem" />}
        </S.Button>
        {isOpen && (
          <Socket
            gymName={gymName}
            client={client}
            roomId={roomId}
            isRoomFetchError={isRoomFetchError}
            isSocketError={isSocketError}
          />
        )}
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
    background: ${({ $isOpen }) => ($isOpen ? COLOR.BACKGROUND_DARK : COLOR.MAIN)};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 100ms;
    &:active {
      scale: 0.9;
    }
  `,
  ModalIcon: styled(MdOutlineSupportAgent)`
    &:hover {
      animation: bounce 2s infinite;
    }
    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      3% {
        transform: translateY(-4px);
      }
      10% {
        transform: translateY(0);
      }
      13% {
        transform: translateY(-4px);
      }
      20% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(0);
      }
    }
  `,
};

export default ChatModal;
