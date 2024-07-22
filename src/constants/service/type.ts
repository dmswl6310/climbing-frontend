import { Session } from "next-auth";

const requestOptions = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
} as const;

type Option = (typeof requestOptions)[keyof typeof requestOptions];

export type UpdateTokenInfo = {
  accessToken?: string;
  refreshToken?: string;
  accessExpireDate?: number;
  refreshExpireDate?: number;
};

// 데이터 타입 정의
export interface RequestProps {
  option: Option;
  url: string;
  session?: Session | null;
  data?: any;
  onSuccess?: (data: any) => void | any;
  onError?: (error: Error) => void;
  hasBody?: boolean; // response의 body 여부
  update?: (data?: any) => Promise<Session | null>;
}

export interface GetProps {
  absoluteUrl: string;
  session?: Session | null;
  onSuccess?: (data: any) => void | any;
  onError?: (error: Error) => void;
  hasBody?: boolean;
  update?: (data?: any) => Promise<Session | null>;
}

export interface PostProps {
  option: Option;
  absoluteUrl: string;
  data: any;
  session?: Session | null;
  onSuccess?: (data: any) => void | any;
  onError?: (error: Error) => void;
  hasBody?: boolean;
  update?: (data?: any) => Promise<Session | null>;
}
