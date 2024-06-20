import styled from "styled-components";
import type { ChangeEvent } from "react";

interface FilterBarProps {
  handleFilterSelect: (value: string) => void;
}

const FilterBar = ({ handleFilterSelect }: FilterBarProps) => {
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => handleFilterSelect(e.target.value);
  return (
    <S.Wrapper>
      필터:{" "}
      <select onChange={handleSelect}>
        <option value="all">전체</option>
        <option value="admin">관리자</option>
        <option value="user">이용자</option>
        <option value="manager">매니저</option>
      </select>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    justify-self: flex-end;
  `,
};

export default FilterBar;
