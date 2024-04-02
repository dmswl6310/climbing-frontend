import { useState } from "react";
import styled from "styled-components";
import { LuPlus } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import Socket from "./Socket";

const HelpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatroom = () => {
    setIsOpen(true);
  };

  const closeChatroom = () => {
    setIsOpen(false);
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.Button $isOpen={isOpen} onClick={isOpen ? closeChatroom : openChatroom}>
          {isOpen ? <MdOutlineClose /> : <LuPlus />}
        </S.Button>
        {isOpen ? <Socket /> : null}
      </S.Modal>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: fixed;
    bottom: 70px;
    right: 70px;
  `,
  Modal: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  Button: styled.div<{ $isOpen: boolean }>`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ $isOpen }) => ($isOpen ? "coral" : "black")};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
  `,
};

export default HelpModal;
