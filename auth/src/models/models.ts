import { Document, Model, model, Schema } from "mongoose";
import { Password } from "../services/password";

interface UserType {
  password: string;
  email: string;
}
interface UserModel extends Model<UserDoc> {
  build(attrs: UserType): UserDoc;
}

interface UserDoc extends Document {
  password: string;
  email: string;
}

const userSchema = new Schema<UserType>({
  password: { type: String, required: true },
  email: { type: String, required: true },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = async (attr: UserType) => new User<UserType>(attr);

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
