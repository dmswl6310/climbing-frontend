import styled from "styled-components";
import { COLOR } from "@/styles/global-color";
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
    background-color: ${COLOR.DISABLED};
    padding: 4px 8px;
    user-select: none;
  `,
};

export default Tag;
