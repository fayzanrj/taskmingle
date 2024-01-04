import React from "react";

// Task Input interface
interface AddTaskTextInputProps {
  label: string;
  id: "taskTitle" | "taskTags";
  placeholder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const AddTaskTextInput: React.FC<AddTaskTextInputProps> = ({
  label,
  id,
  placeholder,
  state,
  setState,
}) => (
  <div className="my-5">
    {/* Label for the input */}
    <label htmlFor={id} className="ml-2">
      {label} <span className="text-sm">({state.length}/20)</span>
    </label>
    <br />
    {/* Input field */}
    <input
      id={id}
      type="text"
      value={state}
      maxLength={20}
      onChange={(e): void => setState(e.currentTarget.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2  mt-1 dark:bg-[#1F1F1F] dark:border-0 border-2 border-gray-200 rounded-lg outline-none"
    />
  </div>
);

export default AddTaskTextInput;
