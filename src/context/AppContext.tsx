"use client";
import { TaskProps } from "@/props/TaskProps";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext<any | undefined>(undefined);

export function AppState({ children }: { children: React.ReactNode }) {
  const [initialTasks, setInitialTasks] = useState<TaskProps[] | []>([]);


  return (
    <AppContext.Provider value={{ initialTasks, setInitialTasks }}>
      {children}
    </AppContext.Provider>
  );
}
