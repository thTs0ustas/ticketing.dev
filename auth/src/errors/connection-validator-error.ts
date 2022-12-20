import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class ConnectionError extends CustomError {
  reason = "Connection error!";
  statusCode = 500;
  constructor(public errors: ValidationError[]) {
    super("Error connecting to database.");
    Object.setPrototypeOf(this, ConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
