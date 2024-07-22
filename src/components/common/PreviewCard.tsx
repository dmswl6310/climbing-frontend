import { styled } from "styled-components";
import Image from "next/image";
import img01 from "../../../public/thumbnail3.jpg";
import { IoHeartOutline } from "react-icons/io5";
import Bookmark from "./Bookmark";
import { CardProps } from "@/constants/search/types";
import router from "next/router";
import { useSession } from "next-auth/react";
import { DEVICE_SIZE } from "@/constants/styles";

const PreviewCard = ({ width, height, cardInfo }: CardProps) => {
  const { data: session, update } = useSession();

  const handleCardOnClick = () => {
    router.push(`/gyms/${cardInfo.id}`);
  };

  return (
    <S.Container className="container" width={width} height={height}>
      <S.Link onClick={handleCardOnClick}>
        <S.ImageWrapper height={height}>
          <S.Image src={img01} alt="image" priority={true} />
        </S.ImageWrapper>
        <S.InfoContainer>
          <S.MainInfoContainer>
            <S.NameContainer>
              <S.Address>{cardInfo.address.roadAddress}</S.Address>
              <S.Name>{cardInfo.name}</S.Name>
            </S.NameContainer>
            <Bookmark
              update={update}
              session={session}
              gymId={cardInfo.id.toString()}
              size="20px"
            />
          </S.MainInfoContainer>
          <S.SubInfoContainer>
            <S.Date>
              최근 세팅일 : {cardInfo.latestSettingDay ?? "미등록"}
            </S.Date>
            <S.LikeContainer>
              {cardInfo.likeNumber ?? 0}
              <IoHeartOutline size={20} color="#666666" />
            </S.LikeContainer>
          </S.SubInfoContainer>
        </S.InfoContainer>
      </S.Link>
    </S.Container>
  );
};

const S = {
  Container: styled.div<{
    width?: string;
    height?: string;
  }>`
    width: ${(props) => props.width || `350px`};
    height: ${(props) => props.height || `100px`};
    margin: 15px;
  `,
  Link: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    margin: 0;
    text-decoration: none;
    color: black;
    cursor: pointer;
  `,
  ImageWrapper: styled.div<{
    height?: string;
  }>`
    padding: 0;
    margin: 0;
    height: ${(props) =>
      props.height ? `${parseInt(props.height, 10) * 0.6}px` : `170px`};
  `,
  Image: styled(Image)`
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    object-fit: "cover";
  `,
  InfoContainer: styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
  `,
  Address: styled.div`
    margin: 0;
    padding: 0;
  `,
  Name: styled.h2`
    margin-top: 5px;
    padding: 0;
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 1.3rem;
    }
  `,
  MainInfoContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  `,
  NameContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  SubInfoContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  Date: styled.div``,
  LikeContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    gap: 5px;
  `,
};

export default PreviewCard;
