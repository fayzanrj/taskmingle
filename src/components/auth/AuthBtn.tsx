import React from "react";
import ActivityLoader from "../ActivityLoader";

interface AuthBtnProps {
  disableBtn: boolean;
  isLoading: boolean;
  btnText: "SIGN UP" | "LOG IN";
}

const AuthBtn: React.FC<AuthBtnProps> = ({
  disableBtn,
  isLoading,
  btnText,
}) => {
  return (
    <button
      type="submit"
      disabled={disableBtn || isLoading}
      aria-busy={isLoading}
      aria-disabled={disableBtn || isLoading}
      className="w-full h-10 font-semibold text-lg my-2 bg-gradient-to-br from-[#19fa9a] to-[#22C1C3] text-white rounded-lg outline-none disabled:bg-gradient-to-br disabled:from-[#19fa984c] disabled:to-[#22c0c34c]"
    >
      {!isLoading ? <span>{btnText}</span> : <ActivityLoader />}
    </button>
  );
};

export default AuthBtn;
