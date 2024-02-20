import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
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
  return (
    <Styled.Wrapper>
      <Styled.Header>이용 금액</Styled.Header>
      <Styled.Content $direction="column">
        {pricingList?.map(({ item, price }, i) => (
          <PricingField
            key={i}
            index={i}
            item={item}
            price={price}
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

export default PricingEditor;
