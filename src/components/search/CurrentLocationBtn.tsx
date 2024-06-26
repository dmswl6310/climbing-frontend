import styled from "styled-components";
import { useState } from "react";
import { CurrentLocationBtnProps } from "@/constants/search/types";
import { MdOutlineMyLocation } from "react-icons/md";
import { COLOR } from "@/styles/global-color";

const GEOToAddress = async (longitude: number, latitude: number) => {
  const response = await (
    await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
        },
      }
    )
  ).json();

  return response["documents"][1]["address_name"]; // ~~2동 까지 나옴
};

const CurrentLocationBtn = ({ fontSize = "18px" }: CurrentLocationBtnProps) => {
  const [location, setLocation] = useState("내 위치로 찾기");

  const success = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = await GEOToAddress(longitude, latitude);
    setLocation(location);
  };

  const error = () => {
    // 현재 위치 못가져옴
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      // 브라우저가 위치 정보를 지원하지 않음;
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <S.Wrapper fontSize={fontSize} onClick={handleLocation}>
      <MdOutlineMyLocation color={COLOR.BORDER_UNFOCUSED} />
      <S.Space></S.Space>
      {location}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ fontSize?: string }>`
    display: flex;
    flex-direction: row;
    justify-content: right;
    padding: 0;
    margin: 3px 3px;
    color: ${COLOR.DISABLED};
    cursor: pointer;
    ${(props) => props.fontSize && `font-size: ${props.fontSize}`}
  `,
  Space: styled.div`
    margin-left: 5px;
  `,
};

export default CurrentLocationBtn;
