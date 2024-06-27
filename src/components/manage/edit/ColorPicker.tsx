import { BaseSyntheticEvent } from "react";
import styled from "styled-components";
import { GRADE_COLORS_HORIZONTAL, GRADE_COLORS_VERTICAL } from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { ColorPickerProps } from "@/constants/manage/types";

const ColorPicker = ({ className, handleColorSelect }: ColorPickerProps) => {
  return (
    <>
      <div className="desktop-view">
        <S.Wrapper>
          {GRADE_COLORS_HORIZONTAL.map((color, i) => (
            <S.Palette
              key={i}
              data-hex={color}
              $color={color}
              onClick={(e: BaseSyntheticEvent) => handleColorSelect(e.target.dataset.hex)}
            ></S.Palette>
          ))}
        </S.Wrapper>
      </div>
      <div className="mobile-view">
        <S.Wrapper $overflow={className}>
          {GRADE_COLORS_VERTICAL.map((color, i) => (
            <S.Palette
              key={i}
              data-hex={color}
              $color={color}
              onClick={(e: BaseSyntheticEvent) => handleColorSelect(e.target.dataset.hex)}
            ></S.Palette>
          ))}
        </S.Wrapper>
      </div>
    </>
  );
};

const S = {
  Wrapper: styled.div<{ $overflow?: string }>`
    position: absolute;
    bottom: 45px;
    ${({ $overflow }) => ($overflow === "overflow" ? "right: 0px;" : "left: 0px;")}
    display: flex;
    flex-wrap: wrap;
    width: calc(27px * 6 + 6px * 5);
    gap: 6px;
    background: #f1f0f0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 10px ${COLOR.DISABLED};
    @media ${DEVICE_SIZE.laptop} {
      flex-direction: column;
      width: calc(27px * 3 + 6px * 2);
      height: calc(27px * 7 + 6px * 6);
    }
  `,
  Palette: styled.div<{ $color: string }>`
    height: 27px;
    width: 27px;
    border-radius: 4px;
    background: ${({ $color }) => $color};
    cursor: pointer;
  `,
};

export default ColorPicker;
