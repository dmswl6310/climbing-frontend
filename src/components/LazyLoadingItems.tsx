import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "styled-components";
import PreviewCard from "./PreviewCard";
import { GymSampleInfo } from "@/pages/home";

export const sampleGyms: GymSampleInfo[] = [
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

interface LoadingProps {
  cardList: Array<JSX.Element>;
}
// { cardList }: LoadingProps
const LazyLoadingItems = () => {
  const [items, setItems] = useState<GymSampleInfo[]>(sampleGyms);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = () => {
    if (items.length <= 20) {
      setItems(items.concat(sampleGyms[0], sampleGyms[1]));
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    // 필요시 추가
  });

  return (
    <InfiniteScroll
      style={{ display: "flex", flexWrap: "wrap" }}
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      scrollableTarget="scrollableDiv"
      loader={<h4>Loading ...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>마지막</b>
        </p>
      }
    >
      {items.map((gymInfo, index) => {
        return (
          <PreviewCard
            key={index}
            width="350px"
            height="300px"
            cardInfo={gymInfo}
          />
        );
      })}
    </InfiniteScroll>
  );
};

const S = {
  // InfiniteWrapper: styled.div`
  //   display: flex;
  //   flex-wrap: wrap;
  // `,
};

export default LazyLoadingItems;
