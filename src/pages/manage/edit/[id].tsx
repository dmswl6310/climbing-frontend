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
import { requestData } from "@/service/api";
import { SERVER_ADDRESS } from "@/constants/constants";
import { UNKNOWN_ERROR } from "@/constants/manage/constants";
import type { GymData, GymDataObject } from "@/constants/gyms/types";

const AccommodationsEditor = lazy(
  () => import("@/components/manage/edit/AccommodationsEditor")
);
const GradeEditor = lazy(() => import("@/components/manage/edit/GradeEditor"));
const OpenHoursEditor = lazy(
  () => import("@/components/manage/edit/OpenHoursEditor")
);
const PricingEditor = lazy(
  () => import("@/components/manage/edit/PricingEditor")
);
const SettingDayEditor = lazy(
  () => import("@/components/manage/edit/SettingDayEditor")
);

const isEdited = (oldData: any, newData: any) => {
  return JSON.stringify(oldData) !== JSON.stringify(newData);
};

const EditPage = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { id, p } = router.query;
  const [currentData, setCurrentData] = useState<GymData | null>(null);
  const [loadedData, setLoadedData] = useState<GymData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const tracker = useRef<null | string>(null);
  const { selectedGymId, setSelectedGymId } = useContext(
    NavContext
  ) as NavStateProps;

  useEffect(() => {
    if (!isLoading) return;

    requestData({
      option: "GET",
      url: `/gyms/${id}`,
      onSuccess: (data) => {
        setLoadedData(JSON.parse(JSON.stringify(data)));
        setCurrentData(JSON.parse(JSON.stringify(data)));
      },
      onError: () => {
        setIsError(true);
      },
    });

    setIsLoading(false);

    const handlePageLeave = () => {
      const dataChanged = tracker.current === "edited";
      if (!dataChanged) return setIsLoading(true);
      const response = confirm("수정 중인 데이터가 있습니다. 이동할까요?");
      if (!response) {
        setSelectedGymId(id as string);
        throw "Routing reborted in response to the user's request. Please ignore this error message.";
      }
      tracker.current = null;
      setIsLoading(true);
    };

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

  if (isError)
    return (
      <ManageLayout>
        <ErrorFallback error={"Server error"} resetErrorBoundary={() => {}} />
      </ManageLayout>
    );

  const updateImageData = async (data: string) => {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/gyms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.jwt.accessToken,
        },
        body: data,
      });
      if (!response.ok) throw new Error(`${response.status}`);
    } catch (e) {
      alert(UNKNOWN_ERROR);
      router.reload();
    }
  };

  const setNewData = (obj: GymDataObject) => {
    setCurrentData((prev) => {
      if (!prev) return null;
      return { ...prev, ...obj };
    });
  };

  const handleSave = async () => {
    if (tracker.current !== "edited" || !session) return;
    setIsUpdating(true);

    requestData({
      option: "PUT",
      url: `/gyms/${id}`,
      session,
      update,
      data: currentData,
      hasBody: false,
      onSuccess: () => {
        setLoadedData(JSON.parse(JSON.stringify(currentData)));
        tracker.current = null;
        setIsUpdating(false);
      },
      onError: (error) => {
        // 에러 핸들링
        console.log(error);
        setIsUpdating(false);
        return alert(UNKNOWN_ERROR);
      },
    });
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ManageLayout>
        <h1 className="desktop-view" style={{ margin: 0 }}>
          {p === "2" ? "상세 정보 수정" : "기본 정보 수정"}
        </h1>
        <h2 className="mobile-view" style={{ margin: 0 }}>
          {p === "2" ? "상세 정보 수정" : "기본 정보 수정"}
        </h2>
        {isLoading ? (
          <LoadContainer>
            <BarLoader />
          </LoadContainer>
        ) : p === "2" ? (
          <>
            <PricingEditor
              pricingList={currentData?.pricing}
              setNewData={setNewData}
            />
            <OpenHoursEditor
              openHoursList={currentData?.openHours}
              setNewData={setNewData}
            />
            <AccommodationsEditor
              accommodationsList={currentData?.accommodations}
              setNewData={setNewData}
            />
            <GradeEditor
              gradesList={currentData?.grades}
              setNewData={setNewData}
            />
            <SettingDayEditor
              date={currentData?.latestSettingDay}
              setNewData={setNewData}
            />
            <Button>
              <button
                className="btn-primary"
                onClick={handleSave}
                disabled={isUpdating}
              >
                {isUpdating ? "저장중..." : "저장하기"}
              </button>
            </Button>
          </>
        ) : (
          <>
            <ImageEditor
              images={currentData?.images}
              defaultImage={currentData?.defaultImage}
              setCurrentData={setCurrentData}
              setLoadedData={setLoadedData}
              updateImageData={updateImageData}
            />
            <BasicInfoEditor
              name={currentData?.name}
              address={currentData?.address}
              contact={currentData?.contact}
              snsList={currentData?.sns}
              homepage={currentData?.homepage}
              setNewData={setNewData}
            />
            <DescriptionEditor
              description={currentData?.description}
              setNewData={setNewData}
            />
            <Button>
              <button
                className="btn-primary"
                onClick={handleSave}
                disabled={isUpdating}
              >
                {isUpdating ? "저장중..." : "저장하기"}
              </button>
            </Button>
          </>
        )}
      </ManageLayout>
    </ErrorBoundary>
  );
};

const Button = styled.div`
  align-self: flex-end;
  & button:disabled {
    background: #bbc3cd;
  }
`;

export default EditPage;
