import { useState } from "react";
import { styled } from "styled-components";
import SidebarDetails from "./SidebarDetails";
import { COLOR } from "@/styles/global-color";

interface SidebarProps {
  account: string;
}

const Sidebar = ({ account }: SidebarProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <S.ButtonWrapper className={"btn-plain"} onClick={toggleSidebar}>
        <div>
          반갑습니다, <S.Span>{account}</S.Span> 님!
        </div>
      </S.ButtonWrapper>
      <SidebarDetails
        account={account}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </div>
  );
};

const S = {
  ButtonWrapper: styled.button`
    margin-left: 10px;
  `,
  Span: styled.span`
    font-weight: bold;
    text-decoration: underline ${COLOR.MAIN};
    text-underline-position: under;
    text-decoration-thickness: 2px;
  `,
};

export default Sidebar;
