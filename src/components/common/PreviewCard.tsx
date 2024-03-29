import { styled } from "styled-components";
import Image from "next/image";
import img01 from "../../../public/thumbnail3.jpg";
import { IoBookmarkOutline } from "react-icons/io5";
import { FcLikePlaceholder } from "react-icons/fc";
import Link from "next/link";
import Bookmark from "./Bookmark";

export interface GymInfo {
  id: number;
  thumbnailSrc: string;
  address: string;
  name: string;
  latestSettingDay: string;
  likeNumber: number;
}

interface CardProps {
  width?: string;
  height?: string;
  cardInfo: GymInfo;
}

// TODO: 로드 시 큰 이미지가 먼저 뜨는 현상 수정필요(priority로 임시수정)
const PreviewCard = ({ width, height, cardInfo }: CardProps) => {
  return (
    <S.Container className="container" width={width} height={height}>
      <Link href={`/gyms/${cardInfo.id}`} style={{ textDecoration: "none" }}>
        <S.ImageWrapper>
          <S.Image src={img01} alt="image" priority={true} />
        </S.ImageWrapper>
        <S.InfoContainer>
          <S.MainInfoContainer>
            <S.NameContainer>
              <div>{cardInfo.address}</div>
              <div>{cardInfo.name}</div>
            </S.NameContainer>
            <Bookmark sessionId="임시sessionid" gymId="임시gymId" />
          </S.MainInfoContainer>
          <S.SubInfoContainer>
            <S.Date>최근 세팅일 : {cardInfo.latestSettingDay}</S.Date>
            <S.LikeContainer>
              {cardInfo.likeNumber}
              <FcLikePlaceholder />
            </S.LikeContainer>
          </S.SubInfoContainer>
        </S.InfoContainer>
      </Link>
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
    margin-right: 25px;
    margin-bottom: 25px;
  `,
  ImageWrapper: styled.div`
    height: 60%;
    position: relative;
  `,
  Image: styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: "cover";
  `,
  InfoContainer: styled.div`
    height: 35%; // TODO: 이미지 채운 나머지를 채우고 싶은데 안됨
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
  `,
  MainInfoContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  `,
};

export default PreviewCard;
