import GoBack from "@/components/GoBack";
import RenderTags from "@/components/tasks/RenderTags";
import TaskActionBtns from "@/components/tasks/TaskActionBtns";
import TaskStatus from "@/components/tasks/TaskStatus";
import { TaskProps } from "@/props/TaskProps";
import { authOptions } from "@/utils/AuthOptions";
import { getServerSession } from "next-auth";
import { Roboto } from "next/font/google";
import React from "react";
import prisma from "@/app/db";
import { Metadata } from "next";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Task Details",
};
interface Params {
  taskId: string;
}

// function to update current status if it is overdue and has a status of pending
const updateCurrentStatus = async (
  date: string,
  taskStatus: string,
  taskId: string | undefined
) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (currentDate > new Date(date) && taskStatus === "Pending") {
    const updatedStatus = "Overdue";
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        status: updatedStatus,
      },
    });
  }
};

const TaskDetails: React.FC<{ params: Params }> = async ({ params }) => {
  const data = await getServerSession(authOptions);

  // HEADERS FOR API REQUEST
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: data?.user?.accessToken,
  };

  const response = await fetch(
    `${process.env.HOST}/api/tasks/getTask/${params.taskId}`,
    { cache: "no-cache", headers: headers }
  );
  const res = await response.json();
  const task: TaskProps = res.task;

  // updating current status of the task if it is overdue
  await updateCurrentStatus(task?.date, task?.status, task?.id);

  return (
    <div className="w-full h-fit relative py-10 select-text">
      {/* Button to go back */}
      <GoBack />

      <div className="w-11/12 sm:w-[30rem] md:w-[32rem] p-2 mx-auto top-1/2 left-1/2 transform duration-500">
        {/* TAGS */}
        <div className="text-right mb-4">
          <RenderTags tags={task?.tags || []} />
        </div>

        <h3 className="font-bold text-4xl">{task?.taskTitle}</h3>

        <div className="min-h-[20vh]">
          <p className="my-10 font-semibold">{task?.taskDesc}</p>
        </div>

        <div>
          <p className="w-full font-bold">
            Attached link :{" "}
            <span className="w-full">
              <a href={task?.link} className="w-full font-normal underline underline-offset-2">{task?.link}</a>
            </span>
          </p>
        </div>

        <FormattedDateTime
          info={`${task?.date} ${task?.startTime}`}
          variant="time"
          label="Start time"
        />

        <FormattedDateTime
          info={`${task?.date} ${task?.reminderAt}`}
          variant="time"
          label="Reminder Time"
        />

        <FormattedDateTime
          info={task?.date || ""}
          variant="date"
          label="Date"
        />

        <TaskStatus
          taskId={params.taskId}
          date={task?.date}
          //@ts-ignore
          accessToken={data?.user?.accessToken}
        />

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
      <p className="font-bold">
        {label} :{" "}
        <span className={`${roboto.className} ml-2 `}>{formattedInfo}</span>
      </p>
    </div>
  );
};
