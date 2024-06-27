import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import ReactIcon from "@/components/common/ReactIcon";
import SettingDayCalendar from "./SettingDayCalendar";
import { CURRENT_CENTURY } from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
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
    <div className="editor-wrapper">
      <div className="editor-header editor-removable">
        최근 세팅일
        {date && (
          <ReactIcon clickable={true}>
            <IoTrash size="1.3rem" onClick={handleDelete} />
          </ReactIcon>
        )}
      </div>
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
    </div>
  );
};

const S = {
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
    @media ${DEVICE_SIZE.laptop} {
      padding: 1.3rem 1rem;
    }
  `,
  TextField: styled.div`
    text-align: center;
    background: ${COLOR.BACKGROUND_LIGHT};
    color: ${COLOR.BACKGROUND_DARK};
    border-radius: 8px;
    border: 1px solid ${COLOR.DISABLED};
    padding: 12px 18px;
    user-select: none;
  `,
};

export default SettingDayEditor;
