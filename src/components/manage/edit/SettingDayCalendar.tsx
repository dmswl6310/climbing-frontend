import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import { FaCalendarDay } from "react-icons/fa";
import { getDateObject } from "./SettingDayEditor";
import { COLOR } from "@/styles/global-color";
import type { SettingDayCalendarProps, Value } from "@/constants/manage/types";
import "react-calendar/dist/Calendar.css";

const SettingDayCalendar = ({ setNewData }: SettingDayCalendarProps) => {
  const [isClosed, setIsClosed] = useState(true);
  const background = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const onWindowClick = (e: MouseEvent) => {
      if (e.target === background.current) setIsClosed(true);
    };
    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  const validateDate = (year: number, month: number, date: number) => {
    const today = getDateObject(new Date());
    if (
      year > today.year ||
      (year >= today.year && month > today.month) ||
      (year >= today.year && month >= today.month && date > today.date)
    )
      throw new Error("최근 세팅일은 미래의 날짜로 설정할 수 없습니다.");
  };

  const handleChange = (value: Value) => {
    if (value) {
      const selectedDate = new Date(value.toString());
      const newYear = selectedDate.getFullYear().toString();
      const newMonth = (selectedDate.getMonth() + 1).toString();
      const newDate = selectedDate.getDate().toString();

      try {
        validateDate(Number(newYear), Number(newMonth), Number(newDate));
      } catch (e) {
        return alert(e);
      }
      setNewData({
        latestSettingDay:
          newYear.slice(2) + "." + newMonth.padStart(2, "0") + "." + newDate.padStart(2, "0"),
      });
      setIsClosed(!isClosed);
    }
  };

  const handleIconClick = () => setIsClosed(!isClosed);

  return (
    <>
      {isClosed ? null : <Background ref={background} />}
      <div onClick={handleIconClick}>
        <Icon>
          <FaCalendarDay size="1.3rem" />
        </Icon>
      </div>
      <CalendarContainer>
        <Calendar
          className={isClosed ? "closed" : null}
          onChange={handleChange}
          locale="ko-KR"
          formatDay={(_, date) => date.getDate().toString()}
        />
      </CalendarContainer>
    </>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const CalendarContainer = styled.div`
  position: absolute;
  bottom: 85px;
  left: 190px;
  .closed {
    display: none;
  }
  .react-calendar {
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0 10px #d0d0d0;
    overflow: hidden;
  }
  .react-calendar__tile--now {
    background: ${COLOR.LIGHT_MAIN};
    &:hover {
      background: #c8dfff;
    }
  }
`;

const Icon = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default SettingDayCalendar;
