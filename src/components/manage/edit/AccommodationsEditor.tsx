import styled from "styled-components";
import ContentContainer from "../ContentContainer";
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
      <ContentContainer gap="20px">
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
      </ContentContainer>
    </div>
  );
};

const S = {
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    width: 175px;
    gap: 8px;
    cursor: pointer;
    input {
      border: none;
      background: transparent;
      padding: 0px;
      flex-shrink: 1;
      pointer-events: none;
    }
    span {
      flex: 1 0 0;
      pointer-events: none;
    }
  `,
};

export default AccommodationsEditor;
