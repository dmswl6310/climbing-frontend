import { BaseSyntheticEvent } from 'react';
import styled from 'styled-components';

const GRADE_COLORS = [
  '#f35f5f',
  '#fabb72',
  '#f3db85',
  '#b2dea3',
  '#b1d3ff',
  '#538adc',
  '#7c64dd',
];

const GradeField = () => {
  return (
    <Styled.Wrapper id="grade">
      {GRADE_COLORS.map((color) => (
        <Styled.Box
          key={color}
          data-hex={color}
          $color={color}
          className="empty"
          onClick={(e: BaseSyntheticEvent) => {
            e.target.classList.toggle('empty');
          }}
        ></Styled.Box>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div<{ $color?: string }>`
    display: flex;
    gap: 2px;
    .empty {
      background: #d9d9d9;
    }
  `,
  Box: styled.div<{ $color?: string }>`
    height: 33px;
    flex: 1 0 0;
    background: ${(props) => props.$color};
    cursor: pointer;
  `,
};

export default GradeField;
