import DashboardTasksList from "@/components/dashboard/DashboardTasksList";
import DashboardWatchList from "@/components/dashboard/DashboardWatchList";
import TaskStats from "@/components/dashboard/TaskStats";
import TasksCounter from "@/components/dashboard/TaskStatItem";
import { WatchLaterProps } from "@/props/WatchLaterProps";
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

  const response = await fetch(
    `${process.env.HOST}/api/watchlater/getwatchlaters`,
    { cache: "no-store", headers: headers }
  );

  const res = await response.json();
  const watchLaters: WatchLaterProps[] = res.watchlaters;

  return (
    <div className="w-full py-10 px-5">
    {/* @ts-ignore */}
      <TaskStats accessToken={data?.user?.accessToken} />

      <section className="w-full overflow-hidden mt-16 mb-10 ">
        {/*   TASKS */}
        {/* @ts-ignore */}
        <DashboardTasksList accessToken={data?.user?.accessToken} />

        {/* WATCH LATERS */}
        <DashboardWatchList watchLater={watchLaters} />

        {/* Notes */}

        {/* <div className="w-80 h-48 bg-[#1f1f1f1]"></div> */}
      </section>
    </div>
  );
};

export default Dashboard;
