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
    `${addZero(new Date().getFullYear())}-${addZero(
      new Date().getMonth() + 1
    )}-${addZero(new Date().getDate())}`;

  // Function to hanle change
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const passedTime =
      e.currentTarget.value <
      `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`;

    if (isCurrentDate && passedTime) {
      setState(
        `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`
      );
      console.log(
        `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`
      );
    } else {
      setState(e.currentTarget.value);
    }
  };

  return (
    <div className="my-5 ">
      {/* Label for the time input */}
      <label htmlFor={id} className="ml-2">{label}</label>
      <br />
      {/* Time input field */}
      <input
        id={id}
        type="time"
        value={state}
        onChange={handleChange}
        className="w-full px-3 py-2 mt-1 bg-[#1F1F1F] rounded-lg outline-none"
      />
    </div>
  );
};

export default AddTaskTimeInput;
