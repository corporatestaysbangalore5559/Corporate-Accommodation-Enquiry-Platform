import jwt from "jsonwebtoken";
import type { AuthTokenPayload } from "../types";

const SECRET = process.env.JWT_SECRET as string;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export function signToken(payload: AuthTokenPayload): string {
  if (!SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN } as jwt.SignOptions);
}

export function verifyToken(token: string): AuthTokenPayload {
  if (!SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.verify(token, SECRET) as AuthTokenPayload;
}
