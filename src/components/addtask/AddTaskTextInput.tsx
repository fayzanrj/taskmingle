import React from "react";

// Task Input interface
interface AddTaskTextInputProps {
  label: string;
  id: string;
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
    <label htmlFor={id}>{label}</label>
    <br />
    {/* Input field */}
    <input
      id={id}
      type="text"
      value={state}
      onChange={(e): void => setState(e.currentTarget.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border-2 border-gray-200 outline-none"
    />
  </div>
);

export default AddTaskTextInput