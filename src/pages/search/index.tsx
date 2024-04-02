import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { ReactElement } from "react";
import Search from "@/components/common/Search";
import Layout from "@/components/Layout";
import SearchLayout from "@/components/search/SearchLayout";
import { NextPageWithLayout } from "../_app";
import GymListBanner from "@/components/search/GymListBanner";
import { useRouter } from "next/router";
import { sampleAddress } from "@/constants/search/types";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const searchWord = router.query.q as string;
  const sortingType = router.query.s as string;

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
      <Styled.SearchWrapper>
        <Search
          dataList={sampleAddress}
          width="400px"
          postfixIcon={<IoSearch />}
          placeholder="주소를 입력하면 실내암벽장을 찾아드려요."
          onSubmit={handleSubmit}
          useLocation={true}
          searchWord={searchWord}
        />
      </Styled.SearchWrapper>
      <GymListBanner searchWord={searchWord} sortingType={sortingType} />
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
