import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { requestData } from "@/service/api";
import PreviewCard from "./PreviewCard";
import { usePathname } from "next/dist/client/components/navigation";
import { GymCardInfo, LazyLoadingItemsProps } from "@/constants/search/types";

const LazyLoadingItems = ({
  searchWord = "",
  sortingType,
}: LazyLoadingItemsProps) => {
  const pathName = usePathname() as string;
  const [items, setItems] = useState<GymCardInfo[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getMoreData = () => {
    if (pathName.includes("search") && items.length <= 20) {
      setItems(items.concat(items));
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    // TODO: 쿼리 기준 필요 (둘중 하나만 보내도 될지)

    if (pathName?.includes("search")) {
      let queryUrl = `?q={${searchWord}}`;
      if (sortingType) {
        queryUrl += `&s={${searchWord}}`;
      }

      requestData({
        option: "GET",
        url: `/search${queryUrl}`,
        onSuccess: (data) => setItems(data),
      });
    } else {
      // home page의 일부 부르기
      requestData({
        option: "GET",
        url: `/gyms`,
        onSuccess: (data) => setItems(data),
      });
    }

    setHasMore(true);
  }, [pathName, searchWord, sortingType]);

  return (
    <InfiniteScroll
      style={{ display: "flex", flexWrap: "wrap" }}
      dataLength={items.length}
      next={getMoreData}
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
