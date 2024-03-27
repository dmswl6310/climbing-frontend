import styled from "styled-components";
import { DAYS_TEXT, HOURS, MINUTES } from "@/constants/admin/constants";
import type { OpenHoursFieldProps } from "@/constants/admin/types";

const OpenHoursField = ({
  index,
  days,
  openTime,
  closeTime,
  handleChange,
}: OpenHoursFieldProps) => {
  const [openPeriod, openHours, openMinutes] = openTime.split(",");
  const [closePeriod, closeHours, closeMinutes] = closeTime.split(",");
  return (
    <S.Wrapper>
      <S.Block>
        <strong>옵션명</strong>
        <S.TextField>
          <select
            name="days"
            value={days}
            onChange={(e) => handleChange(e.target.value, index, "days")}
          >
            {DAYS_TEXT.map(({ value, text }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </S.TextField>
      </S.Block>
      <S.Block>
        <strong>시작 시간</strong>
        <S.TextField>
          <select
            value={openPeriod}
            onChange={(e) => {
              const newValue = `${e.target.value},${openHours},${openMinutes}`;
              handleChange(newValue, index, "openTime");
            }}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
          <select
            value={openHours}
            onChange={(e) => {
              const newValue = `${openPeriod},${e.target.value},${openMinutes}`;
              handleChange(newValue, index, "openTime");
            }}
          >
            {HOURS.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
          :
          <select
            value={openMinutes}
            onChange={(e) => {
              const newValue = `${openPeriod},${openHours},${e.target.value}`;
              handleChange(newValue, index, "openTime");
            }}
          >
            {MINUTES.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
        </S.TextField>
      </S.Block>
      <S.Block>
        <strong>종료 시간</strong>
        <S.TextField>
          <select
            value={closePeriod}
            onChange={(e) => {
              const newValue = `${e.target.value},${closeHours},${closeMinutes}`;
              handleChange(newValue, index, "closeTime");
            }}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
          <select
            value={closeHours}
            onChange={(e) => {
              const newValue = `${closePeriod},${e.target.value},${closeMinutes}`;
              handleChange(newValue, index, "closeTime");
            }}
          >
            {HOURS.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
          :
          <select
            value={closeMinutes}
            onChange={(e) => {
              const newValue = `${closePeriod},${closeHours},${e.target.value}`;
              handleChange(newValue, index, "closeTime");
            }}
          >
            {MINUTES.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
        </S.TextField>
      </S.Block>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 20px;
  `,
  Block: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;

    select {
      border: none;
      background: transparent;
      padding: 0px;
    }
  `,
};

export default OpenHoursField;
