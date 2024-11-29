import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

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

export const User = model<IUser>("User", UserSchema);
