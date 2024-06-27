import { type ChangeEventHandler, type FormEventHandler, useState } from "react";
import styled from "styled-components";
import { COLOR } from "@/styles/global-color";

interface ChatFormProps {
  placeholder?: string;
  handleSend: (message: string) => boolean;
}

const ChatForm = ({ placeholder, handleSend }: ChatFormProps) => {
  const [input, setInput] = useState("");

  const handleInput: ChangeEventHandler = (e) => {
    const input = (e.target as HTMLInputElement).value;
    if (input.length > 200) return;
    setInput(input);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const isSuccess = handleSend(input);
    if (isSuccess) setInput("");
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={handleInput} placeholder={placeholder || ""} />
      <button>전송</button>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  height: 50px;
  gap: 6px;
  & > input {
    border: 1px solid ${COLOR.DISABLED};
    border-radius: 6px;
    padding: 0 0.8rem;
    flex-grow: 1;
  }
  & > button {
    border: none;
    background: ${COLOR.MAIN};
    color: white;
    border-radius: 6px;
    padding: 0 12px;
    cursor: pointer;
  }
`;

export default ChatForm;
