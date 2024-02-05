import styled from 'styled-components';

const AccommodationsField = () => {
  return (
    <Styled.Wrapper>
      {ACCOMMODATIONS_LIST.map(({ value, text }) => (
        <label key={value}>
          <input type="checkbox" name={value} />
          {text}
        </label>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    gap: 12px;
  `,
};

// 상수
export const ACCOMMODATIONS_LIST = [
  {
    value: 'showers',
    text: '샤워실',
  },
  {
    value: 'yogamat',
    text: '요가매트',
  },
  {
    value: 'gymball',
    text: '짐볼',
  },
  {
    value: 'moonboard',
    text: '문보드',
  },
];

export default AccommodationsField;
