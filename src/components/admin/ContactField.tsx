import { useState } from 'react';
import styled from 'styled-components';

const REGEX_NUMBER = /^[0-9-]*$/;

const ContactField = () => {
  const [input, setInput] = useState('');

  const handleInput = (input: string) => {
    if (!REGEX_NUMBER.test(input)) return;
    setInput(input);
  };

  return (
    <div>
      <input
        name='contact'
        className='field__contact'
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        placeholder='전화번호 입력'
        required={true}
      />
    </div>
  );
};

export default ContactField;
