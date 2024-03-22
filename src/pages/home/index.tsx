import styled from "styled-components";
import { SetStateAction, useEffect, useState } from "react";
import GymListBanner from "../../components/GymListBanner";
import SearchBanner from "./searchBanner";
import { requestData } from "@/service/api";

const sampleGyms: GymSampleInfo[] = [
  {
    id: 1,
    thumbnailSrc: "/public/thumbnail2.png",
    address: "서울 강남구 신사1동 529-4 B2",
    name: "더자스클라이밍짐2",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
  {
    id: 2,
    thumbnailSrc: "./public/thumbnail1.png",
    address: "서울 강남구 신사2동 529-4 B1",
    name: "더자스클라이밍짐",
    latestSettingDay: "22.03.03",
    likeNumber: 155,
  },
  {
    id: 3,
    thumbnailSrc: "./public/thumbnail2.png",
    address: "서울 송파구 신사동 529-4 B2",
    name: "더자스클라이밍짐2",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
  {
    id: 4,
    thumbnailSrc: "./public/thumbnail3.png",
    address: "서울 송파구 송파동 신사동 529-4 B3",
    name: "더자스클라이밍짐3",
    latestSettingDay: "22.03.05",
    likeNumber: 157,
  },
  {
    id: 5,
    thumbnailSrc: "./public/thumbnail2.png",
    address: "서울 송파구 송파2동 529-4 B2",
    name: "더자스클라이밍짐2",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
  {
    id: 6,
    thumbnailSrc: "./public/thumbnail1.png",
    address: "서울 강남구 신사동 529-4 B1",
    name: "더자스클라이밍짐1",
    latestSettingDay: "22.03.03",
    likeNumber: 155,
  },
  {
    id: 7,
    thumbnailSrc: "./public/thumbnail1.png",
    address: "서울 강남구 신사동 529-4 B1",
    name: "더자스클라이밍짐1",
    latestSettingDay: "22.03.03",
    likeNumber: 155,
  },
];

export interface GymSampleInfo {
  id: number;
  thumbnailSrc: string;
  address: string;
  name: string;
  latestSettingDay: string;
  likeNumber: number;
}

const Home = () => {
  requestData({
    option: "GET",
    url: "/gyms",
    onSuccess: (input) => setGymLists(input),
  });
  // const getData = async () => {
  //   const res = await fetch("http://localhost:3000/gyms");
  //   const data = await res.json();
  //   setGymLists(data);
  // };
  const [gymLists, setGymLists] = useState<GymSampleInfo[]>(sampleGyms); //sampleGyms

  // useEffect(() => {
  //   getData;
  // }, []);

  return (
    <Styled.Wrapper>
      <SearchBanner setGymList={setGymLists} />
      <GymListBanner gymList={gymLists} setGymList={setGymLists} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default Home;
