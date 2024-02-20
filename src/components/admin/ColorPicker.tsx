import { BaseSyntheticEvent } from 'react';
import styled from 'styled-components';

const GRADE_COLORS = [
  '#F39897',
  '#F8CEA6',
  '#FBF3B3',
  '#D1EBAC',
  '#B6D3F1',
  '#B7ADE9',
  '#FF6355',
  '#FBA949',
  '#FAE442',
  '#8BD448',
  '#2AA8F2',
  '#9C4F96',
  '#9B4244',
  '#A66A40',
  '#B7AA5E',
  '#569556',
  '#4C709A',
  '#664980',
  '#FDFDFD',
  '#A5A5A5',
  '#1E1E1E',
];

interface ColorPickerProps {
  handleColorSelect: (color: string) => void;
}

const ColorPicker = ({ handleColorSelect }: ColorPickerProps) => {
  return (
    <Styled.Wrapper>
      {GRADE_COLORS.map((color, i) => (
        <Styled.Palette
          key={i}
          data-hex={color}
          $color={color}
          onClick={(e: BaseSyntheticEvent) =>
            handleColorSelect(e.target.dataset.hex)
          }
        ></Styled.Palette>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    position: absolute;
    bottom: 45px;
    right: 0px;
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
