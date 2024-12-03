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

AcademicFacultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isValidDepartment = await AcademicFaculty.findOne(query);
  if (!isValidDepartment) {
    throw new Error("Faculty does not exist");
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema,
);
