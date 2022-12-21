import { NextFunction, Request, Response } from "express";
import { NotAuthError } from "../errors/not-auth-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthError();
  next();
};
