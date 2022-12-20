import express from "express";
import "express-async-errors";

import mongoose from "mongoose";

import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandling } from "./middlewares/error-handling";
import { NotFoundError } from "./errors/not-found-error";
import { ConnectionError } from "./errors/connection-validator-error";

const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandling);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb!");
  } catch (error: any) {
    throw new ConnectionError(error);
  }
};
start();
app.listen(3000, () => {
  console.log("Listening to port 3000!!");
});
