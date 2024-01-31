import styled from 'styled-components';

interface DetailedListItem {
  [key: string]: string | number;
}

interface DetailedListProps {
  items: Array<DetailedListItem>;
}

const DetailedList = ({ items }: DetailedListProps) => {
  return (
    <Styled.Wrapper>
      {items.map((item, i) => {
        const keys = Object.keys(item);
        return (
          <li key={i}>
            <div>{item[keys[0]]}</div>
            <Styled.Divider>
              <hr />
            </Styled.Divider>
            <div>{item[keys[1]]}</div>
          </li>
        );
      })}
    </Styled.Wrapper>
  );
};

const Styled = {
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
