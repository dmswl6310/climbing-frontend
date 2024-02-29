import styled from 'styled-components';
import { TagProps } from '@/constants/types';

const Tag = ({ prefix, text }: TagProps) => {
  return (
    <Styled.Wrapper>
      {prefix}
      {text}
    </Styled.Wrapper>
  );
};

const Styled = {
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
