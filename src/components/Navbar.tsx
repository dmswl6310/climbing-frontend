import { styled } from "styled-components";
import { useEffect, useState } from "react";
import AuthBar from "./auth/AuthBar";
import { usePathname } from "next/navigation";
import { FaRegHandRock } from "react-icons/fa";
import { COLOR } from "@/styles/global-color";

// navbar(헤더)를 보여주지 않을 페이지 주소 지정
const nonNavPage = ["/login", "/join", "/error"];

// 마진이 붙어야될 주소 지정
const marginPage = ["/home", "/search", "/gyms"];

const Navbar = () => {
  const pathName = usePathname();
  const [showNavBar, setShowNavBar] = useState(true);
  const needMargin = marginPage.some((url) => pathName?.includes(url));

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const needNavBar = !nonNavPage.some((url) => pathName?.includes(url));
    setShowNavBar(needNavBar);
  }, [pathName]);

  if (!showNavBar) return;

  // 햄버거 바는 기능이 적을시, 닉네임클릭시 나오는 네비와 합칠수도있음. 현재는 그대로 둠
  return (
    <>
      <S.Space></S.Space>
      <S.Wrapper $needMargin={needMargin}>
        <S.BarContainer>
          <S.Link href={"/"}>
            <FaRegHandRock />
            <S.Title>오르리</S.Title>
          </S.Link>
          <S.MenuContainer>
            <AuthBar />
            {/* <S.ButtonWrapper>=</S.ButtonWrapper> */}
          </S.MenuContainer>
        </S.BarContainer>
      </S.Wrapper>
    </>
  );
};

const S = {
  Link: styled.a`
    display: flex;
    text-decoration: none;
    font-size: 20px;
    color: ${COLOR.MAIN};
    font-weight: bold;
    &:visited {
      color: ${COLOR.MAIN};
    }
    align-items: center;
  `,
  Title: styled.div`
    margin-left: 3px;
  `,
  Palette: styled.div<{ $color: string }>`
    height: 27px;
    width: 27px;
    border-radius: 4px;
    background: ${({ $color }) => $color};
    cursor: pointer;
  `,
  Space: styled.div`
    height: 80px;
  `,
  Wrapper: styled.div<{ $needMargin: boolean }>`
    background: linear-gradient(45deg, white, ${COLOR.LIGHT_MAIN});
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;

    padding-left: ${({ $needMargin }) =>
      $needMargin === true ? "10%" : "30px"};
    padding-right: ${({ $needMargin }) =>
      $needMargin === true ? "10%" : "30px"};
  `,
  BarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
  `,
  MenuContainer: styled.div`
    display: flex;
    flex-direction: row;
  `,
  ButtonWrapper: styled.button`
    margin-left: 10px;
  `,
};

export default Navbar;
