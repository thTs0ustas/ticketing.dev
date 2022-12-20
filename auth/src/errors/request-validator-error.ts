import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters.");
    Object.setPrototypeOf(this, RequestError.prototype);
  }

  serializeErrors() {
    const err = this.errors.map(({ msg, param }: ValidationError) => ({
      message: msg,
      field: param,
    }));
    return err;
  }
}
