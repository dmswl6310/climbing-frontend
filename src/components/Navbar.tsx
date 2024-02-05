import { styled } from "styled-components";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import AuthButton from "./auth/AuthBar";
import AuthBar from "./auth/AuthBar";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
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
