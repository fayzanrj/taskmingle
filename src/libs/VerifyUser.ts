import { NextRequest } from "next/server";
import { verifyJwt } from "./Jwt";

export const verifyUser = (req: NextRequest) => {
  const accessToken = req.headers.get("accessToken");
  const user = verifyJwt(accessToken!);

  return user;
};
