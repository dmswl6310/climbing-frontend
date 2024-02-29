"use client";
import { styled } from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthBar from "./auth/AuthBar";
import { usePathname } from "next/navigation";

// navbar(헤더)를 보여주지 않을 페이지 주소 지정
const nonNavPage = ["/login", "/join"];

const Navbar = () => {
  const pathName = usePathname();
  const [showNavBar, setShowNavBar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const needNavBar = !nonNavPage.some((url) => pathName?.includes(url));
    setShowNavBar(needNavBar);
  }, [pathName]);

  return (
    showNavBar && (
      <>
        <S.Space></S.Space>
        <S.Wrapper>
          <S.BarContainer>
            <Link href={"/"} style={{ textDecoration: "none" }}>
              오르리
            </Link>
            <S.MenuContainer>
              <AuthBar
                isLoggedIn={isLoggedIn}
                username={"000님"}
                onLogout={() => console.log("logout")}
              />
              <S.ButtonWrapper>=</S.ButtonWrapper>
            </S.MenuContainer>
          </S.BarContainer>
        </S.Wrapper>
      </>
    )
  );
};

const S = {
  Space: styled.div`
    height: 80px;
  `,
  Wrapper: styled.div`
    background-color: #f9f2f2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  `,
  BarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
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
