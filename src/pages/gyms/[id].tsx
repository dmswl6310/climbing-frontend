import { useSession } from "next-auth/react";
import styled from "styled-components";
import Comments from "@/components/gyms/Comments";
import DynamicMap from "@/components/gyms/DynamicMap";
import ErrorPage from "@/components/common/ErrorPage";
import ChatModal from "@/components/chat/ChatModal";
import ImageCarousel from "@/components/gyms/ImageCarousel";
import MainContent from "@/components/gyms/MainContent";
import SideContent from "@/components/gyms/SideContent";
import useApi from "@/hooks/useApi";
import { DEVICE_SIZE } from "@/constants/styles";
import { IMAGE_SIZE } from "@/constants/gyms/constants";
import { NAVERMAP_API, SERVER_ADDRESS } from "@/constants/constants";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

const GymInfo = ({
  gymData,
  error,
  statusCode,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data: session } = useSession();
  const { isLoading } = useApi(NAVERMAP_API);
console.log(gymData)
  if (error) return <ErrorPage statusCode={statusCode} />;
  return (
    <S.Page>
      <S.Wrapper>
        <ImageCarousel
          key={crypto.randomUUID()}
          defaultImage={gymData.defaultImage}
          imageList={gymData.images}
        />
        <S.InfoContainer>
          <S.Main>
            <MainContent gymData={gymData} />
            {!isLoading && <DynamicMap name={gymData.name} coordinates={gymData.coordinates} />}
          </S.Main>
          <SideContent gymData={gymData} />
        </S.InfoContainer>
        <Comments
          key={crypto.randomUUID()}
          id={gymData.id}
          comments={gymData.comments}
          session={session}
        />
      </S.Wrapper>
      <ChatModal key={crypto.randomUUID()} gymId={gymData.id} gymName={gymData.name} />
    </S.Page>
  );
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
      align-items: center;
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gymId = context.query.id;
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(`${SERVER_ADDRESS}/gyms/${gymId}`, { signal: controller.signal });
    if (response.status === 200) {
      const gymData = await response.json();
      gymData.id = gymId;
      return { props: { gymData } };
    }
    if (response.status === 404) return { notFound: true };
    throw response.status;
  } catch (e) {
    if (typeof e === "object") {
      return { props: { error: true, statusCode: 500 } };
    }
    return { props: { error: true, statusCode: e } };
  }
};

export default GymInfo;
