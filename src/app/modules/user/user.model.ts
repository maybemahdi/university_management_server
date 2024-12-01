import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: [true, "Id is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: [true, "Role is required"],
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<IUser>("User", UserSchema);
