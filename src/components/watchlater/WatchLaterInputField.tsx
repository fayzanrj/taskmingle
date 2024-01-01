import React from 'react';

interface WatchLaterInputFieldProps {
  label: "Enter Title" | "Enter URL";
  type: "text" | "url";
  placeHolder: string;
  id: "title" | "url";
  state: string;
  isLoading: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const WatchLaterInputField: React.FC<WatchLaterInputFieldProps> = ({
  state,
  onChange,
  isLoading,
  placeHolder,
  id,
  type,
  label,
  onBlur,
}) => {
    
  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    // Check if the type is "url" before running onBlur
    if (type === "url" && onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="w-full sm:w-96 mt-5">
      <label htmlFor={id} className="text-[1rem] ml-1 font-semibold">
        {label}
      </label>
      <br />
      <input
        type={type}
        id={id}
        placeholder={placeHolder}
        value={state}
        onChange={onChange}
        disabled={isLoading}
        onBlur={handleBlur} 
        className="w-full rounded-lg p-2 my-1 bg-[#1F1F1F] outline-none font-semibold"
      />
    </div>
  );
};

export default WatchLaterInputField;
