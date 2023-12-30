import TasksCounter from "@/components/dashboard/TasksCounter";
import AddTaskBtnRound from "@/components/tasks/AddTaskBtnRound";
import TasksList from "@/components/tasks/TasksList";
import { authOptions } from "@/utils/AuthOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";

// TO DO : REFACTOR

const Dashboard: NextPage = async () => {
  const data = await getServerSession(authOptions);

  const headers = {
    "Content-Type": "application/json", 
    //@ts-ignore
    accessToken: data?.user?.accessToken,
  };

  const encodedDate = encodeURIComponent(new Date().toDateString());
  const response = await fetch(
    `${process.env.HOST}/api/tasks/getAllTasks/${encodedDate}`,
    { headers, cache: "no-cache" || "no-store" }
  );

  const res = await response.json();
  const tasks = res.tasks;

  return (
    <div className="p-10">
      <AddTaskBtnRound />

      <section className="flex justify-center gap-3  md:gap-10 lg:gap:20 flex-wrap">
        <TasksCounter
          header="Today's Tasks"
          totalTasks={20}
          completedTasks={13}
        />
        <TasksCounter
          header="Monthly Tasks"
          totalTasks={31}
          completedTasks={23}
        />
        <TasksCounter
          header="Overdue Tasks"
          totalTasks={3}
          completedTasks={1}
        />
      </section>

      <section className="mt-10">
        <h3 className="text-3xl font-semibold text-white">Today&#39;s Board</h3>
        <TasksList tasks={tasks} isLoading={false} />
      </section>
    </div>
  );
};

export default Dashboard;
