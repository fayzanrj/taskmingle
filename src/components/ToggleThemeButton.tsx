"use client";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ToggleThemeButton = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);

  return (
    <li className="p-3 my-1 rounded-xl text-sm  dark:text-[#8D8D8D] text-black ">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="w-full h-full text-left relative overflow-hidden"
      >
        {/* Icon */}
        <span>
          {isDarkMode ? (
            <IoSunny className="inline-block" size="1.2rem" />
          ) : (
            <FaMoon className="inline-block" size="1rem" />
          )}
        </span>

        {/* Text */}
        <p className="font-bold w-full absolute left-12 top-1/2 transform -translate-y-1/2">
          {isDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
        </p>
      </button>
    </li>
  );
};

export default ToggleThemeButton;
