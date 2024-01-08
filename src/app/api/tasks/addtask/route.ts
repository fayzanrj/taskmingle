import { verifyJwt } from "@/utilities/Jwt";
import { ThrowIncompleteError, ThrowServerError, ThrowUnAuthorizedError } from "@/libs/backend/ResponseErrors";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
import { verifyUser } from "@/libs/backend/VerifyUser";

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
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
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
