import { useEffect, useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { IoShareSocialOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Tag from "@/components/gyms/Tag";
import GradeBar from "@/components/gyms/GradeBar";
import ContactInfo from "@/components/gyms/ContactInfo";
import DynamicMap from "@/components/gyms/DynamicMap";
import PricingTable from "@/components/gyms/PricingTable";
import OpenHoursTable from "@/components/gyms/OpenHoursTable";
import ImageCarousel from "@/components/gyms/ImageCarousel";
import Comments from "@/components/gyms/Comments";
import Bookmark from "@/components/common/Bookmark";
import { requestData } from "@/service/api";
import useApi from "@/hooks/useApi";
import { GYM_API, MEMBER_API, NAVERMAP_API } from "@/constants/constants";

const GymInfo = ({
  gymData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentLikes, setCurrentLikes] = useState<number>(gymData.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const { data: session } = useSession();
  const { isLoading } = useApi(NAVERMAP_API);

  useEffect(() => {
    if (!session || !session.user) return;
    requestData({
      option: "GET",
      url: `/${session.user.email}/like?gym=${gymData.id}`,
      onSuccess: (data) => setIsLiked(data),
    });
  }, [gymData.id, session]);

  const handleLike = async () => {
    if (!session || !session.user) return;

    if (isLiked) {
      try {
        // 좋아요 해제: 멤버 데이터에 반영
        const memberRes = await fetch(
          `${MEMBER_API}${session.user.email}/like?gym=${gymData.id},value=false`
        );
        if (!memberRes.ok) throw new Error("DB에 반영 실패");

        // 좋아요 해제: 암장 데이터에 반영
        await fetch(`${GYM_API}${gymData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: (gymData.likes || 0) - 1 }),
        });
      } catch (e) {
        // 에러 핸들링
        return;
      }
      // 좋아요 해제: 현재 렌더링에 반영
      setCurrentLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      try {
        // 좋아요 추가: 멤버 데이터에 반영
        const memberRes = await fetch(
          `${MEMBER_API}${session.user.email}/like?gym=${gymData.id},value=true`
        );
        if (!memberRes.ok) throw new Error("DB에 반영 실패");

        // 좋아요 추가: 암장 데이터에 반영
        await fetch(`${GYM_API}${gymData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: (gymData.likes || 0) + 1 }),
        });
      } catch (e) {
        // 에러 핸들링
        return;
      }
      // 좋아요 추가: 현재 렌더링에 반영
      setCurrentLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <S.Wrapper>
      {!gymData.defaultImage && !gymData.images ? null : (
        <ImageCarousel
          defaultImage={gymData.defaultImage}
          imageList={gymData.images}
        />
      )}
      <S.InfoContainer>
        <S.Main>
          <div>
            <div className="address">
              <FaLocationDot /> {gymData.address.roadAddress}
            </div>
            <div className="header">
              <span className="header__text">{gymData.name}</span>&nbsp;
              {session ? (
                <div className="icons">
                  <S.Icon $clickable={true} onClick={handleLike}>
                    {isLiked ? (
                      <IoHeart size="1.3rem" />
                    ) : (
                      <IoHeartOutline size="1.3rem" />
                    )}
                    {currentLikes}
                  </S.Icon>{" "}
                  <S.Icon $clickable={true}>
                    <Bookmark
                      sessionId={session.user?.email as string}
                      gymId={gymData.id}
                      size="1.3rem"
                    />
                  </S.Icon>{" "}
                  {gymData.homepage ? (
                    <S.Icon $clickable={true}>
                      <S.Link href={gymData.homepage} target="_blank">
                        <IoShareSocialOutline size="1.3rem" />
                      </S.Link>
                    </S.Icon>
                  ) : null}
                </div>
              ) : (
                <div className="icons">
                  <S.Icon $clickable={false}>
                    <IoHeartOutline size="1.3rem" />
                    {currentLikes}
                  </S.Icon>{" "}
                  {gymData.homepage ? (
                    <S.Icon $clickable={true}>
                      <S.Link href={gymData.homepage} target="_blank">
                        <IoShareSocialOutline size="1.3rem" />
                      </S.Link>
                    </S.Icon>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          {gymData.description && (
            <div className="description">{gymData.description}</div>
          )}
          {isLoading ? null : <DynamicMap coordinates={gymData.coordinates} />}
          <Comments
            id={gymData.id}
            comments={gymData.comments}
            session={session}
          />
        </S.Main>
        <S.Side>
          {gymData.tags && gymData.tags.length > 0 && (
            <div className="container">
              <h4>관련 태그</h4>
              {gymData.tags.map((tag: string, i: number) => (
                <Tag key={i} prefix="#" text={tag} />
              ))}
            </div>
          )}
          {gymData.pricing && gymData.pricing.length > 0 && (
            <div className="container">
              <h4>이용금액</h4>
              <PricingTable pricing={gymData.pricing} />
            </div>
          )}
          {gymData.openHours && gymData.openHours.length > 0 && (
            <div className="container">
              <h4>영업시간</h4>
              <OpenHoursTable openHours={gymData.openHours} />
            </div>
          )}
          {gymData.accommodations && gymData.accommodations.length > 0 && (
            <div className="container">
              <h4>시설 정보</h4>
              {gymData.accommodations.join(", ")}
            </div>
          )}
          {gymData.grades && gymData.grades.length > 0 && (
            <div className="container">
              <h4>난이도</h4>
              <GradeBar grades={gymData.grades} />
            </div>
          )}
          <div className="container">
            <ContactInfo contact={gymData.contact} snsList={gymData.sns} />
          </div>
        </S.Side>
      </S.InfoContainer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .address {
      display: flex;
      align-items: center;
      gap: 6px;
      color: gray;
      margin-bottom: 18px;
    }

    .header {
      display: flex;
      align-items: flex-end;
    }

    .header__text {
      font-weight: 700;
      font-size: 2.5rem;
    }

    .icons {
      position: relative;
      bottom: 6px;
      display: flex;
      gap: 6px;
    }
  `,
  InfoContainer: styled.div`
    display: flex;
    width: 1200px;
    gap: 18px;
    margin-top: 40px;
  `,
  Main: styled.div`
    box-sizing: border-box;
    padding: 0px 18px;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    gap: 36px;
  `,
  Side: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 430px;

    & > div {
      box-sizing: border-box;
      padding: 24px 28px;
    }

    h4 {
      margin-top: 0;
      margin-bottom: 16px;
    }
  `,
  Icon: styled.div<{ $clickable: boolean }>`
    display: flex;
    align-items: center;
    color: #666666;
    cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  `,
  Link: styled(Link)`
    text-decoration: none;
    color: inherit;
    line-height: 0.5;
    height: inherit;
  `,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gymId = context.query.id;
  try {
    const gymData = await (await fetch(`${GYM_API}${gymId}`)).json();
    return { props: { gymData } };
  } catch (e) {
    return { notFound: true };
  }
};

export default GymInfo;
