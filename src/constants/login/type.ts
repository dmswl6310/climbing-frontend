import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { Dispatch, SetStateAction } from "react";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      email: string;
      nickname: string;
    };

    jwt: {
      accessToken: string;
      refreshToken: string;
      accessExpireDate?: number;
      refreshExpireDate?: number;
    };
  }
  interface User extends DefaultUser {
    jwt: {
      accessToken: string;
      refreshToken: string;
      accessExpireDate?: number;
      refreshExpireDate?: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    jwt: {
      accessToken: string;
      refreshToken: string;
      accessExpireDate?: number;
      refreshExpireDate?: number;
    };
  }
}

export interface InputProps {
  name: string;
  title?: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: { target: { value: string } }) => Promise<void> | void;
  message?: string;
  buttonText?: string;
  onClick?: any;
  onDisabled?: any;
  defaultValue?: string;
  isDisabled?: boolean;
  inputHeight?: string;
  inputPadding?: string;
}

export interface EmailVerificationProps {
  enteredEmail: string;
  remainingTime: number;
  setTime: Dispatch<SetStateAction<number>>;
  isBtnDisabled: boolean;
  setBtnDisabled: Dispatch<SetStateAction<boolean>>;
  isCodeValid: boolean;
  setIsCodeValid: Dispatch<SetStateAction<boolean>>;
}

const socialType = {
  KAKAO: "KAKAO",
  GOOGLE: "GOOGLE",
  NAVER: "NAVER",
  NORMAL: "NORMAL",
  NULL: "NORMAL",
} as const;

export type SocialType = (typeof socialType)[keyof typeof socialType];

export const socialTypeToKorean = (type: SocialType) => {
  switch (type) {
    case "KAKAO":
      return "카카오";
    case "GOOGLE":
      return "구글";
    case "NAVER":
      return "네이버";
    case "NORMAL":
      return "일반";
  }
};

// 백엔드 요청에 대한 응답
export interface EmailCheckResponse {
  check: string;
  socialType: SocialType;
}
