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
    };
  }
  interface User extends DefaultUser {
    jwt: {
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
  }
}

export interface InputProps {
  name: string;
  title: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: { target: { value: string } }) => Promise<void> | void;
  message?: string;
  buttonText?: string;
  onClick?: any;
  onDisabled?: any;
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

// 백엔드 요청에 대한 응답
export interface EmailAuthProps {
  authNum: string;
}
