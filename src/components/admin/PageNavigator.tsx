import styled from "styled-components";
import { COLOR } from "@/styles/global-color";
import type { MouseEvent } from "react";

interface PageNavigatorProps {
  currentPage: number;
  pages: number;
  handlePageSelect: (value: number) => void;
}

const PageNavigator = ({ currentPage, pages, handlePageSelect }: PageNavigatorProps) => {
  const buttons = Array.from({ length: pages }, (_, i) => i + 1);
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const nextPage = Number(target.textContent);
    handlePageSelect(nextPage);
  };
  if (pages <= 1) return null;
  return (
    <S.Wrapper>
      {buttons.map((page) => (
        <S.Button key={page} onClick={handleClick} $disabled={page === currentPage}>
          {page}
        </S.Button>
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  `,
  Button: styled.div<{ $disabled: boolean }>`
    text-align: center;
    line-height: 2rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50px;
    background: ${({ $disabled }) => ($disabled ? COLOR.LIGHT_MAIN : "transparent")};
    cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
    &:hover {
      color: ${({ $disabled }) => !$disabled && "white"};
      background: ${({ $disabled }) => !$disabled && COLOR.MAIN};
    }
  `,
};

export default PageNavigator;
