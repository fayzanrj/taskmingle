"use client";
import React, { createContext, useEffect, useLayoutEffect, useState } from "react";

export const AppContext = createContext<any | undefined>(undefined);

export function AppState({ children }: { children: React.ReactNode }) {
  
  // Variable state
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    // const theme = localStorage.getItem("theme");
    // if (theme === "dark") {
    //   setIsDarkMode(true);
    // } else {
    //   setIsDarkMode(false);
    // }
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
    <AppContext.Provider value={{isOpen, setIsOpen, isDarkMode, setIsDarkMode}}>
      {children}
    </AppContext.Provider>
  );
}
