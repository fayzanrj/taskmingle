import { DateTimeInputProps } from "@/props/DateTimeProps";
import React from "react";

const AddTaskTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  id,
  state,
  setState,
}) => {
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
        onChange={(e): void => setState(e.currentTarget.value)}
        className="w-full px-3 py-2 border-2 border-gray-200 outline-none"
      />
    </div>
  );
};

export default AddTaskTimeInput;
