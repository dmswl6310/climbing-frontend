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
      <S.Link className="link-plain" href={"/login"}>
        로그인
      </S.Link>
      <S.Link className="link-plain" href={"/join"}>
        회원가입
      </S.Link>
    </div>
  );
};

const S = {
  Link: styled.a`
    margin-left: 30px;
    font-weight: bold;
  `,
};

export default AuthBar;
