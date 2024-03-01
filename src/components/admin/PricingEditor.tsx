import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { IoTrash } from 'react-icons/io5';
import PricingField from './PricingField';
import { GymData } from '@/pages/admin/edit';

interface PricingEditorProps {
  pricingList: Array<{ item: string; price: string }> | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

const PricingEditor = ({ pricingList, setCurrentData }: PricingEditorProps) => {
  const handleAddField = () => {
    const currentList = pricingList ? pricingList : [];
    const newItem = {
      item: '',
      price: '',
    };
    setCurrentData(
      (prev) =>
        ({
          ...prev,
          pricing: [...currentList, newItem],
        }) as GymData,
    );
  };

  const handleChange = (newValue: string, index: number, key: string) => {
    setCurrentData((prev) => {
      const newList = [...pricingList!];
      const targetItem = newList[index];
      targetItem[key as keyof typeof targetItem] = newValue;
      return { ...prev, pricing: [...newList] } as GymData;
    });
  };

  const handleDelete = (index: number) => {
    setCurrentData((prev) => {
      const pricing = pricingList!.filter((_, i) => i !== index);
      return { ...prev, pricing };
    });
  };

  return (
    <S.Wrapper>
      <S.Header>이용 금액</S.Header>
      <S.Content $direction="column">
        {pricingList?.map(({ item, price }, i) => (
          <S.Row key={i}>
            <PricingField
              index={i}
              item={item}
              price={price}
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

export default PricingEditor;
