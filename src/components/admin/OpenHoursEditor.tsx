import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import OpenHoursField from './OpenHoursField';
import { GymData } from '@/pages/admin/edit';

interface OpenHoursEditorProps {
  openHoursList:
    | Array<{ days: string; openTime: string; closeTime: string }>
    | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

const OpenHoursEditor = ({
  openHoursList,
  setCurrentData,
}: OpenHoursEditorProps) => {
  const handleAddField = () => {
    const currentList = openHoursList ? openHoursList : [];
    const newItem = {
      days: 'weekdays',
      openTime: 'AM,12,00',
      closeTime: 'AM,12,00',
    };
    setCurrentData(
      (prev) =>
        ({
          ...prev,
          openHours: [...currentList, newItem],
        }) as GymData,
    );
  };
  const handleChange = (newValue: string, index: number, key: string) => {
    setCurrentData((prev) => {
      const newList = [...openHoursList!];
      const targetItem = newList[index];
      targetItem[key as keyof typeof targetItem] = newValue;
      return { ...prev, openHours: [...newList] } as GymData;
    });
  };
  return (
    <Styled.Wrapper>
      <Styled.Header>영업 시간</Styled.Header>
      <Styled.Content $direction="column">
        {openHoursList?.map(({ days, openTime, closeTime }, i) => (
          <OpenHoursField
            index={i}
            days={days}
            openTime={openTime}
            closeTime={closeTime}
            key={i}
            handleChange={handleChange}
          />
        ))}
        <button onClick={handleAddField}>옵션 추가</button>
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

    & > div {
      display: flex;
      gap: 8px;
    }
  `,
};

export default OpenHoursEditor;
