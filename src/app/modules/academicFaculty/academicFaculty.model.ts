import { Schema, model } from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";

const AcademicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, "Academic Faculty is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<IAcademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema,
);
