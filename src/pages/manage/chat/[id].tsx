import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import ManageLayout from "@/components/manage/ManageLayout";
import ErrorFallback from "@/components/common/ErrorFallback";
import LoadContainer from "@/components/manage/LoadContainer";
import { requestData } from "@/service/api";
import { NavContext, type NavStateProps } from "@/NavContext";
import type { NextPageWithLayout } from "@/pages/_app";
import type { Chatroom, ChatroomRef } from "@/constants/manage/types";
import { TEST_ADDRESS } from "@/constants/constants";

const ChatPage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState<ChatroomRef[]>([]);
  const { selectedGymId } = useContext(NavContext) as NavStateProps;

  useEffect(() => {
    // if (!session) router.push({ pathname: "/login" });

    const fetchRooms = async () => {
      if (!id) return;
      const data = await (await fetch(`${TEST_ADDRESS}/chatrooms/${id}`)).json();
      setChatrooms(data.rooms);
      setIsLoading(false);
    };

    // const fetchRooms = async () => {
    //   requestData({
    //     option: "GET",
    //     url: "/chat/room",
    //     token: session?.jwt.accessToken,
    //     onSuccess: (chatrooms: Chatroom[]) => setChatrooms(chatrooms),
    //   });
    //   setIsLoading(false);
    // };

    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (selectedGymId !== null && selectedGymId !== id) {
      setIsLoading(true);
      router.push(`/manage/chat/${selectedGymId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGymId]);

  const handleChatroomClick = (roomId: number | string) => {
    const url = "/manage/chat/r/" + roomId;
    const existingWindow = openWindows.find((window) => window.url === url);
    if (!existingWindow) return openNewWindow(url);
    if (existingWindow.windowRef.closed) {
      setOpenWindows((prev) => prev.filter((room) => room.url !== url));
      openNewWindow(url);
    } else existingWindow.windowRef.focus();
  };

  const openNewWindow = (url: string) => {
    const newWindow = window.open(url, "_blank", "popup=true,left=50,top=50,width=370,height=550");
    setOpenWindows((prev) => [...prev, { url, windowRef: newWindow as Window }]);
    return;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ManageLayout>
        <S.Wrapper>
          {isLoading ? (
            <LoadContainer>
              <BarLoader />
            </LoadContainer>
          ) : (
            <>
              <S.Header>1:1 문의</S.Header>
              <S.Content $direction="column">
                {chatrooms.length > 0 ? (
                  chatrooms.map(({ roomId, roomName }) => (
                    <S.Row key={roomId} onClick={() => handleChatroomClick(roomId)}>
                      {roomName}님의 문의
                    </S.Row>
                  ))
                ) : (
                  <div>현재 진행 중인 채팅이 없습니다.</div>
                )}
              </S.Content>
            </>
          )}
        </S.Wrapper>
      </ManageLayout>
    </ErrorBoundary>
  );
};

export const getServerSideProps = async () => {
  return { props: {} };
};

const S = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 24px;
    padding: 32px 40px;
  `,
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;
  `,
  Row: styled.div`
    border: 1px solid #d0d0d0;
    background: #fafaf8;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
  `,
};

export default ChatPage;
