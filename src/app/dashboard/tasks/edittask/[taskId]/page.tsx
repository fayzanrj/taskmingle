import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TaskForm from "@/components/addtask/TaskForm";
import { TasksData } from "@/constants/TasksData";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

interface Params {
  taskId: number;
}

export const metadata: Metadata = {
  title: "Edit task - Task Mingle",
};

const EditTask: React.FC<{ params: Params }> = async ({ params }) => {
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
  return <TaskForm {...task} variant="EDIT"/>;
};

export default EditTask;
