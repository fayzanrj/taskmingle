"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ThemeToggleNavbarBtn = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);

  return (
      <button className="w-8 h-8 relative " onClick={() => setIsDarkMode(!isDarkMode)} type="button">
        {isDarkMode ? (
          <IoSunny className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold" size="1.5rem" />
        ) : (
          <FaMoon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold" size="1rem" />
        )}
      </button>
  );
};

export default ThemeToggleNavbarBtn;
