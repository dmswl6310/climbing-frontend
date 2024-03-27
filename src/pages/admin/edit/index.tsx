import { ReactElement } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import EditPage1 from "../../../components/admin/EditPage1";
import EditPage2 from "../../../components/admin/EditPage2";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "@/pages/_app";

const EditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { page } = router.query;

  if (page === "2") return <EditPage2 />;
  else return <EditPage1 />;
};

EditPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default EditPage;
