import { Router } from "express";
import { StudentController } from "./student.controller";

const StudentRoutes = Router();

StudentRoutes.get("/", StudentController.getAllStudents);
StudentRoutes.get("/:studentId", StudentController.getSingleStudent);
StudentRoutes.patch("/:studentId", StudentController.updateStudent);
StudentRoutes.delete("/:studentId", StudentController.deleteStudent);

export default StudentRoutes;
