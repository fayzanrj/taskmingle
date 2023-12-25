import TasksTable from "@/components/tasks/TasksTable";
import { fetchTasksByStatus } from "@/libs/FetchTasksByStatus";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Completed Tasks - Task Mingle",
};

const CompletedTasks: NextPage = async () => {
  const data = await getServerSession(authOptions);

  // @ts-ignore
  const tasks = await fetchTasksByStatus("Completed", data?.user?.accessToken);

  return <TasksTable tasks={tasks} />;
};

export default CompletedTasks;
