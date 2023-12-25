import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

// Show pass interface
interface ShowPassProp {
  showPass: boolean;
  setShowPass: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowPassBtn: React.FC<ShowPassProp> = ({ showPass, setShowPass }) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 right-2 transform -translate-y-1/2 select-none outline-none"
      onClick={() => setShowPass(!showPass)}
      aria-label="show-pass-btn"
      aria-pressed={showPass}
    >
      {showPass ? <IoEyeOff size="1.2em" /> : <IoEye size="1.2em" />}
    </button>
  );
};

export default ShowPassBtn;
