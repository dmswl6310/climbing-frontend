import { useEffect } from 'react';
import styled from 'styled-components';
import { MapProps } from '@/constants/gyms/types';

const getMap = (lat: number, lng: number) => {
  const position = new naver.maps.LatLng(lat, lng);
  const map = new naver.maps.Map('map', {
    center: position,
    zoom: 16,
  });

  const marker = new naver.maps.Marker({
    position,
    map,
  });
};

const DynamicMap = ({ coordinates }: MapProps) => {
  const { latitude, longitude } = coordinates;

  useEffect(() => {
    getMap(latitude, longitude);
  }, [latitude, longitude]);

  return <S.Wrapper id="map" />;
};

const S = {
  Wrapper: styled.div`
    width: 100%;
    height: 400px;
  `,
};

export default DynamicMap;
