import TasksTable from "@/components/tasks/TasksTable";
import { fetchTasksByStatus } from "@/libs/FetchTasksByStatus";
import { TaskProps } from "@/props/TaskProps";
import { authOptions } from "@/utils/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

const OverdueTasks = async () => {
  const data = await getServerSession(authOptions);

  
  // @ts-ignore
  const tasks = await fetchTasksByStatus("Overdue", data?.user?.accessToken);


  return <TasksTable tasks={tasks} />;
};

export default OverdueTasks;
