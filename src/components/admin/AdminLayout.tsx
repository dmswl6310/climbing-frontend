import Link from "next/link";
import styled from "styled-components";
import { HiOutlineChat, HiOutlineCog, HiOutlineHome } from "react-icons/hi";
import { MdOutlineComment } from "react-icons/md";

const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <S.Wrapper>
      <S.Menu>
        <S.Header>
          <HiOutlineHome size="1.3rem" />
          <Link href="/admin">
            <strong>메인 화면</strong>
          </Link>
        </S.Header>
        <S.Header>
          <HiOutlineCog size="1.3rem" />
          <strong>암장 정보 관리</strong>
        </S.Header>
        <S.Links>
          <li>
            <Link href={{ pathname: "/admin/edit/", query: { page: "1" } }} as="/admin/edit/">
              기본 정보
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/admin/edit/", query: { page: "2" } }} as="/admin/edit/">
              상세 정보
            </Link>
          </li>
        </S.Links>
        <S.Header>
          <MdOutlineComment size="1.3rem" />
          <Link href="/admin/manage">
            <strong>댓글 관리</strong>
          </Link>
        </S.Header>
        <S.Header>
          <HiOutlineChat size="1.3rem" />
          <Link href="/admin/chat">
            <strong>1:1 문의</strong>
          </Link>
        </S.Header>
      </S.Menu>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    border-top: 1px solid #d0d0d0;
    border-bottom: 1px solid #d0d0d0;

    a {
      text-decoration: none;
    }
  `,
  Menu: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 36px 42px;
    width: 320px;
    flex-shrink: 0;
    gap: 12px;
    border-right: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  Content: styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    gap: 36px;
    background: #fafaf8;
    padding: 36px 63px;
    & input:focus,
    textarea:focus,
    select:focus {
      outline: none;
    }
  `,
  Links: styled.ul`
    margin: 0;
    list-style-type: circle;
    & li {
      margin-bottom: 10px;
    }
  `,
};

export default AdminLayout;
