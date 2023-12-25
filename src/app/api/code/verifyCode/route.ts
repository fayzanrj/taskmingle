import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/ResponseErrors";
import { SendCodeEmail } from "@/libs/SendCodeEmail";
import { verifyUser } from "@/libs/VerifyUser";
import { NextRequest, NextResponse } from "next/server";
import { generateCode } from "@/libs/GenerateCode";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    // if data is incomplete
    if (!data.userId || !data.code) {
      return ThrowIncompleteError();
    }

    // checking if code exists in database
    const codeExists = await prisma.code.findUnique({
      where: { userId: data.userId },
    });

    // if code does not exists OR database code is not same as the provided code
    if (!codeExists || codeExists.code !== data.code) {
      return NextResponse.json({ message: "Invalid code" }, { status: 401 });
    }

    // updating isVerified in user's database
    const user = await prisma.user.update({
      where: { id: data.userId },
      data: { isVerified: true },
    });
    
    // deleting code
    const deleteCode = await prisma.code.delete({
      where: { id: codeExists.id },
    });

    if (!deleteCode) {
      return ThrowServerError();
    }

    // Response
    return NextResponse.json(
      { message: "Your account has been verified" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return ThrowServerError();
  }
};