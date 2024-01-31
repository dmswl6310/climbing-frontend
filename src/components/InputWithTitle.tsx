import { styled } from "styled-components";

interface InputProps {
  title: string;
}

export const InputWithTitle = ({ title }: InputProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Form autoComplete="off">
        <Styled.Input name={title} type="text" />
      </Styled.Form>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  Title: styled.div``,
  Form: styled.form`
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
  `,
  Input: styled.input`
    border: none;
    outline: none; // input 포커스시의 볼더 없애기
    width: 80%;
  `,
};

export default InputWithTitle;
