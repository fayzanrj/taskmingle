"use client";
import { TasksData } from "@/constants/TasksData";
import { TaskProps } from "@/props/TaskProps";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext<any | undefined>(undefined);



export function AppState({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<TaskProps[]>(TasksData);
  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
}
