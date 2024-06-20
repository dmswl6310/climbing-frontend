import styled from "styled-components";
import { ACCOMMODATIONS_LIST } from "@/constants/manage/constants";
import type { AccommodationsEditorProps } from "@/constants/manage/types";

const AccommodationsEditor = ({ accommodationsList, setNewData }: AccommodationsEditorProps) => {
  const handleChange = (target: HTMLInputElement, checkedItem: string, isChecked: boolean) => {
    if (!isChecked) {
      const prevList = accommodationsList ? accommodationsList : [];
      const newList = [...prevList, checkedItem].sort((a, b) => a.localeCompare(b));
      setNewData({ accommodations: [...newList] });
      target.checked = !isChecked;
    } else {
      const filteredList = accommodationsList?.filter((item) => item !== checkedItem);
      setNewData({ accommodations: [...filteredList!] });
      target.checked = !isChecked;
    }
  };
  return (
    <div className="editor-wrapper">
      <div className="editor-header">시설 정보</div>
      <S.Wrapper>
        {ACCOMMODATIONS_LIST.map((text, i) => (
          <S.TextField
            key={i}
            onClick={(e) => {
              const input = (e.target as HTMLElement).firstElementChild as HTMLInputElement;
              handleChange(input, input.name, input.checked);
            }}
          >
            <input
              type="checkbox"
              name={text}
              defaultChecked={accommodationsList?.includes(text)}
            />
            <span>{text}</span>
          </S.TextField>
        ))}
      </S.Wrapper>
    </div>
  );
};

const S = {
  Wrapper: styled.div`
    padding: 32px 40px;
    display: grid;
    gap: 1.75rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `,
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    color: #666666;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    height: 56px;
    gap: 8px;
    &:hover {
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }
    &:active {
      box-shadow: none;
      transform: translate(0, 4px);
    }
    cursor: pointer;
    input {
      border: none;
      background: transparent;
      padding: 0px;
      flex-shrink: 1;
      pointer-events: none;
      accent-color: #666666;
    }
    span {
      flex: 1 0 0;
      pointer-events: none;
    }
  `,
};

export default AccommodationsEditor;
