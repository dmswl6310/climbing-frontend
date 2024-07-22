import { styled } from "styled-components";
import PreviewCard from "../common/PreviewCard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { requestData } from "@/service/api";
import { SimpleGymData } from "@/constants/gyms/types";

const MyBookmark = () => {
  const { data: session, status, update } = useSession();
  const [items, setItems] = useState<SimpleGymData[]>();

  useEffect(() => {
    if (session) {
      requestData({
        option: "GET",
        url: "/members/bookmark",
        session,
        onSuccess: (data) => setItems(data),
        hasBody: true,
        update,
      });
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
