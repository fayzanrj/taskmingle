"use client";
import { TaskProps } from "@/props/TaskProps";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import TaskItem from "../tasks/TaskItem";
import NoItemFound from "../NoItemFound";
import { AppContext } from "@/context/AppContext";
import TasksList from "../tasks/TasksList";
import Link from "next/link";
import FetchError from "../FetchError";

interface DashboardTasksListProps {
  tasks: TaskProps[] | undefined;
}

const DashboardTasksList: React.FC<DashboardTasksListProps> = ({ tasks }) => {
  //   const { setInitialTasks, initialTasks } = useContext(AppContext);
  const [initialTasks, setInitialTasks] = useState<TaskProps[] | undefined>(
    tasks
  );

  if (initialTasks === undefined) {
    return <FetchError />;
  }

  // If there are no tasks
  if (initialTasks?.length === 0) {
    return <NoItemFound variant="Tasks" />;
  }

  return (
    <div className="w-full md:w-80 h-fit ">
      <h3 className="text-2xl font-semibold text-white">
        Your today&#39;s tasks
      </h3>
      <TasksList tasks={initialTasks} isLoading={false} />

      <div className="text-center">
        <Link href={"/dashboard/tasks"}>
          <p className="text-lg underline underline-offset-2">See all tasks</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardTasksList;
