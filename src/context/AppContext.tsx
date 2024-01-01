"use client";
import { TaskProps } from "@/props/TaskProps";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext<any | undefined>(undefined);

export function AppState({ children }: { children: React.ReactNode }) {
  
  // Variable state
  const [isOpen, setIsOpen] = useState<boolean>(true);


  return (
    <AppContext.Provider value={{isOpen, setIsOpen}}>
      {children}
    </AppContext.Provider>
  );
}
