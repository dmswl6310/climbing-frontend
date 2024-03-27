import styled from "styled-components";
import { TagProps } from "@/constants/gyms/types";

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
    margin-right: 8px;
  `,
};

export default Tag;
