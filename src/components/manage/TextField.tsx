import { useState } from "react";
import type { TextFieldProps } from "@/constants/manage/types";

const TextField = ({ formName = undefined, characterLimit }: TextFieldProps) => {
  const [input, setInput] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length > characterLimit) return;
    setInput(text);
  };

  return (
    <input
      name={formName}
      className="field__name"
      value={input}
      onChange={(e) => handleInput(e)}
      required={true}
    />
  );
};

export default TextField;
