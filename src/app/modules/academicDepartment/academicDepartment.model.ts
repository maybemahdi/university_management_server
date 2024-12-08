import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const AcademicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic Faculty is required"],
      ref: "AcademicFaculty",
    },
  },
  { timestamps: true },
);

// AcademicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExist) {
//     throw new AppError(httpStatus.NOT_ACCEPTABLE,"Department already exists");
//   }
//   next();
// });

AcademicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isValidDepartment = await AcademicDepartment.findOne(query);
  if (!isValidDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "This Department does not exist!");
  }
  next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
  "AcademicDepartment",
  AcademicDepartmentSchema,
);
