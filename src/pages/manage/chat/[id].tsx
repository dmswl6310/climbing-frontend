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
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { NextPageWithLayout } from "@/pages/_app";
import type { Chatroom, ChatroomRef } from "@/constants/manage/types";

const ChatPage: NextPageWithLayout = ({
  id,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState<ChatroomRef[]>([]);
  const { selectedGymId } = useContext(NavContext) as NavStateProps;
  console.log(chatrooms);

  useEffect(() => {
    if (!session || !isLoading) return;
    requestData({
      option: "GET",
      url: `/chat/room/gym/${id}`,
      session,
      onSuccess: (data) => setChatrooms(data),
      onError: (e) => console.log(e),
      update,
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router]);

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
    const newWindow = window.open(
      url,
      "_blank",
      "popup=true,left=50,top=50,width=370,height=600"
    );
    setOpenWindows((prev) => [
      ...prev,
      { url, windowRef: newWindow as Window },
    ]);
    return;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ManageLayout>
        <h1 className="desktop-view" style={{ margin: 0 }}>
          1:1 문의
        </h1>
        <h2 className="mobile-view" style={{ margin: 0 }}>
          1:1 문의
        </h2>
        {isLoading ? (
          <LoadContainer>
            <BarLoader />
          </LoadContainer>
        ) : (
          <div className="editor-wrapper">
            <S.Content $direction="column">
              {chatrooms.length > 0 ? (
                chatrooms.map(({ id, roomName }) => (
                  <S.Row key={id} onClick={() => handleChatroomClick(id)}>
                    {roomName}님의 문의
                  </S.Row>
                ))
              ) : (
                <div>현재 진행 중인 1:1 문의가 없습니다.</div>
              )}
            </S.Content>
          </div>
        )}
      </ManageLayout>
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  return { props: { id } };
};

const S = {
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;
    @media ${DEVICE_SIZE.laptop} {
      padding: 1.3rem 1rem;
    }
  `,
  Row: styled.div`
    border: 1px solid ${COLOR.DISABLED};
    background: ${COLOR.BACKGROUND_LIGHT};
    border-radius: 12px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
  `,
};

export default ChatPage;
