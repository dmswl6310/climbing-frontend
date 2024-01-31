const OpenHoursField = () => {
  return (
    <>
      <select name="days">
        {OPEN_HOURS_LIST.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <input name="start-time" /> - <input name="end-time" />
      <button>추가</button>
    </>
  );
};

export const OPEN_HOURS_LIST = [
  { value: 'weekdays', text: '평일' },
  { value: 'weekends', text: '주말' },
  { value: 'holidays', text: '공휴일' },
];

export default OpenHoursField;
