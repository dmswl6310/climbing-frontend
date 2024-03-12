import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { FaCalendarDay } from 'react-icons/fa';
import { IoTrash } from 'react-icons/io5';
import { SettingDayEditorProps, Value } from '@/constants/admin/types';
import { CURRENT_CENTURY } from '@/constants/admin/constants';

const TODAY = new Date();
const TODAYS_DATE = {
  year: TODAY.getFullYear(),
  month: TODAY.getMonth() + 1,
  date: TODAY.getDate(),
};

const SettingDayEditor = ({ date, setCurrentData }: SettingDayEditorProps) => {
  const [isClosed, setIsClosed] = useState(true);

  const convertDataToText = (string: string) => {
    const [yy, mm, dd] = string.split('.');
    return `${CURRENT_CENTURY}${yy} - ${mm} - ${dd}`;
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

      setCurrentData((prev) => {
        const latestSettingDay =
          newYear.slice(2) +
          '.' +
          newMonth.padStart(2, '0') +
          '.' +
          newDate.padStart(2, '0');
        return { ...prev, latestSettingDay };
      });
      setIsClosed((prev) => !prev);
    }
  };

  const handleIconClick = () => setIsClosed((prev) => !prev);

  const handleDelete = () =>
    setCurrentData((prev) => ({ ...prev, latestSettingDay: '' }));

  const handleAddField = () => {
    setCurrentData((prev) => {
      const latestSettingDay =
        TODAYS_DATE.year.toString().slice(2) +
        '.' +
        TODAYS_DATE.month.toString().padStart(2, '0') +
        '.' +
        TODAYS_DATE.date.toString().padStart(2, '0');
      return { ...prev, latestSettingDay };
    });
  };

  const validateDate = (year: number, month: number, date: number) => {
    if (
      year > TODAYS_DATE.year ||
      (year >= TODAYS_DATE.year && month > TODAYS_DATE.month) ||
      (year >= TODAYS_DATE.year &&
        month >= TODAYS_DATE.month &&
        date > TODAYS_DATE.date)
    )
      throw new Error('최근 세팅일은 미래의 날짜로 설정할 수 없습니다.');
  };

  if (date) {
    const dateString = convertDataToText(date);
    return (
      <S.Wrapper>
        <S.Header>
          <span>최근 세팅일</span>
          <S.Icon onClick={handleDelete}>
            <IoTrash />
          </S.Icon>
        </S.Header>
        <S.Content>
          <S.TextField>{dateString}</S.TextField>
          <div>
            <S.Icon onClick={handleIconClick}>
              <FaCalendarDay size="1.3rem" />
            </S.Icon>
            <S.CalendarContainer>
              <Calendar
                className={isClosed ? 'closed' : null}
                onChange={handleChange}
              />
            </S.CalendarContainer>
          </div>
        </S.Content>
      </S.Wrapper>
    );
  } else {
    return (
      <S.Wrapper>
        <S.Header>최근 세팅일</S.Header>
        <S.Content>
          <button onClick={handleAddField}>세팅일 설정</button>
        </S.Content>
      </S.Wrapper>
    );
  }
};

const S = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid #d0d0d0;

    .closed {
      display: none;
    }
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
  `,
  CalendarContainer: styled.div`
    position: absolute;
    bottom: 85px;
    left: 190px;
    width: 450px;
  `,
};

export default SettingDayEditor;
