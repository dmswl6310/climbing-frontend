import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { styled } from "styled-components";

interface AuthButtonProps {
  isLoggedIn: boolean;
  username: string;
  // onLogin: MouseEventHandler<HTMLButtonElement>; // TODO: 함수 작성 후, type 재정의 필요
  onLogout: MouseEventHandler<HTMLButtonElement>;
  // onSignup: MouseEventHandler<HTMLButtonElement>;
}

const AuthBar = ({
  isLoggedIn,
  username,
  // onLogin,
  onLogout,
}: // onSignup,
AuthButtonProps) => {
  if (isLoggedIn) {
    return (
      <div>
        <S.ButtonWrapper>
          <p>Hello, {username}!</p>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <button onClick={onLogout}>로그아웃</button>
        </S.ButtonWrapper>
      </div>
    );
  } else {
    return (
      <div>
        <S.ButtonWrapper>
          <Link href={"/login"}>로그인</Link>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Link href={"/join"}>회원가입</Link>
        </S.ButtonWrapper>
      </div>
    );
  }
};

const S = {
  ButtonWrapper: styled.button`
    margin-left: 10px;
  `,
};

export default AuthBar;
