import { verifyJwt } from "@/libs/Jwt";
import { ThrowIncompleteError, ThrowServerError } from "@/libs/ResponseErrors";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

const checkData = (data: TaskProps): boolean => {
  const {
    date,
    reminderAt,
    startTime,
    status,
    tags,
    taskDesc,
    taskTitle,
  } = data;
  return !!(
    date || reminderAt || startTime || status || tags || taskDesc || taskTitle
  );
};

export const POST = async (req: NextRequest) => {
  try {
    // Verify user by verifying access token
    const accessToken = req.headers.get("accessToken");
    const user = verifyJwt(accessToken!);

    // If access token is not verified
    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    // Receive and check if all the data is present
    const data = await req.json();
    const isValid = checkData(data);

    if (!isValid) {
      return ThrowIncompleteError();
    }

    // Add creator ID to data
    data.createdById = user.id;

    // Create task in the database
    const task = await prisma.task.create({ data });

    // If task is not created
    if (!task) {
      return ThrowServerError();
    }

    // Send response back
    return NextResponse.json(
      { message: "Task has been added", task },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
