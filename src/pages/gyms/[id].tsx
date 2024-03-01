import { useEffect, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import styled from 'styled-components';
import {
  IoShareSocialOutline,
  IoHeart,
  IoHeartOutline,
  IoBookmark,
  IoBookmarkOutline,
} from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import Tag from '@/components/Tag';
import GradeBar from '@/components/GradeBar';
import ContactInfo from '@/components/ContactInfo';
import DynamicMap from '@/components/DynamicMap';
import PricingTable from '@/components/PricingTable';
import OpenHoursTable from '@/components/OpenHoursTable';
import ImageCarousel from '@/components/ImageCarousel';

const TEST_ID = '75334254-93a8-4cfb-afec-29e368ac0803';

const GymInfo = ({
  gymData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // 네이버 지도 API 로딩 관련 상태
  const [isLoading, setIsLoading] = useState(true);

  // 네이버 지도 API를 동적으로 로딩 및 적용
  useEffect(() => {
    const mapApi =
      'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=lm660e08li';
    const script = document.querySelector(
      `script[src='${mapApi}']`,
    ) as HTMLScriptElement;

    if (script) {
      handleLoader();
      return;
    }

    const newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = mapApi;
    document.head.appendChild(newScript);
    newScript.onload = handleLoader;
  }, []);

  // API 로딩 상태 핸들러
  const handleLoader = () => {
    setIsLoading(false);
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
          <div className="sub-header">
            <FaLocationDot /> {gymData.address.roadAddress}
            <br />
            <div className="sub-name">
              <span>{gymData.name}</span>&nbsp;
              <IoHeartOutline /> <IoBookmarkOutline /> <IoShareSocialOutline />
            </div>
          </div>
          {gymData.description && (
            <div className="description">{gymData.description}</div>
          )}
          {isLoading ? null : <DynamicMap coordinates={gymData.coordinates} />}
          <div>댓글</div>
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
              {gymData.accommodations.join(', ')}
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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  /* 
  암장 정보를 불러오는 API가 준비될 시 아래 코드로 교체 예정:
  // const gymId = context.query.id;
  // Fetch API data
  const gymData = await (await fetch(`.../gyms/${gymId}`)).json();
  return { props: { gymData } };
  */

  // 임시 데이터
  try {
    const gymId = TEST_ID;
    const gymData = await (
      await fetch(`http://localhost:3000/gyms/${gymId}`)
    ).json();
    return { props: { gymData } };
  } catch (e) {
    const gymData = {
      "id": "75334254-93a8-4cfb-afec-29e368ac0803",
      "name": "암장 테스트점",
      "address": {
        "jibunAddress": "경기도 성남시 분당구 대장동 627-5",
        "roadAddress": "경기도 성남시 분당구 판교대장로 92",
        "unitAddress": "4층"
      },
      "coordinates": {
        "latitude": 37.3670275,
        "longitude": 127.068454
      },
      "contact": "02-123-4567",
      "latestSettingDay": "24.02.18",
      "imageThumbnails": [
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_fb7feda3-4540-487e-a0e6-5b1b4fa62bd4.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_c41f93dd-f257-4718-b2f4-ce2ca8acc98c.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_2c0e71b6-15e5-4f12-ac7b-9aa9ce744851.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_85ae553e-7630-4ad4-b394-1952e0176104.JPEG"
      ],
      "images": [
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/fb7feda3-4540-487e-a0e6-5b1b4fa62bd4.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/c41f93dd-f257-4718-b2f4-ce2ca8acc98c.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/2c0e71b6-15e5-4f12-ac7b-9aa9ce744851.JPEG",
        "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/85ae553e-7630-4ad4-b394-1952e0176104.JPEG"
      ],
      "accommodations": ["샤워실", "요가매트", "짐볼"],
      "grades": ["#FF6355", "#FBA949", "#FAE442", "#8BD448", "#2AA8F2"],
      "sns": {
        "twitter": "asd321sd32fsdfsdfsdf",
        "instagram": "dfasdfdd____________",
        "facebook": "dfklajsdlkfjsdfsdfsd"
      },
      "description": "1940년대 프랑스 전문 산악인들의 교육 훈련용으로 시작된 이후, 인공으로 만들어진 암벽 구조물을 손과 발을 사용하여 등반하는 레저스포츠로 발전하였다. '인공암벽등반'이라고도 한다. 유럽과 러시아, 미국으로 전파되어 다양한 국제 대회가 개최되었고, 1987년 국제산악연맹(UIAA)에서 스포츠클라이밍에 관한 규정을 제정하면서 스포츠 경기로서의 규칙을 갖추었다. 한국에는 1988년에 도입되었고, 전국적으로 빠르게 보급되어 사계절 내내 즐길 수 있는 레저 스포츠로서 각광받고 있다.",
      "defaultImage": "https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/a62a1d97-c81c-4d3a-8594-63f40795548f.JPEG",
      "pricing": [
        {
          "item": "1일 체험권 (이용+암벽화)",
          "price": "50000"
        },
        {
          "item": "1일 체험권 (이용+암벽화+강습)",
          "price": "100000"
        },
        {
          "item": "연간 이용권 (+ 초호화뷔페 식사권)",
          "price": "9900000"
        }
      ],
      "openHours": [
        {
          "days": "weekdays",
          "openTime": "AM,09,00",
          "closeTime": "PM,11,00"
        },
        {
          "days": "weekends",
          "openTime": "PM,12,00",
          "closeTime": "PM,09,00"
        },
        {
          "days": "holidays",
          "openTime": "PM,01,00",
          "closeTime": "PM,05,00"
        }
      ],
      "homepage": "https://www.naver.com/",
      "tags": ["판타스틱", "암벽경험", "인생운동", "암장"]
    };
    return { props: { gymData } };
  }
};

export default GymInfo;
