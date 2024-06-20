import { type ChangeEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import type { Member } from "./MemberTable";

interface ModalProps {
  closeModal: () => void;
  selectedMember: Member | null;
  updateRole: (role: string) => void;
}

const Modal = ({ closeModal, selectedMember, updateRole }: ModalProps) => {
  const [role, setRole] = useState(selectedMember?.role || "");
  const warning = useRef<HTMLDivElement | null>(null);

  const handleSelect: ChangeEventHandler = (e) => {
    if (!warning.current || !selectedMember) return;
    const selectedRole = (e.target as HTMLSelectElement).value;
    setRole(selectedRole);
    if (selectedRole === selectedMember.role) {
      warning.current.textContent = "";
      return;
    }
    warning.current.textContent = "*멤버의 권한을 바꾸는 작업입니다.";
  };

  const handleConfirm = () => {
    if (role === selectedMember?.role) return;
    const response = confirm(
      `해당 멤버의 권한을 '${selectedMember?.role}'에서 '${role}'로 변경할까요?`,
    );
    if (!response) return;
    updateRole(role);
  };

  return (
    <S.Wrapper>
      <S.Background onClick={closeModal} />
      <S.Foreground>
        <M.Container>
          <M.Title>멤버 권한 변경</M.Title>
          {selectedMember && (
            <M.Row>
              {selectedMember.nickname}
              <div>
                <M.Select defaultValue={selectedMember.role} onChange={handleSelect}>
                  <option>admin</option>
                  <option>manager</option>
                  <option>user</option>
                </M.Select>
              </div>
            </M.Row>
          )}
          <M.Warning ref={warning}></M.Warning>
          <M.Buttons>
            <button className="btn-secondary" onClick={closeModal}>
              취소
            </button>
            <button className="btn-primary" onClick={handleConfirm}>
              변경
            </button>
          </M.Buttons>
        </M.Container>
      </S.Foreground>
    </S.Wrapper>
  );
};

const M = {
  Container: styled.div`
    display: flex;
    min-height: 140px;
    flex-direction: column;
  `,
  Title: styled.h3`
    margin: 0;
    margin-bottom: 20px;
    text-align: center;
  `,
  Row: styled.div`
    display: flex;
    width: 300px;
    justify-content: space-between;
    gap: 8px;
    & button {
      width: 80px;
    }
  `,
  Select: styled.select`
    margin-left: auto;
  `,
  Warning: styled.div`
    height: 1.5rem;
    color: rgb(255, 0, 0);
    font-size: 0.75rem;
    margin-bottom: auto;
  `,
  Buttons: styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    & button {
      width: 100px;
    }
  `,
};

const S = {
  Wrapper: styled.div`
    position: fixed;
    display: grid;
    place-content: center center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  Foreground: styled.div`
    position: relative;
    z-index: 10;
    background: rgba(255, 255, 255, 1);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  `,
  Background: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  `,
};

export default Modal;
