import TaskForm from "@/components/addtask/TaskForm";
import { TaskProps } from "@/props/TaskProps";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

interface Params {
  taskId: number;
}

export const metadata: Metadata = {
  title: "Edit task",
};

const EditTask: React.FC<{ params: Params }> = async ({ params }) => {
  // Fetching user session data for authentication
  const data = await getServerSession(authOptions);

  // HEADERS FOR API REQUEST
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: data?.user?.accessToken,
  };

  // Fetching task details for the specified taskId
  const response = await fetch(
    `${process.env.HOST}/api/tasks/getTask/${params.taskId}`,
    { cache: "no-cache", headers: headers }
  );
  const res = await response.json();
  const task: TaskProps = res.task;

  // Rendering the TaskForm component with the retrieved task details
  return <TaskForm {...task} variant="EDIT" />;
};

export default EditTask;
