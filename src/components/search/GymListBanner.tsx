import LazyLoadingItems from "@/components/common/LazyLoadingItems";
import PreviewCard from "@/components/common/PreviewCard";
import styled from "styled-components";
import { GymSampleInfo } from "../../pages/home";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import router from "next/router";
import { requestData } from "@/service/api";

const sampleList = [
  {
    thumbnailSrc: "/public/thumbnail2.png",
    address: "서울 강남구 신사1동 529-4 B2",
    name: "정렬기준 클릭",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
];

interface GymListBannerProps {
  gymList: Array<GymSampleInfo>;
  setGymList: Dispatch<SetStateAction<GymSampleInfo[]>>;
  searchWord?: string;
  sortingType?: string;
}

const GymListBanner = ({
  gymList,
  setGymList,
  searchWord,
  sortingType = "",
}: GymListBannerProps) => {
  // const getData = async (sort: string | null) => {
  //   const res = await fetch(`http://localhost:3000/gyms?s=${sort}`);
  //   const data = await res.json();
  //   setGymList(data);
  // };

  const [selectedButton, setSelectedButton] = useState(sortingType);

  requestData({
    option: "GET",
    url: `/gyms?s=인기순`,
    onSuccess: (data) => setGymList(data),
  });
  const sortingTypes = ["인기순", "최신순", "거리순"];

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // 누른 버튼(인기순,최신순..)에 따라 다른값을 서버로 요청해서 데이터 받기
    // const res = await getSearchRequest(userInput);
    // console.log(event.currentTarget.textContent);
    // getData(event.currentTarget.textContent);
    // setGymList(sampleList);

    const buttonText = event.currentTarget.textContent!;

    // 검색내용 포함시켜 라우팅
    if (searchWord) {
      router.push({
        pathname: "/search",
        query: { q: searchWord, s: buttonText },
      });
    } else {
      router.push({
        pathname: "/search",
        query: { s: buttonText },
      });
    }

    setSelectedButton(buttonText);
  };

  const SortingButtons = sortingTypes.map((type, index) => {
    return (
      <Styled.Container key={index}>
        <Styled.SortButton
          className={
            selectedButton === type ? "btn-plain-clicked" : "btn-plain"
          }
          key={index}
          onClick={handleButtonClick}
        >
          {type}
        </Styled.SortButton>
        {index !== 2 ? <Styled.Divider>|</Styled.Divider> : null}
      </Styled.Container>
    );
  });

  // const CardList =
  //   gymList &&
  //   gymList.map((gymInfo, index) => {
  //     return (
  //       <PreviewCard
  //         key={index}
  //         width="350px"
  //         height="300px"
  //         cardInfo={gymInfo}
  //       />
  //     );
  //   });

  return (
    <Styled.Wrapper>
      <Styled.ButtonWrapper>{SortingButtons}</Styled.ButtonWrapper>
      <LazyLoadingItems />
      {/* <LazyLoadingItems cardList={CardList} /> */}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  Container: styled.div`
    display: flex;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  `,
  SortButton: styled.button`
    margin-left: 5px;
    margin-right: 5px;
  `,
  Divider: styled.div`
    color: grey;
  `,
};

export default GymListBanner;
