import styled from 'styled-components';
import { Pricing, PricingTableProps } from '@/constants/types';

const PricingTable = ({ pricing }: PricingTableProps) => {
  return (
    <S.Wrapper>
      {pricing.map(({ item, price }: Pricing, i) => (
        <li key={i}>
          <div>{item}</div>
          <S.Divider>
            <hr />
          </S.Divider>
          <div>{`${insertThousandsComma(price)} 원`}</div>
        </li>
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.ul`
    margin-block: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }

    hr {
      position: relative;
      top: 2px;
      border-top: none;
      border-bottom: 1px dashed #d0d0d0;
    }
  `,
  Divider: styled.div`
    flex-grow: 2;
  `,
};

export const insertThousandsComma = (string: string) => {
  const characters = string.split('');

  if (characters.length < 4) return string;

  for (let i = -3; Math.abs(i) < characters.length; i -= 4) {
    characters.splice(i, 0, ',');
  }

  return characters.join('');
};

export default PricingTable;
