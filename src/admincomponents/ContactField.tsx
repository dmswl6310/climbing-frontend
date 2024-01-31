import styled from 'styled-components';

const ContactField = () => {
  return (
    <Styled.Wrapper>
      <select name="platform">
        {PLATFORM_LIST.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <input name="address" />
      <button>추가</button>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export const PLATFORM_LIST = [
  { value: 'phone', text: '전화번호' },
  { value: 'twitter', text: '트위터' },
  { value: 'facebook', text: '페이스북' },
  { value: 'instagram', text: '인스타그램' },
  { value: 'blog', text: '블로그' },
];

export default ContactField;
