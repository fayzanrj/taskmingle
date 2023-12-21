import React from "react";

// Define TextArea component
interface TextAreaProps {
  label: string;
  id: string;
  placeholder: string;
  rows: number;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const AddTaskTextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  placeholder,
  rows,
  state,
  setState,
}) => (
  <div className="my-5">
    {/* Label for the textarea */}
    <label htmlFor={id}>{label}</label>
    <br />
    {/* Textarea field */}
    <textarea
      id={id}
      rows={rows}
      value={state}
      onChange={(e): void => setState(e.currentTarget.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border-2 border-gray-200 outline-none resize-none SCROLL_BAR"
    />
  </div>
);

export default AddTaskTextArea;
