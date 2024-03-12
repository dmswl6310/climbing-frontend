import styled from 'styled-components';
import { OpenHours, OpenHoursTableProps } from '@/constants/gyms/types';

// 상수
const DAYS_TEXT = {
  weekdays: '평일',
  weekends: '주말',
  holidays: '공휴일',
};

const OpenHoursTable = ({ openHours }: OpenHoursTableProps) => {
  const get24HrTime = (data: string) => {
    const [period, hours, minutes] = data.split(',');
    if (period === 'AM')
      return hours === '12' ? `00:${minutes}` : `${hours}:${minutes}`;

    return hours === '12'
      ? `12:${minutes}`
      : `${(Number(hours) + 12).toString()}:${minutes}`;
  };
  return (
    <S.Wrapper>
      {openHours.map(({ days, openTime, closeTime }: OpenHours, i) => (
        <li key={i}>
          <div>{DAYS_TEXT[days as keyof typeof DAYS_TEXT]}</div>
          <S.Divider>
            <hr />
          </S.Divider>
          <div>{`${get24HrTime(openTime)} - ${get24HrTime(closeTime)}`}</div>
        </li>
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.ul`
    margin-block: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }

    hr {
      position: relative;
      top: 2px;
      border-top: none;
      border-bottom: 1px dashed #d0d0d0;
    }
  `,
  Divider: styled.div`
    flex-grow: 2;
  `,
};

export default OpenHoursTable;
