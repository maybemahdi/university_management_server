import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "../student/student.validation";

const UserRoutes = Router();

UserRoutes.post(
  "/create-student",
  validateRequest(StudentValidations.CreateStudentValidationSchema),
  UserController.createStudent,
);

export default UserRoutes;
