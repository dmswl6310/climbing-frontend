import { lazy, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useBeforeunload } from "react-beforeunload";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import AdminLayout from "@/components/admin/AdminLayout";
import BasicInfoEditor from "@/components/admin/BasicInfoEditor";
import DescriptionEditor from "@/components/admin/DescriptionEditor";
import { ErrorFallback } from "@/components/common/ErrorFallback";
import ImageEditor from "@/components/admin/ImageEditor";
import { SERVER_ADDRESS } from "@/constants/constants";
import type { GymData } from "@/constants/gyms/types";

const AccommodationsEditor = lazy(() => import("@/components/admin/AccommodationsEditor"));
const GradeEditor = lazy(() => import("@/components/admin/GradeEditor"));
const OpenHoursEditor = lazy(() => import("@/components/admin/OpenHoursEditor"));
const PricingEditor = lazy(() => import("@/components/admin/PricingEditor"));
const SettingDayEditor = lazy(() => import("@/components/admin/SettingDayEditor"));

const EditPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { page } = router.query;
  const [currentData, setCurrentData] = useState<GymData>(INITIAL_DATA);
  const [loadedData, setLoadedData] = useState<GymData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const tracker = useRef<null | string>(null);
  // const tokenRef = useRef(session?.jwt);
  console.log("세션 상태:");
  console.log(session);
  console.log(status);

  useEffect(() => {
    // 테스트 후 복원
    // if (!session) router.push({ pathname: "/login" });
    const id = "7"; // 테스트 후 사용자 정보를 통해 가져오도록 변경
    let data: GymData;

    const fetchData = async () => {
      try {
        const response = await Promise.race([
          fetch(`${SERVER_ADDRESS}/gyms/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: session.jwt,
            },
          }),
          new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Response(null, { status: 503 })), 3000),
          ),
        ]);
        if (!response.ok) throw new Error(`${response.status}`);
        else {
          data = await response.json();
          setLoadedData(JSON.parse(JSON.stringify(data)));
          setCurrentData(JSON.parse(JSON.stringify(data)));
        }
      } catch (e) {
        // 테스트전용
        const res = await fetch(`http://localhost:8000/gyms/${id}`);
        data = await res.json();
        setCurrentData(JSON.parse(JSON.stringify(data)));
        setLoadedData(JSON.parse(JSON.stringify(data)));

        // 테스트 후 복원
        // 에러 핸들링
        // console.log(e);
        // setIsError(true);
      }
      setIsLoading(false);
    };

    const handlePageLeave = () => {
      const dataChanged = tracker.current === "edited" ? true : false;
      if (!dataChanged) return;
      const response = confirm("수정 중인 데이터가 있습니다. 이동할까요?");
      if (!response) {
        throw "Routing reborted in response to the user's request. Please ignore this error message.";
      }
      tracker.current = null;
      setCurrentData(JSON.parse(JSON.stringify(data)));
    };

    fetchData();
    router.events.on("routeChangeStart", handlePageLeave);
    return () => router.events.off("routeChangeStart", handlePageLeave);
  }, [router.events]);

  useEffect(() => {
    tracker.current = isEdited(loadedData, currentData) ? "edited" : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  useBeforeunload((e) => {
    if (tracker.current === "edited") {
      return e.preventDefault();
    } else return undefined;
  });

  const isEdited = (oldData: any, newData: any) => {
    return JSON.stringify(oldData) !== JSON.stringify(newData);
  };

  // if (!session) return null;
  if (isError)
    return (
      <AdminLayout>
        <ErrorFallback error={"Server error"} resetErrorBoundary={() => {}} />
      </AdminLayout>
    );

  const updateData = async (data: string) => {
    try {
      const response = await Promise.race([
        fetch(`${SERVER_ADDRESS}/gyms/${loadedData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: session.jwt,
          },
          body: data,
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Response(null, { status: 503 })), 3000),
        ),
      ]);
      if (!response.ok) throw new Error(`${response.status}`);
    } catch (e) {
      //임시 *******************************************************************
      await fetch(`http://localhost:8000/gyms/${loadedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: session.jwt,
        },
        body: data,
      });
      //임시 *******************************************************************

      // 테스트 끝나고 복원
      // return false;
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
      return alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
    setLoadedData(JSON.parse(JSON.stringify(currentData)));
    tracker.current = null;
    setIsUpdating(false);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AdminLayout>
        {isLoading ? (
          <div>loading</div>
        ) : page === "1" || !page ? (
          <>
            <ImageEditor
              images={currentData.images}
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
            <Button>
              <button className="btn-primary" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? "저장중..." : "저장하기"}
              </button>
            </Button>
          </>
        ) : (
          <>
            <PricingEditor pricingList={currentData.pricing} setCurrentData={setCurrentData} />
            <OpenHoursEditor
              openHoursList={currentData.openHours}
              setCurrentData={setCurrentData}
            />
            <AccommodationsEditor
              accommodationsList={currentData.accommodations}
              setCurrentData={setCurrentData}
            />
            <GradeEditor gradesList={currentData.grades} setCurrentData={setCurrentData} />
            <SettingDayEditor date={currentData.latestSettingDay} setCurrentData={setCurrentData} />
            <Button>
              <button className="btn-primary" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? "저장중..." : "저장하기"}
              </button>
            </Button>
          </>
        )}
      </AdminLayout>
    </ErrorBoundary>
  );
};

const Button = styled.div`
  align-self: flex-end;
  & button:disabled {
    background: #bbc3cd;
  }
`;

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

// 테스트 후 삭제
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

export default EditPage;
