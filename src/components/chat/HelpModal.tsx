import styled from "styled-components";
import { MdOutlineClose, MdOutlineSupportAgent } from "react-icons/md";
import Socket from "./Socket";

interface HelpModalProps {
  gymId: string; // HelpModal 컴포넌트에서 gymId를 쓸일 없으면 context를 통해서 Socket 컴포넌트가 읽도록 하는 방향 고려
  gymName: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

const HelpModal = ({ gymId, gymName, isOpen, setIsOpen }: HelpModalProps) => {
  return (
    <S.Wrapper>
      <S.Modal>
        <S.Button $isOpen={isOpen} onClick={setIsOpen}>
          {isOpen ? <MdOutlineClose size="2.2rem" /> : <MdOutlineSupportAgent size="2.2rem" />}
        </S.Button>
        {isOpen ? <Socket gymName={gymName} gymId={gymId} /> : null}
      </S.Modal>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: fixed;
    z-index: 100;
    bottom: 40px;
    right: 40px;
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
