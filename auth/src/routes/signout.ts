import express, { type Router } from "express";

const router: Router = express.Router();

router.get("/api/users/signout", (req, res) => {
  req.session = null;
  res.send({});
});

export { router as signOutRouter };
