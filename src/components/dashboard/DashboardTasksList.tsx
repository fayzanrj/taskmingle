"use client";
import { TaskProps } from "@/props/TaskProps";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import TaskItem from "../tasks/TaskItem";
import NoItemFound from "../NoItemFound";
import { AppContext } from "@/context/AppContext";

interface DashboardTasksListProps {
  tasks: TaskProps[] | undefined;
}

const DashboardTasksList: React.FC<DashboardTasksListProps> = ({ tasks }) => {
//   const { setInitialTasks, initialTasks } = useContext(AppContext);
const [ initialTasks , setInitialTasks] = useState<TaskProps[] | undefined>(tasks)

  // If there are no tasks
  if (tasks?.length === 0) {
    return <NoItemFound variant="Tasks" />;
  }

  return (
    <div className="max-w-full sm:max-w-[50%] z-30">
      <div className="flex overflow-x-auto">
        {initialTasks?.map((task: TaskProps, index: number) => (
          <TaskItem key={index} {...task} />
        ))}
      </div>
    </div>
  );
};

export default DashboardTasksList;
