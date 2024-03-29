import { styled } from "styled-components";
import PreviewCard from "../common/PreviewCard";
import { GymSampleInfo } from "@/pages/home";
import { useEffect, useState } from "react";
import { sampleGyms } from "../common/LazyLoadingItems";
import { useSession } from "next-auth/react";
import { requestData } from "@/service/api";

const MyBookmark = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<GymSampleInfo[]>();

  useEffect(() => {
    // const fetchBookmarksFromServer = async () => {
    //   try {
    // const response = await fetch(`/api/bookmarks/`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: { sessionId },
    //   },
    // });
    // const data = await response.json();
    //     const data = sampleGyms;
    //     setItems(data);
    //   } catch (error) {
    //     console.error("내 북마크 GET 에러", error);
    //   }
    // };
    if (session) {
      requestData({
        option: "GET",
        url: "/api/bookmarks",
        // sessionId:{session.user.sessionId}
        onSuccess: (data) => setItems(data),
      });
      // fetchBookmarksFromServer();
    }
  }, [session]);

  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <S.CardContainer>
      {items &&
        items.map((gymInfo, index) => {
          return (
            <PreviewCard
              key={index}
              width="350px"
              height="300px"
              cardInfo={gymInfo}
            />
          );
        })}
    </S.CardContainer>
  );
};

const S = {
  CardContainer: styled.div``,
};
export default MyBookmark;
