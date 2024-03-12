import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useBeforeunload } from 'react-beforeunload';
import styled from 'styled-components';
import ImageEditor from '@/components/admin/ImageEditor';
import BasicInfoEditor from '@/components/admin/BasicInfoEditor';
import DescriptionEditor from '@/components/admin/DescriptionEditor';
import OpenHoursEditor from '@/components/admin/OpenHoursEditor';
import AccommodationsEditor from '@/components/admin/AccommodationsEditor';
import GradeEditor from '@/components/admin/GradeEditor';
import PricingEditor from '@/components/admin/PricingEditor';
import SettingDayEditor from '@/components/admin/SettingDayEditor';
import { GymData } from '@/constants/gyms/types';
import { GYM_API } from '@/constants/constants';

const EditPage = () => {
  const [currentData, setCurrentData] = useState<GymData>(INITIAL_DATA);
  const [loadedData, setLoadedData] = useState<GymData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // 서버로부터 암장정보 fetch
  useEffect(() => {
    // 신규 생성일 경우 router query로 넘어온 데이터를 state에 저장하고 early return함
    if (router.query.newRegister) {
      const { gymData } = router.query;
      setLoadedData(JSON.parse(gymData as string));
      setCurrentData(JSON.parse(gymData as string));
      setIsLoading(false);
      return;
    }

    // 암장 등록이 돼있는 경우 fetch로 데이터를 불러와 state에 저장
    fetchData();
    setIsLoading(false);
  }, [router.query]);

  const isEdited = (oldData: any, newData: any) => {
    return JSON.stringify(oldData) !== JSON.stringify(newData);
  };

  useBeforeunload(
    isEdited(loadedData, currentData) ? (e) => e.preventDefault() : undefined,
  );

  const handlePageChange = (page: number) => {
    if (currentPage === page) return;
    const dataChanged = isEdited(loadedData, currentData);
    if (!dataChanged) return setCurrentPage(page);
    const response = confirm('수정 중인 데이터가 있습니다. 이동할까요?');
    if (response) {
      setCurrentData(JSON.parse(JSON.stringify(loadedData)));
      setCurrentPage(page);
    }
  };

  const fetchData = () => {
    /*
    // 전역상태에 저장된 관리자계정 정보로 fetch 요청
    const id = '전역상태에서 가져온 값';
    fetch(`API주소_${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoadedData(JSON.parse(JSON.stringify(data)));
        setCurrentData(JSON.parse(JSON.stringify(data)));
      })
      .catch((error) => {
        //에러 핸들링
      });
    */

    // 관리자계정 정보/API가 준비되기 전에 사용할 임의값
    fetch(`${testUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setLoadedData(JSON.parse(JSON.stringify(data)));
        setCurrentData(JSON.parse(JSON.stringify(data)));
      })
      .catch((error) => {
        // 테스트를 위한 임시방편 (추후 에러 핸들링 코드로 교체 필요)
        console.log(
          'json-server 서버가 오프라인입니다. 암장 정보를 샘플값으로 대체합니다.',
        );
        setLoadedData(JSON.parse(JSON.stringify(sampleData)));
        setCurrentData(JSON.parse(JSON.stringify(sampleData)));
      });
  };

  const updateData = async (data: string) => {
    await fetch(`${GYM_API}${currentData!.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
  };

  return (
    <S.Wrapper>
      <S.Sidebar>
        <h3>암장 정보 관리</h3>
        <S.Link onClick={() => handlePageChange(1)}>기본 정보</S.Link>
        <S.Link onClick={() => handlePageChange(2)}>상세 정보</S.Link>
        <h4>댓글 관리</h4>
      </S.Sidebar>
      {isLoading ? (
        <div>데이터 로딩 중</div>
      ) : (
        <S.Main>
          {currentPage === 1 ? (
            <>
              <ImageEditor
                loadedImages={loadedData.images}
                thumbnails={currentData.imageThumbnails}
                defaultImage={currentData.defaultImage}
                setCurrentData={setCurrentData}
                setLoadedData={setLoadedData}
                updateData={updateData}
              />
              <BasicInfoEditor
                name={currentData.name}
                address={currentData.address}
                contact={currentData.contact}
                snsList={currentData.sns}
                homepage={currentData.homepage}
                setCurrentData={setCurrentData}
              />
              <DescriptionEditor
                description={currentData.description}
                setCurrentData={setCurrentData}
              />
            </>
          ) : (
            <>
              <PricingEditor
                pricingList={currentData.pricing}
                setCurrentData={setCurrentData}
              />
              <OpenHoursEditor
                openHoursList={currentData.openHours}
                setCurrentData={setCurrentData}
              />
              <AccommodationsEditor
                accommodationsList={currentData.accommodations}
                setCurrentData={setCurrentData}
              />
              <GradeEditor
                gradesList={currentData.grades}
                setCurrentData={setCurrentData}
              />
              <SettingDayEditor
                date={currentData.latestSettingDay}
                setCurrentData={setCurrentData}
              />
            </>
          )}
          <button
            onClick={() => {
              const dataChanged = isEdited(loadedData, currentData);
              if (dataChanged) {
                updateData(JSON.stringify(currentData));
                setLoadedData(JSON.parse(JSON.stringify(currentData)));
              }
            }}
          >
            저장하기
          </button>
        </S.Main>
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Sidebar: styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 20vw;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    gap: 36px;
    background: #fafaf8;
    padding: 36px;
  `,
  Link: styled.div`
    cursor: pointer;

    &:hover {
      color: #1aabff;
    }
  `,
};

const INITIAL_DATA = {
  name: '',
  address: {
    jibunAddress: '',
    roadAddress: '',
    unitAddress: '',
  },
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  contact: '',
  latestSettingDay: '',
};

// 테스트용 상수값
const testId = '75334254-93a8-4cfb-afec-29e368ac0803';
const testUrl = `${GYM_API}${testId}`;
const sampleData = {
  id: '75334254-93a8-4cfb-afec-29e368ac0803',
  name: '암장 테스트점',
  address: {
    jibunAddress: '경기도 성남시 분당구 대장동 627-5',
    roadAddress: '경기도 성남시 분당구 판교대장로 92',
    unitAddress: '4층',
  },
  coordinates: {
    latitude: 37.3670275,
    longitude: 127.068454,
  },
  contact: '02-123-4567',
  latestSettingDay: '24.02.18',
  imageThumbnails: [
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_fb7feda3-4540-487e-a0e6-5b1b4fa62bd4.JPEG',
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_c41f93dd-f257-4718-b2f4-ce2ca8acc98c.JPEG',
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_2c0e71b6-15e5-4f12-ac7b-9aa9ce744851.JPEG',
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/thumb_85ae553e-7630-4ad4-b394-1952e0176104.JPEG',
  ],
  images: [
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/fb7feda3-4540-487e-a0e6-5b1b4fa62bd4.JPEG',
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/c41f93dd-f257-4718-b2f4-ce2ca8acc98c.JPEG',
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/2c0e71b6-15e5-4f12-ac7b-9aa9ce744851.JPEG',
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/85ae553e-7630-4ad4-b394-1952e0176104.JPEG',
  ],
  accommodations: ['샤워실', '요가매트', '짐볼'],
  grades: ['#FF6355', '#FBA949', '#FAE442', '#8BD448', '#2AA8F2'],
  sns: {
    twitter: 'asd321sd32fsdfsdfsdf',
    instagram: 'dfasdfdd____________',
    facebook: 'dfklajsdlkfjsdfsdfsd',
  },
  description:
    "1940년대 프랑스 전문 산악인들의 교육 훈련용으로 시작된 이후, 인공으로 만들어진 암벽 구조물을 손과 발을 사용하여 등반하는 레저스포츠로 발전하였다. '인공암벽등반'이라고도 한다. 유럽과 러시아, 미국으로 전파되어 다양한 국제 대회가 개최되었고, 1987년 국제산악연맹(UIAA)에서 스포츠클라이밍에 관한 규정을 제정하면서 스포츠 경기로서의 규칙을 갖추었다. 한국에는 1988년에 도입되었고, 전국적으로 빠르게 보급되어 사계절 내내 즐길 수 있는 레저 스포츠로서 각광받고 있다.",
  defaultImage:
    'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/a62a1d97-c81c-4d3a-8594-63f40795548f.JPEG',
  pricing: [
    {
      item: '1일 체험권 (이용+암벽화)',
      price: '50000',
    },
    {
      item: '1일 체험권 (이용+암벽화+강습)',
      price: '100000',
    },
    {
      item: '연간 이용권 (+ 초호화뷔페 식사권)',
      price: '9900000',
    },
  ],
  openHours: [
    {
      days: 'weekdays',
      openTime: 'AM,09,00',
      closeTime: 'PM,11,00',
    },
    {
      days: 'weekends',
      openTime: 'PM,12,00',
      closeTime: 'PM,09,00',
    },
    {
      days: 'holidays',
      openTime: 'PM,01,00',
      closeTime: 'PM,05,00',
    },
  ],
  homepage: 'https://www.naver.com/',
  tags: ['판타스틱', '암벽경험', '인생운동', '암장'],
};

export default EditPage;
