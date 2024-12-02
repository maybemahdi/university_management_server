import { Router } from "express";
import StudentRoutes from "../modules/student/student.route";
import UserRoutes from "../modules/user/user.route";
import AcademicSemesterRoutes from "../modules/academicSemester/academicSemester.route";
import AcademicFacultyRoutes from "../modules/academicFaculty/academicFaculty.route";

const router = Router();
const routes = [
  {
    path: "/users",
    destination: UserRoutes,
  },
  {
    path: "/students",
    destination: StudentRoutes,
  },
  {
    path: "/academic-semester",
    destination: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculty",
    destination: AcademicFacultyRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.destination));
export default router;
