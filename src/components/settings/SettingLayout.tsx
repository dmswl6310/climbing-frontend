import { styled } from "styled-components";
import { COLOR } from "@/styles/global-color";
import { useRouter } from "next/router";
import { IoSettingsOutline } from "react-icons/io5";

const SettingLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const { page } = router.query;

  function handleMenuClick(page: string) {
    router.push({ pathname: "/settings", query: { page: page } });
  }

  return (
    <S.Wrapper>
      <S.Sidebar>
        <S.TitleContainer>
          <IoSettingsOutline size={27} />
          <S.Title>설정</S.Title>
        </S.TitleContainer>
        <S.Menu
          $isClicked={page === "myBookmark" || !page}
          className="link-plain"
          onClick={() => handleMenuClick("myBookmark")}
        >
          내 북마크 관리
        </S.Menu>
        <S.Menu
          $isClicked={page === "myPage"}
          className="link-plain"
          onClick={() => handleMenuClick("myPage")}
        >
          내 정보 수정
        </S.Menu>
        <S.Menu
          $isClicked={page === "deleteAccount"}
          className="link-plain"
          onClick={() => handleMenuClick("deleteAccount")}
        >
          계정 탈퇴
        </S.Menu>
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
  TitleContainer: styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
  `,
  Title: styled.h2`
    margin-left: 10px;
  `,
  Sidebar: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 30px;
    flex-shrink: 0;
    width: 350px;
    border-right: 1px solid ${COLOR.BORDER_UNFOCUSED};
  `,
  Menu: styled.button<{ $isClicked: boolean }>`
    width: 100%;
    height: 50px;
    border: 1px solid white;
    border-color: ${({ $isClicked }) => ($isClicked ? COLOR.MAIN : "white")};
    color: ${({ $isClicked }) => ($isClicked ? COLOR.MAIN : "black")};
    border-radius: 5px;
    background: white;
    font-weight: ${({ $isClicked }) => ($isClicked ? "bold" : "400")};
    margin: 5px 0;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    gap: 10px;
    background: ${COLOR.BACKGROUND_LIGHT};
    padding: 36px;
  `,
};

export default SettingLayout;
