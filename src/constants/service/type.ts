const requestOptions = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
} as const;

type Option = (typeof requestOptions)[keyof typeof requestOptions];

// 데이터 타입 정의
export interface RequestProps {
  option: Option;
  url: string;
  token?: string;
  data?: any;
  onSuccess?: (data: any) => void | any;
  onError?: () => void;
  hasBody?: boolean; // response의 body 여부
}

export interface GetProps {
  absoluteUrl: string;
  token?: string;
  onSuccess?: (data: any) => void | any;
  onError?: () => void;
  hasBody?: boolean;
}

export interface PostProps {
  option: Option;
  absoluteUrl: string;
  data: any;
  token?: string;
  onSuccess?: (data: any) => void | any;
  onError?: () => void;
  hasBody?: boolean;
}
