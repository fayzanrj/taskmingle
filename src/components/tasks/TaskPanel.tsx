"use client";
import DatePicker from "@/components/DatePicker";
import { AppContext } from "@/context/AppContext";
import {getInitialDate} from "@/libs/GetInitialDate";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import TasksList from "./TasksList";
import { TaskProps } from "@/props/TaskProps";

interface TaskPanelProps {
  currentDateTasks : TaskProps[]
}

const TaskPanel: React.FC<TaskPanelProps> = ({ currentDateTasks }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskProps[]>(currentDateTasks);

  // useEffect(() => {
  //   setIsLoading(true);

  //   setTimeout(() => setIsLoading(false), 1000);
  // }, []);

  const intialDate = getInitialDate();
  return (
    <div className="w-full relative">
      <DatePicker initialDate={intialDate} numDatesToShow={15} setTasks={setTasks} setIsLoading={setIsLoading} />
      <TasksList tasks={tasks} isLoading={isLoading} />
    </div>
  );
};

export default TaskPanel;
