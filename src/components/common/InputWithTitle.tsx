import { styled } from "styled-components";

interface InputProps {
  name: string;
  title: string;
  type?: string;
  onChange?: (event: { target: { value: string } }) => Promise<void> | void;
  message?: string;
}

const InputWithTitle = ({
  name,
  title,
  type = "text",
  onChange,
  message = "",
}: InputProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Input
        $hasMessage={message !== ""}
        name={name}
        type={type}
        onChange={onChange}
      />
      <Styled.Warning>{message}</Styled.Warning>
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
  Input: styled.input<{ $hasMessage: boolean }>`
    height: 30px;
    outline-color: ${(props) => (props.$hasMessage ? "red" : "green")};
  `,
  Warning: styled.div`
    height: 10px;
    font-size: 12px;
    color: red;
  `,
};

export default InputWithTitle;
