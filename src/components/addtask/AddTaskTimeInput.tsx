import { addZero } from "@/libs/GetFormattedData";
import { DateTimeInputProps } from "@/props/DateTimeProps";
import { stat } from "fs";
import React, { useEffect } from "react";

const AddTaskTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  id,
  state,
  setState,
  selectedDate,
}) => {
  // Checing current date
  const isCurrentDate =
    selectedDate ===
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;

  // Function to hanle change
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    if (
      isCurrentDate &&
      e.currentTarget.value <
        `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`
    ) {
      setState(`${new Date().getHours()}:${new Date().getMinutes()}`);
    } else {
      setState(e.currentTarget.value);
    }
  };

  return (
    <div className="my-5 text-center">
      {/* Label for the time input */}
      <label htmlFor={id}>{label}</label>
      <br />
      {/* Time input field */}
      <input
        id={id}
        type="time"
        value={state}
        onChange={handleChange}
        className="w-full px-3 py-2 bg-[#1F1F1F] rounded-lg outline-none"
      />
    </div>
  );
};

export default AddTaskTimeInput;
