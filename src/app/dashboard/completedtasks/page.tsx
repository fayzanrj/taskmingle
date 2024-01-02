import FetchError from "@/components/FetchError";
import NoItemFound from "@/components/NoItemFound";
import { TaskProps } from "@/props/TaskProps";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Completed Tasks",
};

const CompletedTasks: NextPage = async () => {
  const data = await getServerSession(authOptions);

  const headers = {
    "Content-Type": "application/json",
    //@ts-ignore
    accessToken: data?.user?.accessToken,
  };

  // @ts-ignore
  const response = await fetch(
    `${process.env.HOST}/api/tasks/getTasksByStatus/Completed`,
    { cache: "no-cache", headers: headers }
  );
  const res = await response.json();
  const tasks = res.tasks;

  // If there is an error fetching tasks
  if (tasks === undefined || tasks === null) {
    return <FetchError />;
  }

  // If there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="mt-20">
        <NoItemFound variant="Tasks" />
      </div>
    );
  }
  return (
    <table className="min-w-full  border border-[#323232] text-center">
      {/* Headers for table */}
      <thead>
        <tr>
          {/* Date */}
          <th className="w-1/4 py-2 px-4 border-b border-[#323232] text-xl font-bold">
            Date
          </th>
          {/* Tilte */}
          <th className="w-2/4 py-2 px-4 border-b border-[#323232] text-xl font-bold">
            Task Title
          </th>
          {/* Status */}
          <th className="w-1/4 py-2 px-4 border-b border-[#323232] text-xl font-bold">
            Status
          </th>
        </tr>
      </thead>

      {/* Table data  */}
      <tbody>
        {tasks.map((task: TaskProps, index: number) => (
          <tr key={index}>
            {/* Task date */}
            <td className="w-1/4 py-2 px-4 border-b border-[#323232] font-semibold">
              {task.date}
            </td>
            {/* Task Title */}
            <td className="w-2/4 py-2 px-4 border-b border-[#323232] font-semibold">
              {task.taskTitle}
            </td>
            {/* Task Status */}
            <td className="w-1/4 py-2 px-4 border-b border-[#323232] font-semibold">
              {task.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default CompletedTasks;
