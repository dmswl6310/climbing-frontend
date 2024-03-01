import styled from 'styled-components';

interface OpenHoursFieldProps {
  index: number;
  days: string;
  openTime: string;
  closeTime: string;
  handleChange: (newValue: string, index: number, key: string) => void;
}

const OpenHoursField = ({
  index,
  days,
  openTime,
  closeTime,
  handleChange,
}: OpenHoursFieldProps) => {
  const [openPeriod, openHours, openMinutes] = openTime.split(',');
  const [closePeriod, closeHours, closeMinutes] = closeTime.split(',');
  return (
    <S.Wrapper>
      <div>
        <h4>옵션명</h4>
        <S.TextField>
          <select
            name="days"
            value={days}
            onChange={(e) => handleChange(e.target.value, index, 'days')}
          >
            {DAYS_TEXT.map(({ value, text }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </S.TextField>
      </div>
      <div>
        <h4>시작 시간</h4>
        <S.TextField>
          <select
            value={openPeriod}
            onChange={(e) => {
              const newValue = `${e.target.value},${openHours},${openMinutes}`;
              handleChange(newValue, index, 'openTime');
            }}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
          <select
            value={openHours}
            onChange={(e) => {
              const newValue = `${openPeriod},${e.target.value},${openMinutes}`;
              handleChange(newValue, index, 'openTime');
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
              handleChange(newValue, index, 'openTime');
            }}
          >
            {MINUTES.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
        </S.TextField>
      </div>
      <div>
        <h4>종료 시간</h4>
        <S.TextField>
          <select
            value={closePeriod}
            onChange={(e) => {
              const newValue = `${e.target.value},${closeHours},${closeMinutes}`;
              handleChange(newValue, index, 'closeTime');
            }}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
          <select
            value={closeHours}
            onChange={(e) => {
              const newValue = `${closePeriod},${e.target.value},${closeMinutes}`;
              handleChange(newValue, index, 'closeTime');
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
              handleChange(newValue, index, 'closeTime');
            }}
          >
            {MINUTES.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
        </S.TextField>
      </div>
    </S.Wrapper>
  );
};

export const DAYS_TEXT = [
  { value: 'weekdays', text: '평일' },
  { value: 'weekends', text: '주말' },
  { value: 'holidays', text: '공휴일' },
];

const HOURS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
const MINUTES = ['00', '10', '20', '30', '40', '50'];

const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 6px;
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
      width: 100%;
      padding: 0px;
    }
  `,
};

export default OpenHoursField;
