import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import Comments from "@/components/gyms/Comments";
import DynamicMap from "@/components/gyms/DynamicMap";
import ErrorPage from "@/components/common/ErrorPage";
import ChatModal from "@/components/chat/ChatModal";
import ImageCarousel from "@/components/gyms/ImageCarousel";
import MainContent from "@/components/gyms/MainContent";
import SideContent from "@/components/gyms/SideContent";
import useApi from "@/hooks/useApi";
import { requestData } from "@/service/api";
import { IMAGE_SIZE } from "@/constants/gyms/constants";
import { NAVERMAP_API } from "@/constants/constants";
import { DEVICE_SIZE } from "@/constants/styles";
import type { GymData } from "@/constants/gyms/types";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

const GymInfo = ({ id }: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data: session } = useSession();
  const [gymData, setGymData] = useState<null | GymData>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isLoading: isLoadingMap } = useApi(NAVERMAP_API);

  useEffect(() => {
    if (!isLoading) return;
    requestData({
      option: "GET",
      url: `/gyms/${id}`,
      onSuccess: (data) => {
        const gymData = { ...data, id };
        setGymData(gymData);
      },
      onError: (e) => {
        console.log(e);
        setIsError(true);
      },
    });
    setIsLoading(false);
  }, [isLoading, id]);

  return (
    <S.Page>
      {isLoading ? (
        <BarLoader />
      ) : isError || !gymData ? (
        <ErrorPage statusCode={500} />
      ) : (
        <>
          <S.Wrapper>
            <ImageCarousel defaultImage={gymData.defaultImage} imageList={gymData.images} />
            <S.InfoContainer>
              <S.Main>
                <MainContent gymData={gymData} />
                {!isLoadingMap && (
                  <DynamicMap name={gymData.name} coordinates={gymData.coordinates} />
                )}
              </S.Main>
              <SideContent gymData={gymData} />
            </S.InfoContainer>
            <Comments
              key={gymData.id}
              id={gymData.id}
              comments={gymData.comments}
              session={session}
            />
          </S.Wrapper>
          <ChatModal key={gymData.id} gymId={gymData.id} gymName={gymData.name} />
        </>
      )}
    </S.Page>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  return { props: { id } };
};

const S = {
  Page: styled.div`
    display: grid;
    place-content: center;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${IMAGE_SIZE.desktop.width + "px"};
    .address {
      display: flex;
      gap: 6px;
      color: gray;
      margin-bottom: 18px;
    }
    .header {
      display: flex;
      align-items: flex-end;
      align-content: flex-end;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .header__text {
      font-weight: 700;
      font-size: 2.3rem;
    }
    .icons {
      position: relative;
      bottom: 6px;
      display: flex;
      gap: 6px;
    }
    .description {
      white-space: break-spaces;
    }
    @media ${DEVICE_SIZE.laptop} {
      width: ${IMAGE_SIZE.laptop.width + "px"};
    }
    @media ${DEVICE_SIZE.tablet} {
      width: ${IMAGE_SIZE.tablet.width + "px"};
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: ${IMAGE_SIZE.mobileLarge.width + "px"};
      .header__text {
        font-size: 1.7rem;
      }
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      width: ${IMAGE_SIZE.mobileSmall.width + "px"};
      .header {
        line-height: 2.3rem;
      }
      .header__text {
        font-size: 1.5rem;
      }
    }
  `,
  InfoContainer: styled.div`
    display: flex;
    gap: 18px;
    margin-top: 40px;
    flex-direction: row;
    @media ${DEVICE_SIZE.laptop} {
      flex-direction: column;
    }
  `,
  Main: styled.div`
    box-sizing: border-box;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    gap: 36px;
    @media (min-width: 1281px) {
      padding: 0px 18px;
    }
    @media ${DEVICE_SIZE.desktop} {
      width: 752px;
    }
    @media ${DEVICE_SIZE.laptop} {
      width: ${IMAGE_SIZE.laptop.width + "px"};
    }
    @media ${DEVICE_SIZE.tablet} {
      width: ${IMAGE_SIZE.tablet.width + "px"};
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: ${IMAGE_SIZE.mobileLarge.width + "px"};
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      width: ${IMAGE_SIZE.mobileSmall.width + "px"};
    }
  `,
};

export default GymInfo;
