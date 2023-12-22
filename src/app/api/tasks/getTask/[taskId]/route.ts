import { verifyJwt } from "@/libs/Jwt";
import { ThrowIncompleteError, ThrowNotFoundError, ThrowServerError, ThrowUnAuthorizedError } from "@/libs/ResponseErrors";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
import { verifyUser } from "@/libs/VerifyUser";

export const GET = async (
  req: NextRequest,
  { params }: { params: { taskId: string } }
) => {
  try {
   // Verify user by verifying access token
   const user = verifyUser(req);

   // If access token is not verified
   if (!user) {
     return ThrowUnAuthorizedError();
   }


    // finding task
    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
    });

    // if task not found
    if (!task) {
      return ThrowNotFoundError("No task found")
    }

    // returning task
    return NextResponse.json({ task }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
