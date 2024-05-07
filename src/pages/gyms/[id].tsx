import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Error from "next/error";
import styled from "styled-components";
import Comments from "@/components/gyms/Comments";
import DynamicMap from "@/components/gyms/DynamicMap";
import HelpModal from "@/components/chat/HelpModal";
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
  const router = useRouter();
  const { isLoading } = useApi(NAVERMAP_API);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handlePageLeave = () => {
    if (isOpen) setIsOpen(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handlePageLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <Error statusCode={statusCode} />;
  return (
    <S.Page>
      <S.Wrapper>
        {!gymData.defaultImage && !gymData.images ? null : (
          <ImageCarousel defaultImage={gymData.defaultImage} imageList={gymData.images} />
        )}
        <S.InfoContainer>
          <S.Main>
            <MainContent gymData={gymData} />
            {isLoading ? null : <DynamicMap coordinates={gymData.coordinates} />}
          </S.Main>
          <SideContent gymData={gymData} />
        </S.InfoContainer>
        <Comments id={gymData.id} comments={gymData.comments} session={session} />
      </S.Wrapper>
      <HelpModal
        gymId={gymData.id}
        gymName={gymData.name}
        isOpen={isOpen}
        setIsOpen={toggleModal}
      />
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
    }
    .header__text {
      font-weight: 700;
      font-size: 2.5rem;
    }
    .icons {
      position: relative;
      bottom: 6px;
      display: flex;
      gap: 6px;
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
  try {
    const response = await Promise.race([
      fetch(`${SERVER_ADDRESS}/gyms/${gymId}`),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Response(null, { status: 503 })), 3000),
      ),
    ]);
    if (response.status === 200) {
      const gymData = await response.json();
      return { props: { gymData } };
    } else throw response.status;
  } catch (statusCode) {
    // 404에러 시에도 데이터를 채우기 위한 임시방편
    console.log("*****Server fetch failed. Fetching from local json-server instead*****");
    const gymData = await (await fetch(`http://localhost:8000/gyms/${gymId}`)).json();
    return { props: { gymData } };

    // 테스트 완료 시 아래 코드로 교체
    return { props: { error: true, statusCode } };
  }
};

export default GymInfo;
