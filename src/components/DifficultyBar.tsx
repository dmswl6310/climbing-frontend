import styled from 'styled-components';

// 상수
const DIFFICULTY_COLORS = [
  '#f35f5f',
  '#fabb72',
  '#f3db85',
  '#b2dea3',
  '#b1d3ff',
  '#538adc',
  '#7c64dd',
];

interface DifficultyBarProps {
  [key: string]: number;
}

const DifficultyBar = ({ difficulty = 0 }: DifficultyBarProps) => {
  const colorCount = DIFFICULTY_COLORS.length;
  const barColors = DIFFICULTY_COLORS.slice(0, difficulty).concat(
    Array(colorCount - difficulty).fill(undefined),
  );

  return (
    <Styled.Wrapper>
      <Styled.BarContainer>
        {barColors.map((color, i) => (
          <Styled.BarItem key={i} $color={color} />
        ))}
      </Styled.BarContainer>
      <Styled.Label>
        <span>easy</span>
        <span>hard</span>
      </Styled.Label>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  BarContainer: styled.div`
    display: flex;
    gap: 2px;
  `,
  BarItem: styled.div<{ $color?: string }>`
    height: 33px;
    flex: 1 0 0;
    background: ${(props) => props.$color || '#d9d9d9'};
  `,
  Label: styled.div`
    display: flex;
    justify-content: space-between;
    color: #b7b7b7;
    line-height: 150%;
    margin-top: 4px;
  `,
};

export default DifficultyBar;
