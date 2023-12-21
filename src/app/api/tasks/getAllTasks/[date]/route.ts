import { verifyJwt } from "@/libs/Jwt";
import { ThrowIncompleteError, ThrowServerError } from "@/libs/ResponseErrors";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: { date: string } }
) => {
  try {
    // Verify user by verifying access token
    const accessToken = req.headers.get("accessToken");
    const user = verifyJwt(accessToken!);

    // If access token is not verified
    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
        where : {
            createdById : user.id,
            date : params.date
        }
    })

    return NextResponse.json({tasks});
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
