"use client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disableDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disableDates,
}) => {
  const today = new Date();
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={today}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={today}
      disabledDates={disableDates}
    />
  );
};

export default Calendar;
