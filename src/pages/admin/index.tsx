import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import AdminLayout from "@/components/admin/AdminLayout";
import Overview from "@/components/admin/Overview";

const AdminHome = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 유저에게 암장 정보가 매핑되어 있는 경우에만 Overview 렌더링

  return (
    <AdminLayout>
      <Overview />
      <HR />
      <Text>현재 관리하고 있는 암장이 없습니다. 내 암장을 사이트에 등록해 보아요!</Text>
      <Link href={"/admin/register"}>
        <Btn>암장 등록하기</Btn>
      </Link>
    </AdminLayout>
  );

  // 테스트 후 복원
  // useEffect(() => {
  //   if (!session) router.push({ pathname: "/login" });
  // }, []);

  // return !session ? null : (
  //   <>
  //     <AdminLayout><Overview /></AdminLayout>
  //   </>
  // );
};

const HR = styled.hr`
  border: 2px dashed gray;
  width: 100%;
`;

const Text = styled.div`
  text-align: center;
`;

const Btn = styled.div`
  background: #307fe5;
  color: white;
  padding: 24px;
  border-radius: 12px;
  display: grid;
  width: 160px;
  place-content: center center;
  margin-left: auto;
  margin-right: auto;
`;

export default AdminHome;
