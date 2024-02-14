import { styled } from "styled-components";

interface InputProps {
  name: string;
  title: string;
}

export const InputWithTitle = ({ name, title }: InputProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Input name={name} type="text" />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  `,
  Title: styled.div``,
  Input: styled.input``,
};

export default InputWithTitle;
