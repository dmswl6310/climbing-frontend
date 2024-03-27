import { BaseSyntheticEvent } from "react";
import styled from "styled-components";
import { GRADE_COLORS } from "@/constants/admin/constants";
import type { ColorPickerProps } from "@/constants/admin/types";

const ColorPicker = ({ handleColorSelect }: ColorPickerProps) => {
  return (
    <S.Wrapper>
      {GRADE_COLORS.map((color, i) => (
        <S.Palette
          key={i}
          data-hex={color}
          $color={color}
          onClick={(e: BaseSyntheticEvent) => handleColorSelect(e.target.dataset.hex)}
        ></S.Palette>
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: absolute;
    bottom: 45px;
    left: 0px;
    display: flex;
    flex-wrap: wrap;
    width: calc(27px * 6 + 6px * 5);
    gap: 6px;
    background: #f1f0f0;
    border-radius: 8px;
    padding: 20px;
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
