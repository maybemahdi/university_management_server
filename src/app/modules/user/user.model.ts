import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: false },
    password: { type: String, required: false },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: { values: ["student", "faculty", "admin"] },
      required: [false, "Role is required"],
    },
    status: {
      type: String,
      enum: { values: ["active", "blocked"] },
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
