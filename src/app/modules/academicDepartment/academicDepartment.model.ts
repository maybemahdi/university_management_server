import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";

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
    },
  },
  { timestamps: true },
);

AcademicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error("Department already exists");
  }
  next();
});

AcademicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isValidDepartment = await AcademicDepartment.findOne(query);
  if (!isValidDepartment) {
    throw new Error("Department does not exist");
  }
  next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
  "AcademicDepartment",
  AcademicDepartmentSchema,
);
