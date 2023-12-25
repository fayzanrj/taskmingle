"use client";
import React, { createContext } from "react";

export const AppContext = createContext<any | undefined>(undefined);



export function AppState({ children }: { children: React.ReactNode }) {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
}
