import { InputProps } from "@/constants/login/type";
import { styled } from "styled-components";
import { CONFIRM_MESSAGE } from "@/constants/login/constants";
import { COLOR } from "@/styles/global-color";

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
  defaultValue,
  isDisabled = false,
  inputHeight = "40px",
  inputPadding = "10px",
}: InputProps) => {
  return (
    <Styled.Wrapper>
      {title && <Styled.Title>{title}</Styled.Title>}
      <Styled.Container>
        <Styled.InputContainer>
          <Styled.Input
            $isWarning={message !== "" && message !== CONFIRM_MESSAGE}
            $inputHeight={inputHeight}
            $inputPadding={inputPadding}
            placeholder={placeholder}
            name={name}
            type={type}
            onChange={onChange}
            defaultValue={defaultValue}
            disabled={isDisabled}
          />
          {buttonText ? (
            <Styled.Button onClick={onClick} disabled={onDisabled}>
              {buttonText}
            </Styled.Button>
          ) : null}
        </Styled.InputContainer>
        <Styled.Result $isWarning={message !== CONFIRM_MESSAGE}>
          {message !== "" && "*"}
          {` ${message}`}
        </Styled.Result>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
  `,
  Title: styled.div`
    width: 200px;
    padding-bottom: 5px;
  `,
  Container: styled.div`
    width: 100%;
  `,
  Input: styled.input<{
    $isWarning: boolean;
    $inputHeight: string;
    $inputPadding: string;
  }>`
    &:focus {
    }
    height: ${(props) => props.$inputHeight};
    outline-color: ${(props) => (props.$isWarning ? COLOR.WARNING : "green")};
    border-radius: 5px;
    border: 1px solid ${COLOR.BORDER_UNFOCUSED};
    padding: 0 ${(props) => props.$inputPadding};
    flex: 1 1 auto;
    &::placeholder {
      font-size: 0.9rem;
    }
  `,
  InputContainer: styled.div`
    display: flex;
  `,
  Button: styled.button`
    &:disabled {
      opacity: 0.3;
    }
    background-color: ${COLOR.MAIN};
    border: 1px solid ${COLOR.MAIN};
    border-radius: 5px;
    color: white;
    margin-left: 10px;
    padding: 0 8px;
    min-width: 40px;
  `,
  Result: styled.div<{ $isWarning: boolean }>`
    margin: 5px 2px;
    height: 10px;
    font-size: 12px;
    text-align: left;
    color: ${(props) => (props.$isWarning ? "red" : "green")};
  `,
};

export default InputWithTitle;
