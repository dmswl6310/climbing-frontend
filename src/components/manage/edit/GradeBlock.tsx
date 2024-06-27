import { useState } from "react";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import { COLOR } from "@/styles/global-color";
import type { GradeBlockProps } from "@/constants/manage/types";

const GradeBlock = ({ index, size, color, handleColorChange }: GradeBlockProps) => {
  const [blockColor, setBlockColor] = useState(color);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleColorSelect = (color: string) => {
    setBlockColor(color);
    handleColorChange(index, color);
  };

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  return (
    <S.Wrapper>
      <S.Block
        $color={blockColor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isExpanded ? (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <ColorPicker
            handleColorSelect={handleColorSelect}
            className={index / size >= 0.5 ? "overflow" : ""}
          />
        </div>
      ) : null}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: relative;
    flex: 1 0 0;
  `,
  Block: styled.div<{ $color: string }>`
    box-sizing: border-box;
    border: 1px solid ${COLOR.DISABLED};
    width: inherit;
    height: 45px;
    background: ${({ $color }) => $color};
    cursor: pointer;
  `,
};

export default GradeBlock;
