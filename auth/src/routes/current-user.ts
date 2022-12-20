import express, { type Router } from "express";

const router: Router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!!");
});

export { router as currentUserRouter };
