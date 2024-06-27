import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import OpenHoursField from "./OpenHoursField";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { OpenHoursEditorProps } from "@/constants/manage/types";

const OpenHoursEditor = ({ openHoursList, setNewData }: OpenHoursEditorProps) => {
  const handleAddField = () => {
    const currentList = openHoursList ? openHoursList : [];
    const newItem = {
      days: "weekdays",
      openTime: "AM,12,00",
      closeTime: "AM,12,00",
    };
    setNewData({ openHours: [...currentList, newItem] });
  };

  const handleChange = (newValue: string, index: number, key: string) => {
    const newList = [...openHoursList!];
    const targetItem = newList[index];
    targetItem[key as keyof typeof targetItem] = newValue;
    setNewData({ openHours: [...newList] });
  };

  const handleDelete = (index: number) => {
    const openHours = openHoursList!.filter((_, i) => i !== index);
    setNewData({ openHours });
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-header">영업 시간</div>
      <S.Content $direction="column">
        {openHoursList?.map(({ days, openTime, closeTime }, i) => (
          <div key={i}>
            <S.Row>
              <OpenHoursField
                index={i}
                days={days}
                openTime={openTime}
                closeTime={closeTime}
                handleChange={handleChange}
              />
              <S.Icon onClick={() => handleDelete(i)}>
                <IoTrash size="1.3rem" />
              </S.Icon>
            </S.Row>
            {i !== openHoursList.length - 1 && <hr className="mobile-view" />}
          </div>
        ))}
        <div>
          <button className="btn-secondary" onClick={handleAddField}>
            + 옵션 추가
          </button>
        </div>
      </S.Content>
    </div>
  );
};

const S = {
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 30px;
    @media ${DEVICE_SIZE.laptop} {
      padding: 1.3rem 1rem;
      gap: 0;
      hr {
        border-top: none;
        border-bottom: 1px solid ${COLOR.DISABLED};
        margin: 2rem 0.75rem;
      }
      button {
        margin-top: 2rem;
      }
      & > div:last-child {
        align-self: flex-end;
      }
    }
  `,
  Row: styled.div`
    display: flex;
    gap: 20px;
  `,
  Icon: styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 12px;
    cursor: pointer;
    @media ${DEVICE_SIZE.laptop} {
      align-self: flex-start;
    }
  `,
};

export default OpenHoursEditor;
