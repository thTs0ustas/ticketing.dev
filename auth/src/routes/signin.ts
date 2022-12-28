import express, { Request, Response, type Router } from "express";
import { body, validationResult } from "express-validator";
import { RequestError } from "../errors/request-validator-error";
import { User } from "../models/models";
import jwt from "jsonwebtoken";
import { validateRequests } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { compare } from "../services/password";

const router: Router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Provide a valid email."),
    body("password").trim().notEmpty().withMessage("Provide a password."),
  ],
  validateRequests,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials.");
    }

    const verifyPassword = await compare(existingUser.password, password);
    if (!verifyPassword) {
      throw new BadRequestError("Invalid credentials.");
    }

    // Generate Jwt
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Store jwt to session
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
