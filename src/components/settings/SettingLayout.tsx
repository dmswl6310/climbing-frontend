import Link from "next/link";
import { styled } from "styled-components";

const SettingLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <S.Wrapper>
      <S.Sidebar>
        <h3>설정</h3>
        <Link
          className="link-plain"
          href={{ pathname: "/settings", query: { page: "myBookmark" } }}
          as="/settings/myBookmark"
        >
          내 북마크 관리
        </Link>
        <Link
          className="link-plain"
          href={{ pathname: "/settings", query: { page: "myPage" } }}
          as="/settings/myPage"
        >
          내 정보 수정
        </Link>
        <Link
          className="link-plain"
          href={{ pathname: "/settings", query: { page: "changePassword" } }}
          as="/settings/changePassword"
        >
          비밀번호 변경
        </Link>
        <Link
          className="link-plain"
          href={{ pathname: "/settings", query: { page: "deleteAccount" } }}
          as="/settings/deleteAccount"
        >
          계정 탈퇴
        </Link>
      </S.Sidebar>
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Sidebar: styled.div`
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
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    gap: 36px;
    background: #fafaf8;
    padding: 36px;
  `,
  Link: styled.a``,
};

export default SettingLayout;
