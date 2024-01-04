// Importing constants and props
import { NumberOfDaysInMonth } from "@/constants/Months";
import { DateTimeInputProps } from "@/props/DateTimeProps";
import React from "react";

// Function to calculate the minimum date
const calculateMinDate = () => {
  const currentDate = new Date();
  return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
};

// Function to calculate the maximum date for input
const calculateMaxDate = () => {
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let currentMonthDays = NumberOfDaysInMonth[month];

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

// Component for the date input field
const AddTaskDateInput: React.FC<DateTimeInputProps> = ({
  label,
  id,
  state,
  setState,
}) => {
  return (
    <div className="my-5">
      <label htmlFor={id} className="ml-2">{label}</label>      
      <br />
      <input
        id={id}
        type="date"
        min={calculateMinDate()} // Set the minimum date using the function
        max={calculateMaxDate()}
        value={state}
        onChange={(e): void => setState(e.currentTarget.value)}
        className="w-full px-3 py-2  mt-1 dark:bg-[#1F1F1F] dark:border-0 border-2 border-gray-200 rounded-lg outline-none"
      />
    </div>
  );
};

export default AddTaskDateInput;
