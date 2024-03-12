import styled from 'styled-components';
import { IoTrash } from 'react-icons/io5';
import OpenHoursField from './OpenHoursField';
import { OpenHoursEditorProps } from '@/constants/admin/types';

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
    setCurrentData((prev) => ({
      ...prev,
      openHours: [...currentList, newItem],
    }));
  };

  const handleChange = (newValue: string, index: number, key: string) => {
    setCurrentData((prev) => {
      const newList = [...openHoursList!];
      const targetItem = newList[index];
      targetItem[key as keyof typeof targetItem] = newValue;
      return { ...prev, openHours: [...newList] };
    });
  };

  const handleDelete = (index: number) => {
    setCurrentData((prev) => {
      const openHours = openHoursList!.filter((_, i) => i !== index);
      return { ...prev, openHours };
    });
  };

  return (
    <S.Wrapper>
      <S.Header>영업 시간</S.Header>
      <S.Content $direction="column">
        {openHoursList?.map(({ days, openTime, closeTime }, i) => (
          <S.Row key={i}>
            <OpenHoursField
              index={i}
              days={days}
              openTime={openTime}
              closeTime={closeTime}
              handleChange={handleChange}
            />
            <S.Icon onClick={() => handleDelete(i)}>
              <IoTrash size="1.3rem" />
            </S.Icon>
          </S.Row>
        ))}
        <button onClick={handleAddField}>옵션 추가</button>
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
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
  Row: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Icon: styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 12px;
    cursor: pointer;
  `,
};

export default OpenHoursEditor;
