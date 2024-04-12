import { Dispatch, SetStateAction } from "react";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      nickname: string;
      token: string;
    };
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
  remainingTime: number;
  setTime: Dispatch<SetStateAction<number>>;
  isBtnDisabled: boolean;
  setBtnDisabled: Dispatch<SetStateAction<boolean>>;
  verificationNum: string;
  isCodeValid: boolean;
  setIsCodeValid: Dispatch<SetStateAction<boolean>>;
}

// 백엔드 요청에 대한 응답
export interface EmailAuthProps {
  authNum: string;
}
