import { verifyJwt } from "@/libs/Jwt";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/ResponseErrors";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
import { verifyUser } from "@/libs/VerifyUser";
import { getInitialDate } from "@/libs/GetInitialDate";

export const GET = async (
  req: NextRequest,
  { params }: { params: { status: "Completed" | "Overdue" } }
) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // getting initial date 
    const initialDate = getInitialDate();

    // finding a user's task with provided status and from the initial date
    const tasks = await prisma.task.findMany({
      where: {
        createdById: user.id,
        status: params.status,
        createdAt: {
          gte: new Date(initialDate),
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // returing tasks
    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
