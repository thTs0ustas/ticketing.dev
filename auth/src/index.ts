import mongoose from "mongoose";
import { app } from "./app";
import { ConnectionError } from "./errors/connection-validator-error";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined.");
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
