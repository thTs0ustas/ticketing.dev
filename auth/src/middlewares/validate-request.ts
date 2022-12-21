import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../errors/custom-error";
import { RequestError } from "../errors/request-validator-error";

export const validateRequests = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestError(errors.array());
  }
  next();
};
