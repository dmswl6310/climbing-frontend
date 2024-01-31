import styled from 'styled-components';

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return <Styled.Wrapper>{text}</Styled.Wrapper>;
};

const Styled = {
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
