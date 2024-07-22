import MyBookmark from "@/components/settings/MyBookmark";
import Mypage from "@/components/settings/Mypage";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import SettingLayout from "@/components/settings/SettingLayout";
import DeleteAccount from "@/components/settings/DeleteAccount";

const SettingPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { page } = router.query;

  switch (page) {
    case "myBookmark":
      return <MyBookmark />;
    case "myPage":
      return <Mypage />;
    case "deleteAccount":
      return <DeleteAccount />;
    default:
      return <MyBookmark />;
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
