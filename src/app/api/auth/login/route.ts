import prisma from "@/app/db";
import { ThrowIncompleteError, ThrowServerError } from "@/libs/ResponseErrors";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJwtAccessToken } from "@/libs/Jwt";

interface UserProps {
  id: string;
  name: string;
  email: string;
  isVerified: boolean | null;
}

export const POST = async (req: NextRequest) => {
  try {
    const data: { email: string; password: string } = await req.json();

    // if any data is missing
    if (!data.email || !data.password) {
      return ThrowIncompleteError();
    }

    // finding user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Login failed! Please check your credentials" },
        { status: 401 }
      );
    }

    // comparing password
    const isPasswordCorrect = await bcrypt.compareSync(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Login failed! Please check your credentials" },
        { status: 401 }
      );
    }

    const newUser: UserProps = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };

    // signing access token
    const accessToken = signJwtAccessToken(newUser);
    const result = {
      ...newUser,
      accessToken,
    };

    // response
    return NextResponse.json(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    return ThrowServerError();
  }
};
