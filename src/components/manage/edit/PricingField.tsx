import styled from "styled-components";
import { PRICE_REGEX } from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { PricingFieldProps } from "@/constants/manage/types";

const PricingField = ({ index, item, price, handleChange }: PricingFieldProps) => {
  const handleTextChange = (input: string) => {
    if (input.length > 20) return;
    handleChange(input, index, "item");
  };

  const handleNumberChange = (input: string) => {
    const inputValue = input.replaceAll(",", "");
    if (!PRICE_REGEX.test(inputValue)) return;
    if (inputValue.length > 8) return;
    handleChange(inputValue, index, "price");
  };

  return (
    <S.Wrapper>
      <S.Block>
        <strong>옵션명</strong>
        <S.TextField $width={400}>
          <input value={item} onChange={(e) => handleTextChange(e.target.value)} />
          {item.length}/20
        </S.TextField>
      </S.Block>
      <S.Block>
        <strong>가격</strong>
        <S.TextField $width={145}>
          <input
            className="currency"
            value={Number(price).toLocaleString()}
            placeholder="0"
            onChange={(e) => handleNumberChange(e.target.value)}
          />
          원
        </S.TextField>
      </S.Block>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 20px;
    @media ${DEVICE_SIZE.laptop} {
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
    }
  `,
  Block: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media ${DEVICE_SIZE.laptop} {
      gap: 0.3rem;
    }
  `,
  TextField: styled.div<{ $width?: number }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: ${COLOR.BACKGROUND_LIGHT};
    color: ${COLOR.BACKGROUND_DARK};
    border-radius: 8px;
    border: 1px solid ${COLOR.DISABLED};
    padding: 12px 18px;
    width: ${({ $width }) => ($width ? `${$width}px` : "")};
    gap: 4px;
    .currency {
      text-align: right;
    }
    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0px;
      color: ${COLOR.BACKGROUND_DARK};
    }
    input:focus {
      color: black;
    }
    @media ${DEVICE_SIZE.laptop} {
      width: inherit;
    }
  `,
};

export default PricingField;
