import { BaseSyntheticEvent, useState } from 'react';

interface TextFieldProps {
  formName?: string|undefined;
  characterLimit: number;
}

const TextField = ({ formName = undefined, characterLimit }: TextFieldProps) => {
  const [input, setInput] = useState('');

  const handleInput = (e: BaseSyntheticEvent) => {
    const text = e.target.value;
    if (text.length > characterLimit) return;
    setInput(text);
  };

  return (
    <input name={formName} className='field__name' value={input} onChange={(e) => handleInput(e)} required={true} />
  );
};

export default TextField;
