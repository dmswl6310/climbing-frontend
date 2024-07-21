import { IoSearch } from "react-icons/io5";
import styled from "styled-components";
import router from "next/router";
import Image from "next/image";
import img from "../../../public/magnifier.png";
import { DEVICE_SIZE } from "@/constants/styles";
import { SearchBannerProps } from "@/constants/search/types";
import { COLOR } from "@/styles/global-color";
import { DISTRCIT_CITY_DATA } from "@/constants/search/constants";
import Search from "../common/Search";

const SearchBanner = ({ searchWord }: SearchBannerProps) => {
  const handleSubmit = (event: {
    preventDefault: () => void;
    target: { [x: string]: { value: any } };
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
      <Styled.SearchContainer>
        <Styled.Title1>주변 암벽장 찾을 땐,</Styled.Title1>
        <Styled.Title2>오르-리</Styled.Title2>
        <Search
          dataList={DISTRCIT_CITY_DATA}
          width="450px"
          height="40px"
          postfixIcon={
            <IoSearch
              size="23"
              color={COLOR.MAIN}
            />
          }
          placeholder="주소 또는 암벽장을 입력하세요."
          onSubmit={handleSubmit}
          useLocation={true}
          border={"3px solid " + COLOR.LIGHT_MAIN}
          searchWord={searchWord}
          dropDownCount={5}
          isSearchPage={false}
        />
      </Styled.SearchContainer>
      <Styled.ImageWrapper>
        <Image src={img} alt="image" width={210} height={210} />
      </Styled.ImageWrapper>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 30px;
    margin-bottom: 30px;
  `,
  Title1: styled.div`
    font-size: 40px;
    margin-bottom: 10px;
    font-weight: bold;
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 2rem;
    }
  `,
  Title2: styled.div`
    font-size: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    color: ${COLOR.MAIN};
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 2rem;
      margin-bottom: 5px;
    }
  `,
  SearchContainer: styled.div`
    margin-top: 20px;
    width: 430px;
    display: flex;
    flex-direction: column;
  `,
  ImageWrapper: styled.div`
    @media ${DEVICE_SIZE.tablet} {
      display: none;
    }
  `,
};

export default SearchBanner;
