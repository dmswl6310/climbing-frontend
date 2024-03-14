import { useEffect, useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { IoShareSocialOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Tag from "@/components/Tag";
import GradeBar from "@/components/gyms/GradeBar";
import ContactInfo from "@/components/gyms/ContactInfo";
import DynamicMap from "@/components/gyms/DynamicMap";
import PricingTable from "@/components/gyms/PricingTable";
import OpenHoursTable from "@/components/gyms/OpenHoursTable";
import ImageCarousel from "@/components/gyms/ImageCarousel";
import Comments from "@/components/gyms/Comments";
import useApi from "@/hooks/useApi";
import { GYM_API, MEMBER_API, NAVERMAP_API } from "@/constants/constants";
import Bookmark from "@/components/Bookmark";

// 임시
const TEST_ID = "75334254-93a8-4cfb-afec-29e368ac0803";

const GymInfo = ({
  gymData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentLikes, setCurrentLikes] = useState<number>(gymData.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const { data: session } = useSession();
  const { isLoading } = useApi(NAVERMAP_API);

  useEffect(() => {
    if (!session || !session.user) return;

    fetch(`${MEMBER_API}${session.user.email}/like?gym=${gymData.id}`)
      .then((res) => (res.ok ? res.json() : false))
      .then((userLiked) => setIsLiked(userLiked));
  }, [gymData.id, session]);

  const handleLike = async () => {
    if (!session || !session.user) return;

    if (isLiked) {
      try {
        // 좋아요 해제: 멤버 데이터에 반영
        const memberRes = await fetch(
          `${MEMBER_API}${session.user.email}/like?gym=${TEST_ID},value=false`
        );
        if (!memberRes.ok) throw new Error("DB에 반영 실패");

        // 좋아요 해제: 암장 데이터에 반영
        await fetch(`${GYM_API}${TEST_ID}`, {
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
          `${MEMBER_API}${session.user.email}/like?gym=${TEST_ID},value=true`
        );
        if (!memberRes.ok) throw new Error("DB에 반영 실패");

        // 좋아요 추가: 암장 데이터에 반영
        await fetch(`${GYM_API}${TEST_ID}`, {
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
                      gymId={TEST_ID}
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
            id={TEST_ID}
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
  /* 
  암장 정보를 불러오는 API가 준비될 시 아래 코드로 교체 예정:
  // const gymId = context.query.id;
  // Fetch API data
  const gymData = await (await fetch(`${GYM_API}${gymId}`)).json();
  return { props: { gymData } };
  */

  // 임시 데이터
  try {
    const gymId = TEST_ID;
    const gymData = await (await fetch(`${GYM_API}${gymId}`)).json();
    return { props: { gymData } };
  } catch (e) {
    const gymData = {
      id: "75334254-93a8-4cfb-afec-29e368ac0803",
      name: "암장 테스트점",
      address: {
        jibunAddress: "경기도 성남시 분당구 대장동 627-5",
        roadAddress: "경기도 성남시 분당구 판교대장로 92",
        unitAddress: "4층",
      },
      coordinates: {
        latitude: 37.3670275,
        longitude: 127.068454,
      },
      contact: "02-123-4567",
      latestSettingDay: "24.02.18",
      imageThumbnails: [
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_fb7feda3-4540-487e-a0e6-5b1b4fa62bd4.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_c41f93dd-f257-4718-b2f4-ce2ca8acc98c.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_2c0e71b6-15e5-4f12-ac7b-9aa9ce744851.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_85ae553e-7630-4ad4-b394-1952e0176104.JPEG",
      ],
      images: [
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/fb7feda3-4540-487e-a0e6-5b1b4fa62bd4.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/c41f93dd-f257-4718-b2f4-ce2ca8acc98c.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/2c0e71b6-15e5-4f12-ac7b-9aa9ce744851.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/85ae553e-7630-4ad4-b394-1952e0176104.JPEG",
      ],
      accommodations: ["샤워실", "요가매트", "짐볼"],
      grades: ["#FF6355", "#FBA949", "#FAE442", "#8BD448", "#2AA8F2"],
      sns: {
        twitter: "asd321sd32fsdfsdfsdf",
        instagram: "dfasdfdd____________",
        facebook: "dfklajsdlkfjsdfsdfsd",
      },
      description:
        "1940년대 프랑스 전문 산악인들의 교육 훈련용으로 시작된 이후, 인공으로 만들어진 암벽 구조물을 손과 발을 사용하여 등반하는 레저스포츠로 발전하였다. '인공암벽등반'이라고도 한다. 유럽과 러시아, 미국으로 전파되어 다양한 국제 대회가 개최되었고, 1987년 국제산악연맹(UIAA)에서 스포츠클라이밍에 관한 규정을 제정하면서 스포츠 경기로서의 규칙을 갖추었다. 한국에는 1988년에 도입되었고, 전국적으로 빠르게 보급되어 사계절 내내 즐길 수 있는 레저 스포츠로서 각광받고 있다.",
      defaultImage:
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/a62a1d97-c81c-4d3a-8594-63f40795548f.JPEG",
      pricing: [
        {
          item: "1일 체험권 (이용+암벽화)",
          price: "50000",
        },
        {
          item: "1일 체험권 (이용+암벽화+강습)",
          price: "100000",
        },
        {
          item: "연간 이용권 (+ 초호화뷔페 식사권)",
          price: "9900000",
        },
      ],
      openHours: [
        {
          days: "weekdays",
          openTime: "AM,09,00",
          closeTime: "PM,11,00",
        },
        {
          days: "weekends",
          openTime: "PM,12,00",
          closeTime: "PM,09,00",
        },
        {
          days: "holidays",
          openTime: "PM,01,00",
          closeTime: "PM,05,00",
        },
      ],
      homepage: "https://www.naver.com/",
      tags: ["판타스틱", "암벽경험", "인생운동", "암장"],
      comments: [
        { user: "클라이밍", date: "22.02.18", text: "여기 너무 좋아요" },
        { user: "암장", date: "22.02.18", text: "샤워시설이 깨끗하고 좋아요" },
        {
          user: "닉네임",
          date: "22.02.18",
          text: "난이도가 적절해서 좋았어요",
        },
      ],
    };
    return { props: { gymData } };
  }
};

export default GymInfo;
