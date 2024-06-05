import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import ContentContainer from "../ContentContainer";
import OpenHoursField from "./OpenHoursField";
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
      <ContentContainer direction="column" gap="30px">
        {openHoursList?.map(({ days, openTime, closeTime }, i) => (
          <S.Row key={i}>
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
        ))}
        <div>
          <button className="btn-secondary" onClick={handleAddField}>
            + 옵션 추가
          </button>
        </div>
      </ContentContainer>
    </div>
  );
};

const S = {
  Row: styled.div`
    display: flex;
    gap: 20px;
  `,
  Icon: styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 12px;
    cursor: pointer;
  `,
};

export default OpenHoursEditor;
