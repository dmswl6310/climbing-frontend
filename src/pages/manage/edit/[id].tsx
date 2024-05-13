import { lazy, useContext, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useBeforeunload } from "react-beforeunload";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import ManageLayout from "@/components/manage/ManageLayout";
import BasicInfoEditor from "@/components/manage/edit/BasicInfoEditor";
import DescriptionEditor from "@/components/manage/edit/DescriptionEditor";
import ErrorFallback from "@/components/common/ErrorFallback";
import ImageEditor from "@/components/manage/edit/ImageEditor";
import LoadContainer from "@/components/manage/LoadContainer";
import { NavContext, type NavStateProps } from "@/NavContext";
import { SERVER_ADDRESS } from "@/constants/constants";
import type { GymData, GymDataObject } from "@/constants/gyms/types";

const AccommodationsEditor = lazy(() => import("@/components/manage/edit/AccommodationsEditor"));
const GradeEditor = lazy(() => import("@/components/manage/edit/GradeEditor"));
const OpenHoursEditor = lazy(() => import("@/components/manage/edit/OpenHoursEditor"));
const PricingEditor = lazy(() => import("@/components/manage/edit/PricingEditor"));
const SettingDayEditor = lazy(() => import("@/components/manage/edit/SettingDayEditor"));

const EditPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id, p } = router.query;
  const [currentData, setCurrentData] = useState<GymData | null>(null);
  const [loadedData, setLoadedData] = useState<GymData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const tracker = useRef<null | string>(null);
  const { selectedGymId, setSelectedGymId } = useContext(NavContext) as NavStateProps;

  useEffect(() => {
    // if (!session) router.push({ pathname: "/login" });
    // const id = "1"; // 테스트 후 사용자 정보를 통해 가져오도록 변경
    let data: GymData;

    const fetchData = async () => {
      // if (!session || !isLoading) return;
      try {
        const response = await fetch(`http://localhost:8000/gyms/${id}`, {
          method: "GET",
        });
        if (!response.ok) throw new Error(`${response.status}`);
        else {
          data = await response.json();
          setLoadedData(JSON.parse(JSON.stringify(data)));
          setCurrentData(JSON.parse(JSON.stringify(data)));
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    // const fetchData = async () => {
    //   // if (!session || !isLoading) return;
    //   try {
    //     const response = await Promise.race([
    //       fetch(`${SERVER_ADDRESS}/gyms/${id}`, {
    //         method: "GET",
    //         headers: {
    //           Authorization: session.jwt.accessToken,
    //         },
    //       }),
    //       new Promise<Response>((_, reject) =>
    //         setTimeout(() => reject(new Response(null, { status: 503 })), 3000),
    //       ),
    //     ]);
    //     if (!response.ok) throw new Error(`${response.status}`);
    //     else {
    //       data = await response.json();
    //       setLoadedData(JSON.parse(JSON.stringify(data)));
    //       setCurrentData(JSON.parse(JSON.stringify(data)));
    //     }
    //   } catch (e) {
    //     // 테스트전용
    //     const res = await fetch(`http://localhost:8000/gyms/${id}`);
    //     data = await res.json();
    //     setCurrentData(JSON.parse(JSON.stringify(data)));
    //     setLoadedData(JSON.parse(JSON.stringify(data)));

    //     // 테스트 후 복원
    //     // 에러 핸들링
    //     // console.log(e);
    //     // setIsError(true);
    //   }
    //   setIsLoading(false);
    // };

    const handlePageLeave = () => {
      const dataChanged = tracker.current === "edited" ? true : false;
      if (!dataChanged) return setIsLoading(true);
      const response = confirm("수정 중인 데이터가 있습니다. 이동할까요?");
      if (!response) {
        setSelectedGymId(id as string);
        throw "Routing reborted in response to the user's request. Please ignore this error message.";
      }
      tracker.current = null;
      setIsLoading(true);
    };

    fetchData();
    router.events.on("routeChangeStart", handlePageLeave);
    return () => router.events.off("routeChangeStart", handlePageLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router]);

  useEffect(() => {
    tracker.current = isEdited(loadedData, currentData) ? "edited" : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  useEffect(() => {
    if (selectedGymId !== null && selectedGymId !== id) {
      router.push(`/manage/edit/${selectedGymId}?p=${p}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGymId]);

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
      <ManageLayout>
        <ErrorFallback error={"Server error"} resetErrorBoundary={() => {}} />
      </ManageLayout>
    );

  // const updateData = async (data: string) => {
  //   try {
  //     const response = await Promise.race([
  //       fetch(`${SERVER_ADDRESS}/gyms/${loadedData.id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: session?.jwt.accessToken as string,
  //         },
  //         body: data,
  //       }),
  //       new Promise<Response>((_, reject) =>
  //         setTimeout(() => reject(new Response(null, { status: 503 })), 3000),
  //       ),
  //     ]);
  //     if (!response.ok) throw new Error(`${response.status}`);
  //   } catch (e) {
  //     //임시 *******************************************************************
  //     await fetch(`http://localhost:8000/gyms/${loadedData.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: session.jwt,
  //       },
  //       body: data,
  //     });
  //     //임시 *******************************************************************

  //     // 테스트 끝나고 복원
  //     // return false;
  //   }
  //   return true;
  // };

  const updateData = async (data: string) => {
    try {
      const response = await fetch(`http://localhost:8000/gyms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      if (!response.ok) throw new Error(`${response.status}`);
    } catch (e) {
      return false;
    }
    return true;
  };

  const setNewData = (obj: GymDataObject) => {
    setCurrentData((prev) => {
      if (!prev) return null;
      return { ...prev, ...obj };
    });
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
      <ManageLayout>
        {isLoading ? (
          <LoadContainer>
            <BarLoader />
          </LoadContainer>
        ) : p === "1" || !p ? (
          <>
            <ImageEditor
              images={currentData?.images}
              defaultImage={currentData?.defaultImage}
              setCurrentData={setCurrentData}
              setLoadedData={setLoadedData}
              updateData={updateData}
            />
            <BasicInfoEditor
              name={currentData?.name}
              address={currentData?.address}
              contact={currentData?.contact}
              snsList={currentData?.sns}
              homepage={currentData?.homepage}
              setNewData={setNewData}
            />
            <DescriptionEditor description={currentData?.description} setNewData={setNewData} />
            <Button>
              <button className="btn-primary" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? "저장중..." : "저장하기"}
              </button>
            </Button>
          </>
        ) : p === "2" ? (
          <>
            <PricingEditor pricingList={currentData?.pricing} setNewData={setNewData} />
            <OpenHoursEditor openHoursList={currentData?.openHours} setNewData={setNewData} />
            <AccommodationsEditor
              accommodationsList={currentData?.accommodations}
              setNewData={setNewData}
            />
            <GradeEditor gradesList={currentData?.grades} setNewData={setNewData} />
            <SettingDayEditor date={currentData?.latestSettingDay} setNewData={setNewData} />
            <Button>
              <button className="btn-primary" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? "저장중..." : "저장하기"}
              </button>
            </Button>
          </>
        ) : null}
      </ManageLayout>
    </ErrorBoundary>
  );
};

export const getServerSideProps = async () => {
  return { props: {} };
};

const Button = styled.div`
  align-self: flex-end;
  & button:disabled {
    background: #bbc3cd;
  }
`;

export default EditPage;
