import { verifyJwt } from "@/libs/Jwt";
import {
  ThrowIncompleteError,
  ThrowNotFoundError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/ResponseErrors";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
import { verifyUser } from "@/libs/VerifyUser";

export const GET = async (
  req: NextRequest,
  { params }: { params: { noteId: string } }
) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // finding note
    const note = await prisma.note.findUnique({
      where: {
        id: params.noteId,
      },
    });

    // if task not found
    if (!note) {
      return ThrowNotFoundError("No note found");
    }

    // returning task as response
    return NextResponse.json({ note }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
