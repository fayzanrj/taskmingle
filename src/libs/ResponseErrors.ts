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

export const ThrowUnAuthorizedError = (): Response => {
  return NextResponse.json({ message: "Not authorized" }, { status: 401 });
};

export const ThrowNotFoundError = (message: string) => {
  return NextResponse.json({ message }, { status: 401 });
};
