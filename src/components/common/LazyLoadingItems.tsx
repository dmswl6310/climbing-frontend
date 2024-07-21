import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { requestData } from "@/service/api";
import PreviewCard from "./PreviewCard";
import { LazyLoadingItemsProps } from "@/constants/search/types";
import { SimpleGymData } from "@/constants/gyms/types";
import { styled } from "styled-components";

const LazyLoadingItems = ({
  searchWord = "",
  sortingType,
  isSearchPage = true,
}: LazyLoadingItemsProps) => {
  const [items, setItems] = useState<SimpleGymData[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const queryUrl = sortingType
    ? `q=${searchWord}&s=${sortingType}`
    : `q=${searchWord}`;

  useEffect(() => {
    const initItems = async () => {
      if (isSearchPage) {
        const onSuccess = (gymsData: SimpleGymData[]) => {
          if (gymsData.length == 0) {
            setHasMore(false);
          } else {
            setItems(gymsData);
          }
        };

        await requestData({
          option: "GET",
          url: `/gyms/search?${queryUrl}&p=0`,
          hasBody: true,
          onSuccess,
        });
      } else {
        const onSuccess = (gymsData: SimpleGymData[]) => {
          setItems(gymsData);
          setHasMore(false);
        };
        await requestData({
          option: "GET",
          url: `/gyms`,
          hasBody: true,
          onSuccess,
        });
      }
    };
    initItems();
  }, [isSearchPage, searchWord, sortingType]);

  const getMoreData = async () => {
    if (isSearchPage) {
      const onSuccess = (gymsData: SimpleGymData[]) => {
        if (gymsData.length == 0) {
          setHasMore(false);
        } else {
          setItems(items.concat(gymsData));
          setCurrPage(currPage + 1);
        }
      };

      await requestData({
        option: "GET",
        url: `/gyms/search?${queryUrl}&p=${currPage}`,
        hasBody: true,
        onSuccess,
      });
    }
  };

  const PreviewCards = items.map((gymInfo, index) => {
    return (
      <PreviewCard
        key={index}
        width="350px"
        height="350px"
        cardInfo={gymInfo}
      />
    );
  });

  return (
    <InfiniteScroll
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      dataLength={items.length}
      next={getMoreData}
      hasMore={hasMore}
      scrollableTarget="scrollableDiv"
      loader={<h4>Loading ...</h4>}
      // endMessage={
      //   <p style={{ textAlign: "center" }}>
      //     <b>마지막</b>
      //   </p>
      // }
    >
      {isSearchPage ? PreviewCards : PreviewCards.slice(0, 6)}
    </InfiniteScroll>
  );
};

const S = {
  InfiniteWrapper: styled.div`
    display: flex;
    justify-content: center;
  `,
};

export default LazyLoadingItems;
