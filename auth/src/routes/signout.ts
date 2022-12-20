import express, { type Router } from "express";

const router: Router = express.Router();

router.get("/api/users/signout", (req, res) => {
  res.send("Sign out!");
});

export { router as signOutRouter };
