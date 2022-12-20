import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandling } from "./middlewares/error-handling";
import { NotFoundError } from "./errors/not-found-error";

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

app.listen(3000, () => {
  console.log("Listening to port 3000!!");
});
