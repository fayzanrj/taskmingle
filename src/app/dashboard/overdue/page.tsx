import TasksTable from "@/components/tasks/TasksTable";
import { fetchTasksByStatus } from "@/libs/FetchTasksByStatus";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Overdue Tasks",
};

const OverdueTasks = async () => {
  const data = await getServerSession(authOptions);
  // @ts-ignore
  const tasks = await fetchTasksByStatus("Overdue", data?.user?.accessToken);

  return <TasksTable tasks={tasks} />;
};

export default OverdueTasks;
