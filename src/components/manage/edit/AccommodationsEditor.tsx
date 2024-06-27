import styled from "styled-components";
import { ACCOMMODATIONS_LIST } from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
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
              checked={accommodationsList?.includes(text)}
              readOnly
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
    @media ${DEVICE_SIZE.laptop} {
      padding: 1.3rem 1rem;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      grid-template-columns: 1fr;
    }
  `,
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${COLOR.BACKGROUND_LIGHT};
    color: ${COLOR.BACKGROUND_DARK};
    border-radius: 8px;
    border: 1px solid ${COLOR.DISABLED};
    padding: 12px 18px;
    height: 56px;
    gap: 8px;
    &:hover {
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      @media ${DEVICE_SIZE.laptop} {
        box-shadow: none;
      }
    }
    &:active {
      box-shadow: none;
      transform: translate(0, 4px);
      @media ${DEVICE_SIZE.laptop} {
        transform: none;
      }
    }
    cursor: pointer;
    input {
      border: none;
      background: transparent;
      padding: 0px;
      flex-shrink: 1;
      pointer-events: none;
      accent-color: ${COLOR.BACKGROUND_DARK};
    }
    span {
      flex: 1 0 0;
      pointer-events: none;
    }
  `,
};

export default AccommodationsEditor;
