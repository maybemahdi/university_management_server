import { z } from "zod";

export const UserValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .max(20, { message: "Password cannot be more than 20 character" })
    .optional(),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(["student", "faculty", "admin"]),
  status: z.enum(["active", "blocked"]).optional().default("active"),
  isDeleted: z.boolean().optional().default(false),
});
