import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "../student/student.validation";
import { CreateFacultyValidationSchema } from "../faculty/faculty.validation";
import { CreateAdminValidationSchema } from "../admin/admin.validation";

const UserRoutes = Router();

UserRoutes.post(
  "/create-student",
  validateRequest(StudentValidations.CreateStudentValidationSchema),
  UserController.createStudent,
);
UserRoutes.post(
  "/create-faculty",
  validateRequest(CreateFacultyValidationSchema),
  UserController.createFaculty,
);

UserRoutes.post(
  "/create-admin",
  validateRequest(CreateAdminValidationSchema),
  UserController.createAdmin,
);

export default UserRoutes;
