import type { ReactNode } from "react";

// 공용 컴포넌트
export interface BookmarkProps {
  token?: string;
  gymId: string;
  size?: string;
}

export interface ReactIconProps {
  clickable: boolean;
  children: ReactNode;
}
