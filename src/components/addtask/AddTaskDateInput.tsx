import { NumberOfDaysInMonth } from "@/constants/Months";
import { DateTimeInputProps } from "@/props/DateTimeProps";
import React from "react";

const calculateMaxDate = () => {
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let currentMonthDays = NumberOfDaysInMonth[month];

  // Check if the current year is a leap year
  if (new Date(year, 1, 29).getDate() === 29) {
    currentMonthDays = 29; // February in a leap year
  }

  const DAYS_TO_ADD = 7;

  if (day >= 25) {
    day = (day + DAYS_TO_ADD) - currentMonthDays;
    month = month === 11 ? 0 : month + 1;
    year = month === 11 ? year + 1 : year;
  } else {
    day += DAYS_TO_ADD;
  }

  const newDate = `${year}-${month + 1}-${day}`;
  return newDate;
};

const AddTaskDateInput: React.FC<DateTimeInputProps> = ({
  label,
  id,
  state,
  setState,
}) => {
  const currentDate = new Date();
  const minDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  return (
    <div className="my-5 text-center">
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        type="date"
        min={minDate}
        max={calculateMaxDate()}
        value={state}
        onChange={(e): void => setState(e.currentTarget.value)}
        className="w-full px-3 py-2 border-2 border-gray-200 outline-none"
      />
    </div>
  );
};

export default AddTaskDateInput;
