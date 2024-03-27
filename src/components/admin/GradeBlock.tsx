import { useState } from "react";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import type { GradeBlockProps } from "@/constants/admin/types";

const GradeBlock = ({ index, color, handleColorChange }: GradeBlockProps) => {
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
          <ColorPicker handleColorSelect={handleColorSelect} />
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
    border: 1px solid #d0d0d0;
    width: inherit;
    height: 45px;
    background: ${({ $color }) => $color};
    cursor: pointer;
  `,
};

export default GradeBlock;
