import express, { Request, Response, type Router } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/models";
import jwt from "jsonwebtoken";
import { validateRequests } from "../middlewares/validate-request";

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
  validateRequests,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      throw new BadRequestError("Email already exists");
    }

    const newUser = await User.build({ email, password });
    await newUser.save();

    // Generate Jwt

    const userJwt = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_KEY!
    );

    // Store jwt to session

    req.session = { jwt: userJwt };

    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
