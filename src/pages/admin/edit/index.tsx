import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ImageEditor from '@/components/admin/ImageEditor';
import BasicInfoEditor from '@/components/admin/BasicInfoEditor';
import DescriptionEditor from '@/components/admin/DescriptionEditor';
import OpenHoursEditor from '@/components/admin/OpenHoursEditor';
import AccommodationsEditor from '@/components/admin/AccommodationsEditor';
import DifficultyEditor from '@/components/admin/DifficultyEditor';

export interface GymData {
  id: string;
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
  sns?: Array<{
    platform: string;
    account: string;
  }>;
  images?: Array<string>;
  imageThumbnails?: Array<string>;
  openHours?: Array<{ days: string; hours: string }>;
  pricing?: Array<{ item: string; price: string }>;
  tags?: Array<string>;
  description?: string;
  grades?: Array<string>;
  accommodations?: Array<string>;
}

const sampleData = {
  id: '6e5b9475-8916-4785-ba85-b262fbf06efb',
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
  sns: [
    {
      platform: 'twitter',
      account: 'qwerty',
    },
    {
      platform: 'facebook',
      account: 'qwerty',
    },
  ],
  latestSettingDay: '24.02.01',
};

const EditPage = () => {
  const [currentData, setCurrentData] = useState<null | GymData>(null);
  const [loadedData, setLoadedData] = useState<null | GymData>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  console.log(currentData);

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

  const compareData = () => {
    let dataChanged = false;
    const dataKeys = Object.keys(currentData as GymData);

    dataKeys.forEach((key) => {
      if (
        currentData![key as keyof typeof currentData] !==
        loadedData![key as keyof typeof loadedData]
      )
        dataChanged = true;
    });

    return dataChanged;
  };

  const handlePageChange = (page: number) => {
    if (currentPage === page) return;
    const dataChanged = compareData();
    if (!dataChanged) return setCurrentPage(page);
    const response = confirm('수정 중인 데이터가 있습니다. 이동할까요?');
    if (response) {
      setCurrentData(loadedData);
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
        setLoadedData(data);
        setCurrentData(data);
      });
    */

    // 관리자계정 정보/API가 준비되기 전에 사용할 임의값
    fetch('http://localhost:3000/gyms/6e5b9475-8916-4785-ba85-b262fbf06efb')
      .then((response) => response.json())
      .then((data) => {
        setLoadedData(data);
        setCurrentData(data);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(
          'json-server 서버가 오프라인입니다. 암장 정보를 샘플값으로 대체합니다.',
        );
        setLoadedData(sampleData);
        setCurrentData(sampleData);
      });
  };

  const updateData = async () => {
    await fetch(`http://localhost:3000/gyms/${currentData!.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentData!),
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
                images={currentData?.images}
                thumbnails={currentData?.imageThumbnails}
                setCurrentData={setCurrentData}
              />
              <BasicInfoEditor
                name={currentData?.name || ''}
                address={
                  currentData?.address || {
                    jibunAddress: '',
                    roadAddress: '',
                    unitAddress: '',
                  }
                }
                contact={currentData?.contact || ''}
                snsList={currentData?.sns}
                setCurrentData={setCurrentData}
              />
              <DescriptionEditor
                description={currentData?.description || ''}
                setCurrentData={setCurrentData}
              />
            </>
          ) : (
            <>
              <OpenHoursEditor setCurrentData={setCurrentData} />
              <AccommodationsEditor setCurrentData={setCurrentData} />
              <DifficultyEditor setCurrentData={setCurrentData} />
            </>
          )}
          <button
            onClick={() => {
              const dataChanged = compareData();
              if (dataChanged) updateData();
            }}
          >
            저장
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
