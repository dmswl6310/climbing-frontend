import { InputProps } from "@/constants/login/type";
import { styled } from "styled-components";

const InputWithTitle = ({
  name,
  title,
  type = "text",
  placeholder,
  onChange,
  message = "",
  buttonText,
  onClick,
  onDisabled,
}: InputProps) => {
  const confirmMessage = "사용 가능";

  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.InputContainer>
        <Styled.Input
          $isWarning={message !== "" && message !== confirmMessage}
          placeholder={placeholder}
          name={name}
          type={type}
          onChange={onChange}
        />
        {buttonText ? (
          <Styled.Button onClick={onClick} disabled={onDisabled}>
            {buttonText}
          </Styled.Button>
        ) : null}
      </Styled.InputContainer>
      <Styled.Result $isWarning={message !== confirmMessage}>
        {message}
      </Styled.Result>
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
  Input: styled.input<{ $isWarning: boolean }>`
    height: 30px;
    outline-color: ${(props) => (props.$isWarning ? "red" : "green")};
    flex: 1 1 auto;
    &::placeholder {
      font-size: 0.8rem;
    }
  `,
  InputContainer: styled.div`
    display: flex;
  `,
  Button: styled.button`
    margin: 0;
    padding: 0;
  `,
  Result: styled.div<{ $isWarning: boolean }>`
    height: 10px;
    font-size: 12px;
    color: ${(props) => (props.$isWarning ? "red" : "green")};
  `,
};

export default InputWithTitle;
