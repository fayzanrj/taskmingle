import { verifyJwt } from "@/libs/Jwt";
import { ThrowIncompleteError, ThrowServerError } from "@/libs/ResponseErrors";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { taskId: string } }
) => {
  try {
    // Verify user by verifying access token
    const accessToken = req.headers.get("accessToken");
    const user = verifyJwt(accessToken!);

    // If access token is not verified
    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    // finding task
    const task = await prisma.task.delete({
      where: {
        id: params.taskId,
        createdById: user.id,
      },
    });

    // if task not found
    if (!task) {
      return NextResponse.json({ message: "No Task found" }, { status: 401 });
    }

    // returning task
    return NextResponse.json({ message : "Task has been deleted" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
