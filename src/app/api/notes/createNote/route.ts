import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/ResponseErrors";
import { verifyUser } from "@/libs/VerifyUser";
import { pusherServer } from "@/pusher/pusher";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // Create note in the database
    const note = await prisma.note.create({
      data: { content: "", createdById: user.id },
    });

    // If note is not created
    if (!note) {
      return ThrowServerError();
    }

    // pusherServer.trigger(user.id, "addNote", note);
    
    // Send response back
    return NextResponse.json(
      { message: "Note has been added", note },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
