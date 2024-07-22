import { Session } from "next-auth";
import type { ReactNode } from "react";

// 공용 컴포넌트
export interface BookmarkProps {
  session?: Session | null;
  update?: (data?: any) => Promise<Session | null>;
  gymId: string;
  size?: string;
}

export interface ReactIconProps {
  clickable: boolean;
  children: ReactNode;
}

export interface EllipsisButtonProps {
  options: Array<{ text: string; action: () => void }>;
}
