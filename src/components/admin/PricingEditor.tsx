import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import PricingField from "./PricingField";
import type { PricingEditorProps } from "@/constants/admin/types";

const PricingEditor = ({ pricingList, setCurrentData }: PricingEditorProps) => {
  const handleAddField = () => {
    const currentList = pricingList ? pricingList : [];
    const newItem = {
      item: "",
      price: "",
    };
    setCurrentData((prev) => ({
      ...prev,
      pricing: [...currentList, newItem],
    }));
  };

  const handleChange = (newValue: string, index: number, key: string) => {
    setCurrentData((prev) => {
      const newList = [...pricingList!];
      const targetItem = newList[index];
      targetItem[key as keyof typeof targetItem] = newValue;
      return { ...prev, pricing: [...newList] };
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
            <PricingField index={i} item={item} price={price} handleChange={handleChange} />
            <S.Icon onClick={() => handleDelete(i)}>
              <IoTrash size="1.3rem" />
            </S.Icon>
          </S.Row>
        ))}
        <div>
          <button className="btn-secondary" onClick={handleAddField}>
            + 옵션 추가
          </button>
        </div>
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
    gap: 30px;
  `,
  Row: styled.div`
    display: flex;
    gap: 20px;
  `,
  Icon: styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 12px;
    cursor: pointer;
  `,
};

export default PricingEditor;
