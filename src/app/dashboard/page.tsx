import DashboardTasksList from "@/components/dashboard/DashboardTasksList";
import DashboardWatchList from "@/components/dashboard/DashboardWatchList";
import TaskStats from "@/components/dashboard/TaskStats";
import TasksCounter from "@/components/dashboard/TaskStatItem";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import { authOptions } from "@/utils/AuthOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { NoteProps } from "@/props/NoteProps";
import { getHeaders } from "@/libs/GetHeaders";
import DashboardNotesList from "@/components/dashboard/DashboardNotesList";

// TO DO : REFACTOR

const Dashboard: NextPage = async () => {
  const headers = await getHeaders();

  // Watch Later sessoin
  const watchLaterFetch = await fetch(
    `${process.env.HOST}/api/watchlater/getwatchlaters`,
    { cache: "no-store", headers: headers }
  );

  const watchLaterFetchRes = await watchLaterFetch.json();
  const watchLaters: WatchLaterProps[] = watchLaterFetchRes.watchlaters;

  // Notes fetch
  const notesFetch = await fetch(`${process.env.HOST}/api/notes/getAllNotes`, {
    cache: "no-store",
    headers: headers,
  });

  const notesFetchRes = await notesFetch.json();
  const notes: NoteProps[] = notesFetchRes.notes;

  return (
    <div className="w-full py-10 px-5">
      <TaskStats accessToken={headers.accessToken} />

      <section className="w-full overflow-hidden mt-16 mb-10 ">
        {/*   TASKS */}
        <DashboardTasksList accessToken={headers.accessToken} />

        {/* WATCH LATERS */}
        <DashboardWatchList watchLater={watchLaters} />

        {/* Notes */}
        <DashboardNotesList notes={notes} />
      </section>
    </div>
  );
};

export default Dashboard;
