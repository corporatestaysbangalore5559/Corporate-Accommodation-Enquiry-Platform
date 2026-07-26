import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import type { AuthTokenPayload } from "../types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: AuthTokenPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = header.slice("Bearer ".length);
  try {
    const payload = verifyToken(token);
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session. Please log in again." });
  }
}
