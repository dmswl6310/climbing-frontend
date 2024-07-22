import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import { IoHeart, IoHeartOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Bookmark from "../common/Bookmark";
import { requestData } from "@/service/api";
import { SERVER_ADDRESS } from "@/constants/constants";
import { COLOR } from "@/styles/global-color";
import type { GymData } from "@/constants/gyms/types";

const MainContent = ({ gymData }: { gymData: GymData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState<number>(
    gymData.likeNumber || 0
  );
  const { data: session, update } = useSession();

  // useEffect(() => {
  //   if (!session || !session.user) return;
  //   requestData({
  //     option: "GET",
  //     url: `/${session.user.email}/like?gym=${gymData.id}`,
  //     onSuccess: (data) => setIsLiked(data),
  //   });
  // }, [gymData.id, session]);

  const handleLike = async () => {
    if (!session || !session.user) return;

    if (isLiked) {
      try {
        // 좋아요 해제: 멤버 데이터에 반영
        const memberRes = await fetch(
          `${SERVER_ADDRESS}/members/${session.user.email}/like?gym=${gymData.id},value=false`
        );
        if (!memberRes.ok) throw new Error("DB에 반영 실패");

        // 좋아요 해제: 암장 데이터에 반영
        await fetch(`${SERVER_ADDRESS}/gyms/${gymData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likeNumber: (gymData.likeNumber || 0) - 1 }),
        });
      } catch (e) {
        // 에러 핸들링
        console.log(e);
        return;
      }
      // 좋아요 해제: 현재 렌더링에 반영
      setCurrentLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      try {
        // 좋아요 추가: 멤버 데이터에 반영
        const memberRes = await fetch(
          `${SERVER_ADDRESS}/members/${session.user.email}/like?gym=${gymData.id},value=true`
        );
        if (!memberRes.ok) throw new Error("DB에 반영 실패");

        // 좋아요 추가: 암장 데이터에 반영
        await fetch(`${SERVER_ADDRESS}/gyms/${gymData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likeNumber: (gymData.likeNumber || 0) + 1 }),
        });
      } catch (e) {
        // 에러 핸들링
        console.log(e);
        return;
      }
      // 좋아요 추가: 현재 렌더링에 반영
      setCurrentLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <>
      <div>
        <div className="address">
          <FaLocationDot /> {gymData.address.roadAddress}{" "}
          {gymData.address.unitAddress}
        </div>
        <div className="header">
          <span className="header__text">{gymData.name}</span>&nbsp;
          <div className="icons">
            {session ? (
              <>
                {/* <S.Icon $clickable={true} onClick={handleLike}>
                    {isLiked ? <IoHeart size="1.3rem" /> : <IoHeartOutline size="1.3rem" />}
                    {currentLikes}
                  </S.Icon> */}
                <S.Icon $clickable={true}>
                  <Bookmark
                    update={update}
                    session={session}
                    gymId={gymData.id as string}
                    size="1.3rem"
                  />
                </S.Icon>
              </>
            ) : (
              <S.Icon $clickable={false}>
                <IoHeartOutline size="1.3rem" />
                {currentLikes}
              </S.Icon>
            )}
            {gymData.homepage && (
              <S.Icon $clickable={true}>
                <S.Link href={gymData.homepage} target="_blank">
                  <IoShareSocialOutline size="1.3rem" />
                </S.Link>
              </S.Icon>
            )}
          </div>
        </div>
      </div>
      {gymData.description && (
        <div className="description">{gymData.description}</div>
      )}
    </>
  );
};

const S = {
  Link: styled(Link)`
    text-decoration: none;
    color: inherit;
    line-height: 0.5;
    height: inherit;
  `,
  Icon: styled.div<{ $clickable: boolean }>`
    display: flex;
    align-items: center;
    color: ${COLOR.BACKGROUND_DARK};
    cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  `,
};

export default MainContent;
