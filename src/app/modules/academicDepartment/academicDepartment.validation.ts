import { z } from "zod";

const CreateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Department must be string",
      required_error: "Department name is required",
    }),
    academicFaculty: z.string({
      required_error: "Faculty name is required",
    }),
  }),
});

const UpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department must be string",
        required_error: "Department name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: "Faculty name is required",
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  CreateAcademicDepartmentValidationSchema,
  UpdateAcademicDepartmentValidationSchema,
};
