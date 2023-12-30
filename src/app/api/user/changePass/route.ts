import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/ResponseErrors";
import { verifyUser } from "@/libs/VerifyUser";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const checkData = (data: {
  oldPassword: string;
  newPassword: string;
}): boolean => {
  return !!(data.oldPassword && data.newPassword);
};

export const PUT = async (req: NextRequest) => {
  try {
    // Verifying user by verifying access token
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

    // finding user
    const userDetails = await prisma.user.findUnique({
      where: { id: user.id },
    });
    // If no user found
    if (!userDetails) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    // Comparing password
    const isPasswordCorrect = await bcrypt.compareSync(
      data.oldPassword,
      userDetails.password
    );

    // If password does not matches
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Old Wrong Password" },
        { status: 401 }
      );
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const updatedHashedPass = await bcrypt.hash(data.newPassword, salt);

    // Updaing new password in the database
    await prisma.user.update({
      where: { id: userDetails.id },
      data: { password: updatedHashedPass },
    });

    // returning updated message as response
    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return ThrowServerError();
  }
};
