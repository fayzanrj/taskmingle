import { verifyJwt } from "@/libs/Jwt";
import { ThrowIncompleteError, ThrowServerError, ThrowUnAuthorizedError } from "@/libs/ResponseErrors";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
import { verifyUser } from "@/libs/VerifyUser";

// to do make unified function
const checkData = (data: TaskProps): boolean => {
  const { date, reminderAt, startTime, status, tags, taskDesc, taskTitle } =
    data;
  return !!(
    date ||
    reminderAt ||
    startTime ||
    status ||
    tags ||
    taskDesc ||
    taskTitle
  );
};

export const PUT = async (req: NextRequest) => {
  try {
    // Verifing user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }


    // Receiving and checking if all the data is present
    const data = await req.json();
    const isValid = checkData(data);

    if (!isValid) {
      return ThrowIncompleteError();
    }

    // Updating task in the database
    const task = await prisma.task.update({
      where: { id: data.id },
      data: {
        taskTitle: data.taskTitle,
        taskDesc: data.taskDesc,
        status: data.status,
        startTime: data.startTime,
        reminderAt: data.reminderAt,
        date: data.date,
        tags: data.tags,
      },
    });

    // If task is not updated
    if (!task) {
      return ThrowServerError();
    }

    // Sending response back
    return NextResponse.json(
      { message: "Task has been updated", task },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
