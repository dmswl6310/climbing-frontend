import styled from 'styled-components';
import { PricingFieldProps } from '@/constants/admin/types';
import { PRICE_REGEX } from '@/constants/admin/constants';

const PricingField = ({
  index,
  item,
  price,
  handleChange,
}: PricingFieldProps) => {
  const handleTextChange = (input: string) => {
    if (input.length > 20) return;
    handleChange(input, index, 'item');
  };

  const handleNumberChange = (input: string) => {
    if (!PRICE_REGEX.test(input)) return;
    if (input.length > 8) return;
    handleChange(input, index, 'price');
  };

  return (
    <S.Wrapper>
      <div>
        <h4>옵션명</h4>
        <S.TextField>
          <input
            value={item}
            onChange={(e) => handleTextChange(e.target.value)}
          />
          {item.length}/20
        </S.TextField>
      </div>
      <div>
        <h4>가격</h4>
        <S.TextField>
          <input
            value={price}
            placeholder="0"
            onChange={(e) => handleNumberChange(e.target.value)}
          />
          원
        </S.TextField>
      </div>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 6px;
  `,
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;

    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0px;
    }
  `,
};

export default PricingField;
