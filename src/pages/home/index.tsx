import styled from "styled-components";
import { ReactElement } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "../_app";
import SearchLayout from "@/components/search/SearchLayout";
import SearchBanner from "@/components/search/searchBanner";
import GymListBanner from "@/components/search/GymListBanner";
import { useRouter } from "next/router";

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Styled.Wrapper>
      <SearchBanner />
      <GymListBanner />
      <Styled.ButtonWrapper>
        <Styled.MoreButton onClick={() => router.push("/search")}>
          내 주위 암장 더보기..
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
  `,
  MoreButton: styled.button`
    background-color: #b1d3ff;
    display: inline-block;
    margin-bottom: 300px;
    border: 1px solid #b1d3ff;
    border-radius: 10px;
    padding: 5px;
    /* font-weight: bold; */
    font-style: italic;
  `,
};

export default HomePage;
