import { useState } from "react";
import styled from "styled-components";
import { IoEllipsisVerticalCircleSharp } from "react-icons/io5";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { EllipsisButtonProps } from "@/constants/types";

const EllipsisButton = ({ options }: EllipsisButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  return (
    <>
      <S.Background $visible={isOpen} onClick={closeMenu} />
      <S.Wrapper>
        <S.Ellipsis size="1.75rem" color={COLOR.BACKGROUND_DARK} onClick={toggleMenu} />
        <S.OptionsContainer $visible={isOpen}>
          {options.map(({ text, action }) => (
            <S.Option key={text} onClick={action}>
              {text}
            </S.Option>
          ))}
        </S.OptionsContainer>
      </S.Wrapper>
    </>
  );
};

const S = {
  Ellipsis: styled(IoEllipsisVerticalCircleSharp)`
    display: grid;
    place-content: center center;
    cursor: pointer;
  `,
  Wrapper: styled.div`
    position: relative;
    display: none;
    @media ${DEVICE_SIZE.mobileLarge} {
      display: block;
    }
  `,
  Background: styled.div<{ $visible: boolean }>`
    position: fixed;
    display: ${({ $visible }) => ($visible ? "block" : "none")};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
  `,
  OptionsContainer: styled.div<{ $visible: boolean }>`
    display: ${({ $visible }) => ($visible ? "flex" : "none")};
    position: absolute;
    flex-direction: column;
    align-items: center;
    top: 30px;
    right: 0;
    border: 1px solid ${COLOR.DISABLED};
    border-radius: 0.75rem;
    background: white;
    z-index: 50;
    user-select: none;
    overflow: hidden;
  `,
  Option: styled.div`
    padding: 0.75rem 1.5rem;
    width: 100%;
    white-space: nowrap;
    text-align: center;
    &:active,
    &:focus {
      background: ${COLOR.DISABLED};
    }
    border-bottom: 1px solid ${COLOR.DISABLED};
    &:last-child {
      border: none;
    }
  `,
};

export default EllipsisButton;
