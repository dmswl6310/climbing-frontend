import { styled } from "styled-components";
import PreviewCard from "../PreviewCard";
import { GymSampleInfo } from "@/pages/home";
import { useEffect, useState } from "react";
import { sampleGyms } from "../LazyLoadingItems";
import { useSession } from "next-auth/react";

const MyBookmark = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<GymSampleInfo[]>();

  useEffect(() => {
    const fetchBookmarksFromServer = async () => {
      try {
        // const response = await fetch(`/api/bookmarks/`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: { sessionId },
        //   },
        // });
        // const data = await response.json();
        const data = sampleGyms;
        setItems(data);
      } catch (error) {
        console.error("내 북마크 GET 에러", error);
      }
    };
    if (session) {
      fetchBookmarksFromServer();
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
