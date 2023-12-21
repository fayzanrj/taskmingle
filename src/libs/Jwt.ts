import jwt, { JwtPayload } from "jsonwebtoken";

export function signJwtAccessToken(payload: JwtPayload) {
  const secret_key = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret_key!);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
