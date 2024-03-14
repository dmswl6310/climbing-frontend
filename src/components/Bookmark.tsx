import { BookmarkProps } from "@/constants/types";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import router from "next/router";

// 로그인 상태 => 북마크 클릭시, 서버 수정 요청
// 미로그인 상태 => 북마크 클릭시, 로그인 페이지로 이동
const Bookmark = ({ sessionId, gymId, size }: BookmarkProps) => {
  const [isMarked, setIsMarked] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarkedFromServer = async () => {
      try {
        // const response = await fetch(`/api/bookmarks/${gymId}`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: { sessionId },
        //   },
        // });
        // const data = await response.json();
        const data = false;
        setIsMarked(data);
      } catch (error) {
        console.error("북마크 GET 에러", error);
      }
    };
    if (sessionId) {
      fetchMarkedFromServer();
    }
  }, [sessionId]);

  const handleClick = () => {
    try {
      if (sessionId) {
        //api(승아님) => `${MEMBER_API}${session.user.email}/like?gym=${TEST_ID},value=true`
        //   const response = await fetch(`/api/bookmarks/update/${gymId}`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: { sessionId },
        //     },
        //     body: JSON.stringify({ isMarked }),
        //   });
        //   const data = await response.json();
        setIsMarked(!isMarked);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("북마크 POST 에러", error);
    }
  };

  return (
    <S.BookmarkWrapper onClick={handleClick}>
      {isMarked ? (
        <IoBookmark size={size} />
      ) : (
        <IoBookmarkOutline size={size} />
      )}
    </S.BookmarkWrapper>
  );
};

const S = {
  BookmarkWrapper: styled.button`
    // 버튼의 기본효과 없애기
    border: 0;
    background-color: transparent;
  `,
};

export default Bookmark;
