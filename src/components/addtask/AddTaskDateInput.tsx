import { NumberOfDaysInMonth } from "@/constants/Months";
import { isLeapYear } from "@/libs/GetInitialDate";
import { DateTimeInputProps } from "@/props/DateTimeProps";
import React from "react";

const getMaxDate = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let currentMonthDays = NumberOfDaysInMonth[month];

  if (month === 1 && isLeapYear(year)) {
    currentMonthDays = 29; // February in a leap year
  }

  if (day >= 25) {
    day = (day + 7) - currentMonthDays;
    month = month === 11 ? 0 : month + 1;
    year = month === 11 ? year : year + 1;
  } else {
    day += 7;
  }

  const newDate = `${year}-${month+1}-${day}`;
  return newDate
};

const AddTaskDateInput: React.FC<DateTimeInputProps> = ({
  label,
  id,
  state,
  setState,
}) => {
  const date = new Date();
  const minDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return (
    <div className="my-5 text-center">
      {/* Label for the date input */}
      <label htmlFor={id}>{label}</label>
      <br />
      {/* Date input field */}
      <input
        id={id}
        type="date"
        min={minDate}
        max={getMaxDate()}
        value={state}
        onChange={(e): void => setState(e.currentTarget.value)}
        className="w-full px-3 py-2 border-2 border-gray-200 outline-none"
      />
    </div>
  );
};

export default AddTaskDateInput;
