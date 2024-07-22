import { BookmarkProps } from "@/constants/types";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import router from "next/router";
import ReactIcon from "./ReactIcon";
import { requestData } from "@/service/api";

// 로그인 상태 => 북마크 클릭시, 서버 수정 요청
// 미로그인 상태 => 북마크 클릭시, 로그인 페이지로 이동
const Bookmark = ({ session, update, gymId, size }: BookmarkProps) => {
  const [isMarked, setIsMarked] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarkedFromServer = async () => {
      try {
        const onSuccess = (
          data: boolean | ((prevState: boolean) => boolean)
        ) => {
          setIsMarked(data);
        };
        requestData({
          option: "GET",
          url: `/gyms/${gymId}/check/bookmark`,
          session: session,
          update: update,
          hasBody: true,
          onSuccess,
        });
      } catch (error) {
        console.error("북마크 GET 에러", error);
      }
    };
    if (session) {
      fetchMarkedFromServer();
    }
  }, [gymId, session]);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    if (session) {
      const onSuccess = (data: { status: boolean }) => {
        setIsMarked(data.status);
      };

      requestData({
        option: "POST",
        url: `/gyms/${gymId}/bookmark`,
        session: session,
        update,
        hasBody: true,
        onSuccess,
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <S.BookmarkWrapper onClick={handleClick}>
      {isMarked ? (
        <ReactIcon clickable={true}>
          <IoBookmark size={size} color="#666666" />
        </ReactIcon>
      ) : (
        <ReactIcon clickable={true}>
          <IoBookmarkOutline size={size} color="#666666" />
        </ReactIcon>
      )}
    </S.BookmarkWrapper>
  );
};

const S = {
  BookmarkWrapper: styled.button`
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
  `,
};

export default Bookmark;
