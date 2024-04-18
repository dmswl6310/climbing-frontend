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
  Wrapper: styled.span`
    display: inline-block;
    line-height: 24px;
    border-radius: 8px;
    background-color: #dcdcdc;
    color: #666;
    padding: 4px 8px;
  `,
};

export default Tag;
