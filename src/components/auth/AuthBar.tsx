import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { styled } from "styled-components";
import Sidebar from "./Sidebar";

interface AuthButtonProps {
  // onLogin: MouseEventHandler<HTMLButtonElement>; // TODO: 함수 작성 후, type 재정의 필요
  // onLogout: MouseEventHandler<HTMLButtonElement>;
  // onSignup: MouseEventHandler<HTMLButtonElement>;
}

const AuthBar = ({}: // onLogin,
// onSignup,
AuthButtonProps) => {
  const { data: session, status } = useSession();

  // 로그인된 상태
  if (status === "authenticated") {
    return <Sidebar account={session.user!.email!} />;
  }

  // 로그인되지 않은 상태
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
};

const S = {
  ButtonWrapper: styled.button`
    margin-left: 10px;
  `,
};

export default AuthBar;
