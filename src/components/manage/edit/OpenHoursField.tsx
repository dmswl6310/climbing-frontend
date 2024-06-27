import styled from "styled-components";
import { DAYS_TEXT, HOURS, MINUTES } from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { OpenHoursFieldProps } from "@/constants/manage/types";

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
    @media ${DEVICE_SIZE.laptop} {
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
    }
  `,
  Block: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media ${DEVICE_SIZE.laptop} {
      gap: 0.3rem;
    }
  `,
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: ${COLOR.BACKGROUND_LIGHT};
    border-radius: 8px;
    border: 1px solid ${COLOR.DISABLED};
    padding: 0.75rem 1rem;
    select {
      border: none;
      background: transparent;
      padding: 0px;
      color: ${COLOR.BACKGROUND_DARK};
      text-align: center;
    }
    select:active,
    select:focus {
      color: black;
    }
    @media ${DEVICE_SIZE.laptop} {
      max-width: fit-content;
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      gap: 0.75rem;
    }
  `,
};

export default OpenHoursField;
