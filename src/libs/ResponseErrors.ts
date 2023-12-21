import { NextApiHandler, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const ThrowServerError = () => {
  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
};

export const ThrowIncompleteError = (): Response => {
  return NextResponse.json({ msg: "Incomplete data" }, { status: 400 });
};
