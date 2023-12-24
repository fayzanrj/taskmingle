import prisma from "@/app/db";
import {
  ThrowServerError,
  ThrowUnAuthorizedError
} from "@/libs/ResponseErrors";
import { verifyUser } from "@/libs/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { date: string } }
) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    const tasks = await prisma.task.findMany({
      where: {
        createdById: user.id,
        date: params.date,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
