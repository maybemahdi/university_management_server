import { Router } from "express";
import { StudentController } from "./student.controller";

const StudentRoutes = Router();

StudentRoutes.get("/", StudentController.getAllStudents);
StudentRoutes.get("/:studentId", StudentController.getSingleStudent);

export default StudentRoutes;
