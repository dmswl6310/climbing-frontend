import { useState } from "react";
import { styled } from "styled-components";
import SidebarDetails from "./SidebarDetails";

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
      <S.ButtonWrapper onClick={toggleSidebar}>
        <div>Hello, {account}님!</div>
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
};

export default Sidebar;
