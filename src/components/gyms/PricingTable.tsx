import styled from "styled-components";
import NoData from "./NoData";
import { COLOR } from "@/styles/global-color";
import type { Pricing, PricingTableProps } from "@/constants/gyms/types";

const PricingTable = ({ pricing }: PricingTableProps) => {
  return (
    <S.Wrapper>
      {!pricing || pricing.length < 1 ? (
        <NoData />
      ) : (
        pricing.map(({ item, price }: Pricing, i) => (
          <li key={i}>
            <div>{item}</div>
            <S.Divider>
              <hr />
            </S.Divider>
            <div>{`${Number(price).toLocaleString()} 원`}</div>
          </li>
        ))
      )}
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
      align-items: center;
      gap: 8px;
      margin-bottom: 0.5rem;
      &:last-child {
        margin: 0;
      }
      & > div:last-child {
        flex-shrink: 0;
      }
      @media (max-width: 500px) {
        font-size: 0.9rem;
      }
    }
    hr {
      position: relative;
      top: 2px;
      border-top: none;
      border-bottom: 1px dashed ${COLOR.DISABLED};
    }
  `,
  Divider: styled.div`
    flex-grow: 2;
    min-width: 5%;
  `,
};

export default PricingTable;
