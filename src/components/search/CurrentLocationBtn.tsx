import styled from "styled-components";
import { useState } from "react";
import { CurrentLocationBtnProps } from "@/constants/search/types";
import { MdOutlineMyLocation } from "react-icons/md";
import { DEVICE_SIZE } from "@/constants/styles";

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

  const filteredAddress =
    response["documents"][0]["region_1depth_name"] +
    " " +
    response["documents"][0]["region_2depth_name"];
  return filteredAddress;
};

const CurrentLocationBtn = ({ fontSize = "18px" }: CurrentLocationBtnProps) => {
  const [location, setLocation] = useState("내 위치 찾기");

  const handleLocation = (e: any) => {
    e.preventDefault();

    // http 대안
    try {
      fetch(`http://ip-api.com/json/?fields=lon,lat`)
        .then((res) => res.json())
        .then(async (data) => await GEOToAddress(data.lon, data.lat))
        .then((location) => {
          const inputTag = e.target.parentElement.querySelector(
            'input[name="search"]'
          );
          setLocation(location);
          inputTag.value = location;
          inputTag.focus();
        });
    } catch (error) {
      console.error("Error fetching geo data:", error);
    }

    // 위치 성공적으로 가져올 시
    // const success = async (position: GeolocationPosition) => {
    //   const latitude = position.coords.latitude;
    //   const longitude = position.coords.longitude;
    //   console.log(longitude, latitude);
    //   const location = await GEOToAddress(longitude, latitude);

    //   const inputTag = e.target.parentElement.querySelector(
    //     'input[name="search"]'
    //   );

    //   setLocation(location);
    //   inputTag.value = location;
    //   inputTag.focus();
    // };
    // const error = () => {};

    // 현재 위치 못가져옴
    // if (!navigator.geolocation) {
    //   // 브라우저가 위치 정보를 지원하지 않음;
    // } else {
    //   navigator.geolocation.getCurrentPosition(success, error);
    // }

    // } else {
    //   // 검색내용 포함시켜 라우팅
    //   router.push({
    //     pathname: "/search",
    //     query: { q: location },
    //   });
    // }
  };

  return (
    <S.Wrapper fontSize={fontSize} onClick={handleLocation}>
      <MdOutlineMyLocation />
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
    color: black;
    cursor: pointer;
    ${(props) => props.fontSize && `font-size: ${props.fontSize}`}
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 1rem;
    }
  `,
  Space: styled.div`
    margin-left: 5px;
  `,
};

export default CurrentLocationBtn;
