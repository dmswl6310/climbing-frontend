import styled from "styled-components";
import { DetailedListProps } from "@/constants/gyms/types";

const DetailedList = ({ items }: DetailedListProps) => {
  return (
    <S.Wrapper>
      {items.map((item, i) => {
        const keys = Object.keys(item);
        return (
          <li key={i}>
            <div>{item[keys[0]]}</div>
            <S.Divider>
              <hr />
            </S.Divider>
            <div>{item[keys[1]]}</div>
          </li>
        );
      })}
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

export default DetailedList;
