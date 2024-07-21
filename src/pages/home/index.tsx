import styled from "styled-components";
import { ReactElement } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "../_app";
import SearchLayout from "@/components/search/SearchLayout";
import SearchBanner from "@/components/search/searchBanner";
import GymListBanner from "@/components/search/GymListBanner";
import { useRouter } from "next/router";
import { COLOR } from "@/styles/global-color";

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Styled.Wrapper>
      <SearchBanner/>
      <GymListBanner isSearchPage={false} />
      <Styled.ButtonWrapper>
        <Styled.MoreButton
          className="container"
          onClick={() => router.push("/search")}
        >
          암장 더 알아보기 〉
        </Styled.MoreButton>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <SearchLayout>{page}</SearchLayout>
    </Layout>
  );
};

const Styled = {
  Wrapper: styled.div``,
  ButtonWrapper: styled.div`
    text-align: right;
    margin: 0 auto;
    max-width: 1140px;
  `,
  MoreButton: styled.button`
    cursor: pointer;
    background-color: white;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 300px;
    margin-right: 10px;

    // color: white;
    // background-color: ${COLOR.MAIN};
    // border: 2px solid ${COLOR.MAIN};
    // font-weight: bold;
    font-style: italic;

    color: ${COLOR.MAIN};
    border: 2px solid ${COLOR.MAIN};
    border-radius: 5px;
    padding: 8px 16px;
  `,
};

export default HomePage;
