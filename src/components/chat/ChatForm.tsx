import { COLOR } from "@/styles/global-color";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import styled from "styled-components";

export type SocketData = string | ArrayBufferLike | Blob | ArrayBufferView;

interface ChatFormProps {
  handleSend: (message: string) => void;
}

const ChatForm = ({ handleSend }: ChatFormProps) => {
  const [input, setInput] = useState("");

  const handleInput: ChangeEventHandler = (e) => {
    const input = (e.target as HTMLInputElement).value;
    if (input.length > 200) return;
    setInput(input);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("서버에 메시지 전송 시도");
    handleSend(input);
    setInput("");
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="문의를 남겨주세요 :)"
      />
      <button>전송</button>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  height: 50px;
  gap: 6px;

  & > input {
    border: 1px solid #cacaca;
    border-radius: 6px;
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
