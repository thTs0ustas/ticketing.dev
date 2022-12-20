import express, { Request, Response, type Router } from "express";
import { body, validationResult } from "express-validator";
import { ConnectionError } from "../errors/connection-validator-error";
import { RequestError } from "../errors/request-validator-error";
const router: Router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Provide a valid email."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Wrong password."),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestError(errors.array());
    }

    throw new ConnectionError(errors.array());

    const { email, password } = req.body;

    res.send({ email, password });
  }
);

export { router as signUpRouter };
