import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
} from "@/libs/ResponseErrors";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // getting data from req
    const data = await req.json();

    // if any data is missing
    if (!data.email || !data.password || !data.name) {
      return ThrowIncompleteError();
    }

    // checking if email is taken
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 400 }
      );
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(data.password, salt);

    data.password = hashedPass;

    // creating a new user in the database
    const newUser = await prisma.user.create({ data });

    if (!newUser) {
      return ThrowServerError();
    }

    return NextResponse.json(
      { message: "Signed up succesfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ThrowServerError();
  }
};
