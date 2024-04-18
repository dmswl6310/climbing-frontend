import styled from "styled-components";
import NoData from "./NoData";
import type { GradeBarProps } from "@/constants/gyms/types";

const GradeBar = ({ grades }: GradeBarProps) => {
  return (
    <S.Wrapper>
      {!grades || grades.length < 1 ? (
        <NoData />
      ) : (
        <>
          <S.BarContainer>
            {grades.map((color, i) => (
              <S.BarItem key={i} $color={color} />
            ))}
          </S.BarContainer>
          <S.Label>
            <span>easy</span>
            <span>hard</span>
          </S.Label>
        </>
      )}
    </S.Wrapper>
  );
};

const S = {
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
    background: ${(props) => props.$color || "#d9d9d9"};
  `,
  Label: styled.div`
    display: flex;
    justify-content: space-between;
    color: #b7b7b7;
    line-height: 150%;
    margin-top: 4px;
  `,
};

export default GradeBar;
