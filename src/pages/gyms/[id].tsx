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
          {gymData.tags && (
            <div className="container">
              <h4>관련 태그</h4>
              {gymData.tags.map((tag: string, i: number) => (
                <Tag key={i} prefix="#" text={tag} />
              ))}
            </div>
          )}
          {gymData.pricing && (
            <div className="container">
              <h4>이용금액</h4>
              <PricingTable pricing={gymData.pricing} />
            </div>
          )}
          {gymData.openHours && (
            <div className="container">
              <h4>영업시간</h4>
              <OpenHoursTable openHours={gymData.openHours} />
            </div>
          )}
          {gymData.accommodations && (
            <div className="container">
              <h4>시설 정보</h4>
              {gymData.accommodations.join(', ')}
            </div>
          )}
          {gymData.grades && (
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
    width: 400px;

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
      address: {
        jibunAddress: '서울시 강남구 테헤란로 1004',
        roadAddress: '서울시 강남구 테헤란로 1004',
        unitAddress: '4층',
      },
      coordinates: {
        latitude: 37.3595704,
        longitude: 127.1054221,
      },
      name: '클라이밍성지',
      description: `1940년대 프랑스 전문 산악인들의 교육 훈련용으로 시작된 이후, 인공으로 만들어진 암벽 구조물을 손과 발을 사용하여 등반하는 레저스포츠로 발전하였다. '인공암벽등반'이라고도 한다. 유럽과 러시아, 미국으로 전파되어 다양한 국제 대회가 개최되었고, 1987년 국제산악연맹(UIAA)에서 스포츠클라이밍에 관한 규정을 제정하면서 스포츠 경기로서의 규칙을 갖추었다. 한국에는 1988년에 도입되었고, 전국적으로 빠르게 보급되어 사계절 내내 즐길 수 있는 레저 스포츠로서 각광받고 있다. 제32회 올림픽경기대회(도쿄 올림픽)부터 올림픽 정식 종목으로 채택되었다.`,
      grades: ['#FF6355', '#FBA949', '#FAE442', '#8BD448', '#2AA8F2'],
      defaultImage:
        'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/59197312-a099-4c23-8a23-177e03272901.JPEG',
      images: [
        'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/661f97a9-d19a-4445-9ee1-efaf8ebda07b.JPEG',
        'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/fb7feda3-4540-487e-a0e6-5b1b4fa62bd4.JPEG',
        'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/c41f93dd-f257-4718-b2f4-ce2ca8acc98c.JPEG',
        'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/2c0e71b6-15e5-4f12-ac7b-9aa9ce744851.JPEG',
        'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/85ae553e-7630-4ad4-b394-1952e0176104.JPEG',
      ],
      openHours: [
        {
          days: 'weekdays',
          openTime: 'AM,12,00',
          closeTime: 'AM,05,10',
        },
        {
          days: 'weekends',
          openTime: 'AM,12,00',
          closeTime: 'PM,05,30',
        },
      ],
      pricing: [
        { item: '일일 이용권', price: '10,000' },
        { item: '주간 멤버십(이용+암벽화+강습)', price: '89,000' },
        { item: '월간 멤버십(사우나 포함)', price: '100,000' },
      ],
      accommodations: [
        '샤워실',
        '무료 wifi',
        '락커',
        '요가매트',
        '짐볼',
        '어린이 놀이터',
      ],
      tags: ['암벽', '짱', '운동', '하세요'],
      contact: '02-112-4568',
      sns: {
        twitter: 'sdlfkj',
        facebook: 'goje_sdflj',
        instagram: 'oie4rkf2',
      },
    };
    return { props: { gymData } };
  }
};

export default GymInfo;
