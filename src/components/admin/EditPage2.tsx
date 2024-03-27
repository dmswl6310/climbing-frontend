import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useBeforeunload } from "react-beforeunload";
import styled from "styled-components";
import OpenHoursEditor from "@/components/admin/OpenHoursEditor";
import AccommodationsEditor from "@/components/admin/AccommodationsEditor";
import GradeEditor from "@/components/admin/GradeEditor";
import PricingEditor from "@/components/admin/PricingEditor";
import SettingDayEditor from "@/components/admin/SettingDayEditor";
import { GYM_API } from "@/constants/constants";
import type { GymData } from "@/constants/gyms/types";

const EditPage2 = () => {
  const [currentData, setCurrentData] = useState<GymData>(INITIAL_DATA);
  const [loadedData, setLoadedData] = useState<GymData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const tracker = useRef<null | string>(null);
  const router = useRouter();

  // 서버로부터 암장정보 fetch
  useEffect(() => {
    fetchData();
    setIsLoading(false);
    router.events.on("routeChangeStart", handlePageLeave);

    return () => router.events.off("routeChangeStart", handlePageLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    tracker.current = isEdited(loadedData, currentData) ? "edited" : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  const isEdited = (oldData: any, newData: any) => {
    return JSON.stringify(oldData) !== JSON.stringify(newData);
  };

  useBeforeunload((e) => {
    if (tracker.current === "edited") {
      return e.preventDefault();
    } else return undefined;
  });

  const handlePageLeave = () => {
    const dataChanged = tracker.current === "edited" ? true : false;
    if (!dataChanged) return;
    const response = confirm("수정 중인 데이터가 있습니다. 이동할까요?");
    if (!response) {
      throw "Routing reborted in response to the user's request. Please ignore this error message.";
    }
  };

  const fetchData = () => {
    /*
    // 전역상태에 저장된 관리자계정 정보로 fetch 요청
    const id = '전역상태에서 가져온 값';
    fetch(`${GYM_API}${id}`)
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
        console.log("json-server 서버가 오프라인입니다. 암장 정보를 샘플값으로 대체합니다.");
        setLoadedData(JSON.parse(JSON.stringify(sampleData)));
        setCurrentData(JSON.parse(JSON.stringify(sampleData)));
      });
  };

  const updateData = async (data: string) => {
    try {
      await fetch(`${GYM_API}${currentData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (tracker.current !== "edited") return;
    setIsUpdating(true);
    const isSuccess = await updateData(JSON.stringify(currentData));
    if (!isSuccess) {
      // 에러 핸들링
      setIsUpdating(false);
      return alert("서버가 응답하지 않습니다. 잠시 후 다시 시도해보세요.");
    }
    setLoadedData(JSON.parse(JSON.stringify(currentData)));
    tracker.current = null;
    setIsUpdating(false);
  };

  return isLoading ? (
    <div>데이터 로딩중...</div>
  ) : (
    <>
      <PricingEditor pricingList={currentData.pricing} setCurrentData={setCurrentData} />
      <OpenHoursEditor openHoursList={currentData.openHours} setCurrentData={setCurrentData} />
      <AccommodationsEditor
        accommodationsList={currentData.accommodations}
        setCurrentData={setCurrentData}
      />
      <GradeEditor gradesList={currentData.grades} setCurrentData={setCurrentData} />
      <SettingDayEditor date={currentData.latestSettingDay} setCurrentData={setCurrentData} />
      <S.Button>
        <button className="btn-primary" onClick={handleSave} disabled={isUpdating ? true : false}>
          {isUpdating ? "저장중..." : "저장하기"}
        </button>
      </S.Button>
    </>
  );
};

const S = {
  Button: styled.div`
    align-self: flex-end;
  `,
};

const INITIAL_DATA = {
  name: "",
  address: {
    jibunAddress: "",
    roadAddress: "",
    unitAddress: "",
  },
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  contact: "",
};

// 테스트용 상수값
const testId = "3ec082af-2425-4cee-983d-714e96e8d192";
const testUrl = `${GYM_API}${testId}`;
const sampleData = {
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
};

export default EditPage2;
