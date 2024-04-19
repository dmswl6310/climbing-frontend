import { Search } from "@/components/common/Search";
import { IoSearch } from "react-icons/io5";
import styled from "styled-components";
import router from "next/router";
import Image from "next/image";
import img from "../../../public/magnifier.png";
import { SearchBannerProps, sampleAddress } from "@/constants/search/types";
import { COLOR } from "@/styles/global-color";

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
          dataList={sampleAddress}
          width="400px"
          postfixIcon={<IoSearch />}
          placeholder="주소를 입력하면 실내암벽장을 찾아드려요."
          onSubmit={handleSubmit}
          useLocation={true}
          border={"3px solid " + COLOR.LIGHT_MAIN}
          searchWord={searchWord}
        />
      </Styled.SearchContainer>
      <Styled.ImageWrapper>
        <Styled.BigImage src={img} alt="image" />
      </Styled.ImageWrapper>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 50px;
    margin-bottom: 20px;
  `,
  Title1: styled.div`
    font-size: 40px;
    margin-bottom: 10px;
    font-weight: bold;
  `,
  Title2: styled.div`
    font-size: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    color: ${COLOR.MAIN};
  `,
  SearchContainer: styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
  `,
  ImageWrapper: styled.div`
    width: 200px;
    height: 200px;
  `,
  BigImage: styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: "cover";
  `,
};

export default SearchBanner;
