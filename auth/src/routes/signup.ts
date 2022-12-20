import express, { Request, Response, type Router } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestError } from "../errors/request-validator-error";
import { User } from "../models/models";
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestError(errors.array());
    }

    const { email, password } = req.body;

    const exists = await User.findOne({ email });

    if (!exists) {
      throw new BadRequestError("Email already exists");
    }

    const newUser = User.build({ email, password });
    await newUser.save();

    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
