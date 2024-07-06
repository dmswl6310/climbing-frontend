import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import { usePathname } from "next/navigation";

const AuthBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathName = usePathname();

  // 로그인된 상태
  if (status === "authenticated") {
    return (
      <Sidebar
        account={session.user ? session.user.nickname : "undefined user"}
      />
    );
  }

  // 로그인되지 않은 상태
  return (
    <S.ButtonContainer $needHide={pathName?.includes("/search")}>
      <S.Button1 onClick={() => router.push("/login")}>로그인</S.Button1>
      <S.Button2 onClick={() => router.push("/join")}>회원가입</S.Button2>
    </S.ButtonContainer>
  );
};

const S = {
  ButtonContainer: styled.div<{ $needHide?: boolean }>`
    margin: 0;
    @media ${DEVICE_SIZE.tablet} {
      ${(props) => props.$needHide && `display: none;`}
    }
  `,
  Button1: styled.button`
    border: 1px solid ${COLOR.MAIN};
    border-radius: 5px;
    margin-left: 10px;
    background-color: white;
    font-size: 15px;
    // font-weight: bold;
    cursor: pointer;
    padding: 5px 10px;
  `,
  Button2: styled.button`
    border: 1px solid ${COLOR.MAIN};
    border-radius: 5px;
    margin-left: 10px;
    background-color: ${COLOR.MAIN};
    font-size: 15px;
    color: white;
    // font-weight: bold;
    cursor: pointer;
    padding: 5px 10px;
  `,
};

export default AuthBar;
