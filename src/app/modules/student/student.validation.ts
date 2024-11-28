import { z } from "zod";

const NameSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

const PresentAddressSchema = z.object({
  city: z.string().min(1, "City is required"),
  postCode: z.number().int().min(1, "Post Code is required"),
});

const PermanentAddressSchema = z.object({
  city: z.string().min(1, "City is required"),
  postCode: z.number().int().min(1, "Post Code is required"),
});

const GuardianSchema = z.object({
  fatherName: z.string().min(1, "Father Name is required"),
  fatherContactNo: z.string().min(1, "Father Contact No is required"),
  fatherOccupation: z.string().min(1, "Father Occupation is required"),
  motherName: z.string().min(1, "Mother Name is required"),
  motherContactNo: z.string().min(1, "Mother Contact No is required"),
  motherOccupation: z.string().min(1, "Mother Occupation is required"),
});

const LocalGuardianSchema = z.object({
  guardianName: z.string().min(1, "Local Guardian Name is required"),
  guardianContactNo: z.string().min(1, "Local Guardian Contact No is required"),
  guardianOccupation: z
    .string()
    .min(1, "Local Guardian Occupation is required"),
});

export const StudentSchema = z.object({
  id: z.string().optional(),
  user: z.string().min(1, "User ID is Required"),
  name: NameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  contactNo: z.string().min(1, "Contact No is required"),
  emergencyContactNo: z.string().min(1, "Emergency Contact No is required"),
  presentAddress: PresentAddressSchema,
  permanentAddress: PermanentAddressSchema,
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImage: z.string().min(1, "Profile Image is required"),
  admissionSemester: z.string().min(1, "Admission Semester is required"),
  isDeleted: z.boolean().optional().default(false),
});