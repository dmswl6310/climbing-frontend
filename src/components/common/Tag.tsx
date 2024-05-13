import styled from "styled-components";
import type { TagProps } from "@/constants/gyms/types";

const Tag = ({ prefix, text }: TagProps) => {
  return (
    <S.Wrapper>
      {prefix}
      {text}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: inline-block;
    line-height: 1.5rem;
    border-radius: 0.5rem;
    background-color: #dcdcdc;
    color: #666;
    padding: 4px 8px;
    user-select: none;
  `,
};

export default Tag;
