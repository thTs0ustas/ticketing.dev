import express, { type Router } from "express";

const router: Router = express.Router();

router.get("/api/users/signin", (req, res) => {
  res.send("Sign in!");
});

export { router as signInRouter };
