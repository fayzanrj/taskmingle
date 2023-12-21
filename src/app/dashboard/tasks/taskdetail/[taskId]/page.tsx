
import { authOptions } from "@/utils/AuthOptions";
import GoBack from "@/components/GoBack";
import RenderTags from "@/components/tasks/RenderTags";
import TaskActionBtns from "@/components/tasks/TaskActionBtns";
import { getServerSession } from "next-auth";
import { Roboto } from "next/font/google";
import React from "react";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

interface Params {
  taskId: string;
}

const TaskDetails: React.FC<{ params: Params }> = async ({ params }) => {
  const data = await getServerSession(authOptions);

  // HEADERS FOR API REQUEST
  const headers = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: data?.user?.accessToken,
  };

  const response = await fetch(
    `${process.env.HOST}/api/tasks/getTask/${params.taskId}`,
    { cache: "no-cache", headers: headers }
  );
  const res = await response.json();
  const task = res.task;

  return (
    <div className="w-full h-full relative py-10">
      {/* Button to go back */}
      <GoBack />

      <div className="w-11/12 sm:w-[30rem] md:w-[32rem] p-2 mx-auto top-1/2 left-1/2 transform duration-500">
        {/* TAGS */}
        <div className="text-right mb-4">
          <RenderTags tags={task.tags} />
        </div>

        {/* TASK TITLE */}
        <h3 className="font-extrabold text-4xl">{task.taskTitle}</h3>

        {/* TASK DESCRIPTION */}
        <div className="min-h-[20vh]">
          <p className="my-10 font-semibold">{task.taskDesc}</p>
        </div>

        {/* START TIME */}
        <FormattedDateTime
          info={`${task.date} ${task.startTime}`}
          variant="time"
          label="Start time"
        />

        {/* REMINDER TIME */}
        <FormattedDateTime
          info={`${task.date} ${task.reminderAt}`}
          variant="time"
          label="Reminder Time"
        />

        {/* DATE */}
        <FormattedDateTime info={task.date} variant="date" label="Date" />

        <TaskActionBtns
          href={`/dashboard/tasks/edittask/${params.taskId}`}
          taskId={params.taskId}
        />
      </div>
    </div>
  );
};

export default TaskDetails;

// formatted date ime component
interface FormattedDateTimeProps {
  label: "Start time" | "Reminder Time" | "Date";
  info: string;
  variant: "time" | "date";
}

const FormattedDateTime: React.FC<FormattedDateTimeProps> = ({
  label,
  info,
  variant,
}) => {
  const formattedInfo =
    variant === "time"
      ? new Date(info).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date(info).toLocaleDateString();

  return (
    <div className="my-2">
      <p className="font-semibold">
        {label} :{" "}
        <span className={`${roboto.className} ml-2 `}>{formattedInfo}</span>
      </p>
    </div>
  );
};
