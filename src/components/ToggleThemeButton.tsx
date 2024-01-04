"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";

const ToggleThemeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setIsDarkMode(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <li className="relative p-3 my-1 rounded-xl dark:text-[#8D8D8D] text-black text-sm">
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        <span className="aboslute">
          {isDarkMode ? (
            <IoSunny className="inline-block font-semibold" size="1.3rem" />
          ) : (
            <FaMoon className="inline-block font-semibold" size="1rem" />
          )}
        </span>
        <p className="absolute inline-block ml-4 font-semibold">
          {isDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
        </p>
      </button>
    </li>
  );
};

export default ToggleThemeButton;
