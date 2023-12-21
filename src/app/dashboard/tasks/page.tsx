
import { authOptions } from "@/utils/AuthOptions";
import AddTaskBtnRound from "@/components/tasks/AddTaskBtnRound";
import TaskPanel from "@/components/tasks/TaskPanel";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Tasks - Task Mingle",
  description: "",
};

const Tasks = async () => {
  const data = await getServerSession(authOptions);

  const encodedDate = encodeURIComponent(new Date().toDateString());

  // HEADERS FOR API REQUEST
  const headers = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: data?.user?.accessToken,
  };

  const response = await fetch(
    `${process.env.HOST}/api/tasks/getAllTasks/${encodedDate}`,
    { cache: "no-cache",  headers: headers }
  );
  const res = await response.json();
  const tasks = res.tasks;

  return (
    <>
      <TaskPanel currentDateTasks={tasks} />
      <AddTaskBtnRound />
    </>
  );
};

export default Tasks;
