import { useEffect } from "react";
import styled from "styled-components";
import { DEVICE_SIZE } from "@/constants/styles";
import { COLOR } from "@/styles/global-color";
import type { MapProps } from "@/constants/gyms/types";

const getMap = (name: string, lat: number, lng: number) => {
  const position = new naver.maps.LatLng(lat, lng);
  const map = new naver.maps.Map("map", {
    center: position,
    zoom: 16,
  });
  const marker = new naver.maps.Marker({
    position,
    map,
  });
  const infoWindowElem = `<div class="infowindow">${name}</div>`;
  const infoWindow = new naver.maps.InfoWindow({
    content: infoWindowElem,
    borderWidth: 0,
    backgroundColor: "transparent",
    disableAnchor: true,
  });
  const startingPosition = map.getBounds();

  const onMarkerClick = () => {
    map.fitBounds(startingPosition);
  };

  infoWindow.open(map, marker);
  naver.maps.Event.addListener(marker, "click", onMarkerClick);
};

const DynamicMap = ({ name, coordinates }: MapProps) => {
  const { latitude, longitude } = coordinates;

  useEffect(() => {
    getMap(name, latitude, longitude);
  }, [name, latitude, longitude]);

  return <S.Wrapper id="map" />;
};

const S = {
  Wrapper: styled.div`
    width: 100%;
    height: 400px;
    @media ${DEVICE_SIZE.mobileLarge} {
      height: 200px;
    }
    .infowindow {
      border-radius: 0.5rem;
      background: ${COLOR.MAIN};
      margin-bottom: 0.3rem;
      padding: 0.5rem;
      color: white;
    }
  `,
};

export default DynamicMap;
