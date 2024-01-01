import DashboardTasksList from "@/components/dashboard/DashboardTasksList";
import DashboardWatchList from "@/components/dashboard/DashboardWatchList";
import TasksCounter from "@/components/dashboard/TasksCounter";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import { authOptions } from "@/utils/AuthOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import prisma from "../db";

// TO DO : REFACTOR

const Dashboard: NextPage = async () => {
  const data = await getServerSession(authOptions);

  const headers = {
    "Content-Type": "application/json",
    //@ts-ignore
    accessToken: data?.user?.accessToken,
  };

  // const encodedDate = encodeURIComponent(new Date().toDateString());
  // const response = await fetch(
  //   `${process.env.HOST}/api/tasks/getAllTasks/${encodedDate}`,
  //   { headers, cache: "no-cache"}
  // );

  // const res = await response.json();
  // const tasks = res.tasks;
  const date = new Date().toDateString();
  const tasks = await prisma.task.findMany({
    where: {
      //@ts-ignore
      createdById: data?.user?.id,
      date: date,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  const response2 = await fetch(
    `${process.env.HOST}/api/watchlater/getwatchlaters`,
    { cache: "no-cache", headers: headers }
  );

  const res2 = await response2.json();
  const watchLaters: WatchLaterProps[] = res2.watchlaters;

  return (
    <div className="w-full py-10 px-5">
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

      <section className="w-full overflow-hidden mt-16 mb-10 ">
        {/*   TASKS */}
        {/* @ts-ignore */}
        <DashboardTasksList tasks={tasks || undefined} />

        {/* WATCH LATERS */}
        <DashboardWatchList watchLater={watchLaters} />

        {/* Notes */}
        {/* <div className="w-80 h-48 bg-[#1f1f1f1]"></div> */}
      </section>
    </div>
  );
};

export default Dashboard;
