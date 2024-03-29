import styled from "styled-components";
import GymListBanner from "../../components/search/GymListBanner";
import { IoSearch } from "react-icons/io5";
import router, { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Search from "@/components/common/Search";
import { NextPageWithLayout } from "../_app";
import Layout from "@/components/Layout";
import SearchLayout from "@/components/search/SearchLayout";

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

const sampleAddress = [
  { id: 1, info: "잠실" },
  { id: 2, info: "잠실2동" },
  { id: 3, info: "잠실1동" },
  { id: 4, info: "송파동" },
  { id: 5, info: "송파2동" },
  { id: 6, info: "송파1동" },
];

export interface GymSampleInfo {
  id: number;
  thumbnailSrc: string;
  address: string;
  name: string;
  latestSettingDay: string;
  likeNumber: number;
}

const SearchPage: NextPageWithLayout = () => {
  const query = useRouter().query;
  const searchWord = query.q as string;
  const sortingType = query.s as string;

  const [gymLists, setGymLists] = useState<GymSampleInfo[]>(sampleGyms); //sampleGyms

  const handleGymList = (event: {
    target: any;
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    // 검색내용 포함시켜 라우팅
    router.push({
      pathname: "/search",
      query: { q: event.target["search"].value },
    });
  };

  return (
    <Styled.Wrapper>
      <Styled.SearchWrapper>
        <Search
          dataList={sampleAddress}
          width="400px"
          postfixIcon={<IoSearch />}
          placeholder="주소를 입력하면 실내암벽장을 찾아드려요."
          onSubmit={handleGymList as (unknown: unknown) => unknown}
          useLocation={true}
          searchWord={searchWord}
        />
      </Styled.SearchWrapper>
      <GymListBanner
        gymList={gymLists}
        setGymList={setGymLists}
        searchWord={searchWord}
        sortingType={sortingType}
      />
    </Styled.Wrapper>
  );
};

SearchPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <SearchLayout>{page}</SearchLayout>
    </Layout>
  );
};

const Styled = {
  Wrapper: styled.div``,
  SearchWrapper: styled.div`
    margin-top: 10px;
    top: 0;
    position: fixed;
    z-index: 101;
  `,
};

export default SearchPage;
