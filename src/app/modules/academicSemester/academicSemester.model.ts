import { model, Schema } from "mongoose";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterName,
} from "./academicSemester.constant";

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: AcademicSemesterName,
        message: "Semester Name must be valid",
      },
      required: [true, "Academic Semester name is required"],
    },
    year: {
      type: String,
      required: [true, "Academic Semester year is required"],
    },
    code: {
      type: String,
      enum: {
        values: AcademicSemesterCode,
        message: "Academic Semester Code is required",
      },
      required: [true, "Academic Semester Code is required"],
    },
    startMonth: {
      type: String,
      enum: {
        values: AcademicSemesterMonth,
        message: "Start month must be a month",
      },
      required: [true, "Start month is required"],
    },
    endMonth: {
      type: String,
      enum: {
        values: AcademicSemesterMonth,
        message: "End month must be a month",
      },
      required: [true, "End month is required"],
    },
  },
  { timestamps: true },
);

AcademicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error("Semester already Exists");
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema,
);
