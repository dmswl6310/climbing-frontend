import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";

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

const CurrentLocationBtn = () => {
  const [location, setLocation] = useState("현재 위치");

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
    <Styled.Wrapper onClick={handleLocation}>
      <IoLocationOutline />
      {location}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    margin-left: 5px;
    display: flex;
  `,
};

export default CurrentLocationBtn;
