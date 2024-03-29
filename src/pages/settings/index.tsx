import MyBookmark from "@/components/settings/MyBookmark";
import Mypage from "@/components/settings/Mypage";
import { ReactElement, useState } from "react";
import { styled } from "styled-components";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import SettingLayout from "@/components/settings/SettingLayout";

const SettingPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { page } = router.query;

  switch (page) {
    case "myPage":
      return <Mypage />;
    case "myBookmark":
      return <MyBookmark />;
    default:
      return <Mypage />;
  }
};

SettingPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <SettingLayout>{page}</SettingLayout>
    </Layout>
  );
};

export default SettingPage;
