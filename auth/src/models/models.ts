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

const userSchema = new Schema<UserType>(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  next();
});

userSchema.statics.build = async (attr: UserType) => new User<UserType>(attr);

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
