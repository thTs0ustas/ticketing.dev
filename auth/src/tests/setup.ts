import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../app";
declare global {
  var signin: () => Promise<string[]>;
}
let mongo: any;

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  process.env.JWT_KEY = "secret";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => await collection.deleteMany({}));
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
