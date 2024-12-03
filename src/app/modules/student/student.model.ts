import { model, Schema } from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IName,
  IPermanentAddress,
  IPresentAddress,
  IStudent,
} from "./student.interface";

const NameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: { type: String, required: false },
  lastName: { type: String, required: [true, "Last name is required"] },
});

const PresentAddressSchema = new Schema<IPresentAddress>({
  city: { type: String, required: [true, "City is Required"] },
  postCode: { type: Number, required: [true, "Post Code is Required"] },
});
const PermanentAddressSchema = new Schema<IPermanentAddress>({
  city: { type: String, required: [true, "City is Required"] },
  postCode: { type: Number, required: [true, "Post Code is Required"] },
});
const GuardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: [true, "Father Name is Required"] },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No is Required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is Required"],
  },
  motherName: { type: String, required: [true, "Mother Name is Required"] },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact No is Required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is Required"],
  },
});
const LocalGuardianSchema = new Schema<ILocalGuardian>({
  guardianName: {
    type: String,
    required: [true, "Local Guardian Name is Required"],
  },
  guardianContactNo: {
    type: String,
    required: [true, "Local Guardian Contact No is Required"],
  },
  guardianOccupation: {
    type: String,
    required: [true, "Local Guardian is Required"],
  },
});

const StudentSchema = new Schema<IStudent>(
  {
    id: {
      type: String,
      required: [true, "Student id is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is Required"],
      unique: true,
      ref: "User",
    },
    name: NameSchema,
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male|female|other",
      },
      required: [true, "Gender is Required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is Required"],
    },
    email: { type: String, required: [true, "Email is Required"] },
    contactNo: { type: String, required: [true, "Contact No is Required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency Contact No is Required"],
    },
    presentAddress: PresentAddressSchema,
    permanentAddress: PermanentAddressSchema,
    guardian: GuardianSchema,
    localGuardian: LocalGuardianSchema,
    profileImage: {
      type: String,
      required: [true, "Profile Image is Required"],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic Department is Required"],
      ref: "AcademicDepartment",
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, "Admission Semester is Required"],
      ref: "AcademicSemester",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Student = model<IStudent>("Student", StudentSchema);
