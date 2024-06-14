import { Dispatch, SetStateAction } from "react";

export interface SidebarDetailProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  account: String;
}
