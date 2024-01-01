import prisma from "@/app/db";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/ResponseErrors";
import { verifyUser } from "@/libs/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    const date = new Date().toDateString();
    // Finding all the user's tasks for the given date and ordering them in ascending order
    const tasks = await prisma.task.findMany({
      where: {
        createdById: user.id,
        date: date,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // Returing tasks as response
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
