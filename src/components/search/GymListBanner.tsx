import LazyLoadingItems from "@/components/common/LazyLoadingItems";
import styled from "styled-components";
import { MouseEventHandler, useState } from "react";
import router from "next/router";
import { GymListBannerProps } from "@/constants/search/types";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";

const GymListBanner = ({
  searchWord,
  sortingType = "",
}: GymListBannerProps) => {
  const [selectedButton, setSelectedButton] = useState(sortingType);
  const sortingTypes = ["인기순", "최근 세팅일순", "거리순", "이름순"];

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
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
        {index !== 3 ? <Styled.Divider>|</Styled.Divider> : null}
      </Styled.Container>
    );
  });

  return (
    <Styled.Wrapper>
      <Styled.ButtonWrapper>{SortingButtons}</Styled.ButtonWrapper>
      <LazyLoadingItems searchWord={searchWord} sortingType={sortingType} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1140px;
    margin: 0 auto;
  `,
  Container: styled.div`
    display: flex;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    @media ${DEVICE_SIZE.mobileSmall} {
      justify-content: center;
      margin-bottom: 10px;
    }
  `,
  SortButton: styled.button`
    margin-left: 5px;
    margin-right: 5px;
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 1rem;
    }
  `,
  Divider: styled.div`
    color: ${COLOR.BORDER_UNFOCUSED};
  `,
};

export default GymListBanner;
