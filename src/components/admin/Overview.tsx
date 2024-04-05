import Link from "next/link";
import styled from "styled-components";

const Overview = () => {
  return (
    <>
      <h2>내 암장 관리하기</h2>
      <Wrapper>
        <Link href={{ pathname: "/admin/edit/", query: { page: "1" } }} as="/admin/edit/">
          <Container>기본 정보 수정하기</Container>
        </Link>
        <Link href={{ pathname: "/admin/edit/", query: { page: "2" } }} as="/admin/edit/">
          <Container>상세 정보 수정하기</Container>
        </Link>
        <Link href={"/admin/manage"}>
          <Container>댓글 관리하기</Container>
        </Link>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0px 100px;
  gap: 12px;
`;

const Container = styled.div`
  display: grid;
  place-content: center center;
  background: white;
  border-radius: 16px;
  border: 1px solid #d0d0d0;
  padding: 24px;
  min-height: 100px;
  font-size: 1.3rem;
  cursor: pointer;
`;

export default Overview;
