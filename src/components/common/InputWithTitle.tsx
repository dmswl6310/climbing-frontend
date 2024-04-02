import { InputProps } from "@/constants/login/type";
import { styled } from "styled-components";

const InputWithTitle = ({
  name,
  title,
  type = "text",
  onChange,
  message = "",
  buttonText,
  onClick,
}: InputProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.InputContainer>
        <Styled.Input
          $hasMessage={message !== ""}
          name={name}
          type={type}
          onChange={onChange}
        />
        {buttonText ? (
          <Styled.Button onClick={onClick}>{buttonText}</Styled.Button>
        ) : null}
      </Styled.InputContainer>
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
    flex: 1 1 auto;
  `,
  InputContainer: styled.div`
    display: flex;
  `,
  Button: styled.button`
    margin: 0;
    padding: 0;
  `,
  Warning: styled.div`
    height: 10px;
    font-size: 12px;
    color: red;
  `,
};

export default InputWithTitle;
