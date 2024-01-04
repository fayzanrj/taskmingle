"use client";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ToggleThemeButton = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);

  return (
    <li className="h-[2.9rem] overflow-hidden px-3 my-1 rounded-xl text-sm  dark:text-[#8D8D8D] text-black ">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="w-full h-full text-left relative"
      >
        {/* Icon */}
        <span className="pl-0.5">
          {isDarkMode ? (
            <IoSunny className="inline-block" size="1.1rem" />
          ) : (
            <FaMoon className="inline-block" size=".9rem" />
          )}
        </span>

        {/* Text */}
        <p className="font-bold w-full absolute left-9 top-1/2 transform -translate-y-1/2">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </p>
      </button>
    </li>
  );
};

export default ToggleThemeButton;
