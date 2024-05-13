import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import SettingDayCalendar from "./SettingDayCalendar";
import { CURRENT_CENTURY } from "@/constants/manage/constants";
import type { SettingDayEditorProps } from "@/constants/manage/types";

export const getDateObject = (date: Date) => {
  return { year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate() };
};

const SettingDayEditor = ({ date, setNewData }: SettingDayEditorProps) => {
  const convertDataToText = (string: string) => {
    const [yy, mm, dd] = string.split(".");
    return `${CURRENT_CENTURY}${yy} - ${mm} - ${dd}`;
  };

  const handleDelete = () => setNewData({ latestSettingDay: "" });

  const handleAddField = () => {
    const date = getDateObject(new Date());
    setNewData({
      latestSettingDay:
        date.year.toString().slice(2) +
        "." +
        date.month.toString().padStart(2, "0") +
        "." +
        date.date.toString().padStart(2, "0"),
    });
  };

  return (
    <S.Wrapper>
      <S.Header>
        최근 세팅일
        {date ? (
          <S.Icon onClick={handleDelete}>
            <IoTrash size="1.3rem" />
          </S.Icon>
        ) : null}
      </S.Header>
      <S.Content>
        {date ? (
          <>
            <S.TextField>{convertDataToText(date)}</S.TextField>
            <SettingDayCalendar setNewData={setNewData} />
          </>
        ) : (
          <div>
            <button className="btn-secondary" onClick={handleAddField}>
              + 세팅일 설정
            </button>
          </div>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 24px;
    padding: 32px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Content: styled.div<{ $direction?: string }>`
    position: relative;
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    button {
      flex: 1 0 0;
    }
  `,
  Icon: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
  TextField: styled.div`
    text-align: center;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    user-select: none;
  `,
};

export default SettingDayEditor;
