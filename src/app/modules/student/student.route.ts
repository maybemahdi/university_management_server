import { Router } from "express";
import { StudentController } from "./student.controller";

const StudentRoutes = Router();

StudentRoutes.get("/", StudentController.getAllStudents);

export default StudentRoutes;
