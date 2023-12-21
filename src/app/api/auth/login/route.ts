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
    const data = await req.json();

    // if any data is missing
    if (!data.email || !data.password) {
      return new Response(JSON.stringify(null));
    }

    // finding user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return new Response(JSON.stringify(null));
    }

    const isPasswordCorrect = await bcrypt.compareSync(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return new Response(JSON.stringify(null));
    }

    const newUser: UserProps = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };

    const accessToken = signJwtAccessToken(newUser);
    const result = {
      ...newUser,
      accessToken,
    };
    return NextResponse.json(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    return ThrowServerError();
  }
};
