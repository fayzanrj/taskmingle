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

  return (
    <>
      {/* @ts-ignore */}
      <TaskPanel accessToken={data?.user?.accessToken} />
      <AddTaskBtnRound />
    </>
  );
};

export default Tasks;
