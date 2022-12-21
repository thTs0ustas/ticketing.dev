import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserInfo;
    }
  }
}
interface UserInfo {
  email: string;
  id: string;
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionJwt = req.session?.jwt;
  if (!sessionJwt) return next();

  try {
    const verifyJwt = jwt.verify(sessionJwt, process.env.JWT_KEY!) as UserInfo;
    req.currentUser = verifyJwt;
    next();
  } catch (err) {
    next();
  }
};
