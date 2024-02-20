import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { GymData } from '@/pages/admin/edit';

interface AccommodationsEditorProps {
  accommodationsList: string[] | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

const AccommodationsEditor = ({
  accommodationsList,
  setCurrentData,
}: AccommodationsEditorProps) => {
  const handleChange = (
    target: HTMLInputElement,
    checkedItem: string,
    isChecked: boolean,
  ) => {
    if (!isChecked) {
      const prevList = accommodationsList ? accommodationsList : [];
      const newList = [...prevList, checkedItem].sort((a, b) =>
        a > b ? 1 : -1,
      );
      setCurrentData(
        (prev) => ({ ...prev, accommodations: [...newList] }) as GymData,
      );
      target.checked = !isChecked;
    } else {
      const filteredList = accommodationsList?.filter(
        (item) => item !== checkedItem,
      );
      setCurrentData(
        (prev) => ({ ...prev, accommodations: [...filteredList!] }) as GymData,
      );
      target.checked = !isChecked;
    }
  };
  return (
    <Styled.Wrapper>
      <Styled.Header>시설 정보</Styled.Header>
      <Styled.Content>
        {ACCOMMODATIONS_LIST.map(({ value, text }, i) => (
          <Styled.TextField
            key={i}
            onClick={(e) => {
              const input = (e.target as HTMLElement)
                .firstElementChild as HTMLInputElement;
              handleChange(input, input.name, input.checked);
            }}
          >
            <input
              type="checkbox"
              name={value}
              defaultChecked={accommodationsList?.includes(value)}
            />
            <span>{text}</span>
          </Styled.TextField>
        ))}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 24px;
    padding: 32px 40px;
  `,
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;
  `,
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    width: 175px;
    gap: 8px;
    cursor: pointer;

    input {
      border: none;
      background: transparent;
      padding: 0px;
      flex-shrink: 1;
      pointer-events: none;
    }

    span {
      flex: 1 0 0;
      pointer-events: none;
    }
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

export default AccommodationsEditor;
