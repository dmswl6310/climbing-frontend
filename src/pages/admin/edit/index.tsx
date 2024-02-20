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

// 테스트용 상수값
const testId = '75334254-93a8-4cfb-afec-29e368ac0803';
const testEndpoint = 'http://localhost:3000/gyms/';
const testUrl = `${testEndpoint}${testId}`;
const sampleData = {
  id: 'sampleid',
  name: '샘플암장1',
  address: {
    jibunAddress: '대전광역시 동구 판암동 498-14',
    roadAddress: '대전광역시 동구 판교3길 3',
    unitAddress: '4층',
  },
  description:
    '왜 은행회관 헬스클럽에 다녀야할까요? Why Health Club 은행회관 헬스클럽은 고품격입니다. 기구 및 각종 인테리어 최고급으로 품격을 느낄 수 있습니다. 최고급 헬스클럽과 사우나가 준비된 은행회관 헬스클럽에서 지금 바로 다짐해 보세요! ',
  coordinates: {
    latitude: 36.318415,
    longitude: 127.4521708,
  },
  contact: '1588-1588',
  accommodations: ['moonboard', 'showers'],
  sns: { twitter: 'qwerty', facebook: 'asdfg' },
  latestSettingDay: '24.02.01',
};

export interface GymData {
  id?: string;
  name: string;
  address: {
    jibunAddress: string;
    roadAddress: string;
    unitAddress: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: string;
  latestSettingDay: string;
  sns?: { twitter?: string; facebook?: string; instagram?: string };
  homepage?: string;
  images?: Array<string>;
  imageThumbnails?: Array<string>;
  defaultImage?: string;
  openHours?: Array<{ days: string; openTime: string; closeTime: string }>;
  pricing?: Array<{ item: string; price: string }>;
  tags?: Array<string>;
  description?: string;
  grades?: Array<string>;
  accommodations?: Array<string>;
}

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
    await fetch(`${testEndpoint}${currentData!.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
  };

  return (
    <Styled.Wrapper>
      <Styled.Sidebar>
        <h3>암장 정보 관리</h3>
        <Styled.Link onClick={() => handlePageChange(1)}>기본 정보</Styled.Link>
        <Styled.Link onClick={() => handlePageChange(2)}>상세 정보</Styled.Link>
        <h4>댓글 관리</h4>
      </Styled.Sidebar>
      {isLoading ? (
        <div>데이터 로딩 중</div>
      ) : (
        <Styled.Main>
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
        </Styled.Main>
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
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

export default EditPage;
