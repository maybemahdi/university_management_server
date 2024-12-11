import { Router } from "express";
import StudentRoutes from "../modules/student/student.route";
import UserRoutes from "../modules/user/user.route";
import AcademicSemesterRoutes from "../modules/academicSemester/academicSemester.route";
import AcademicFacultyRoutes from "../modules/academicFaculty/academicFaculty.route";
import AcademicDepartmentRoutes from "../modules/academicDepartment/academicDepartment.route";
import FacultyRoutes from "../modules/faculty/faculty.route";
import AdminRoutes from "../modules/admin/admin.route";

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
    path: "/faculties",
    destination: FacultyRoutes,
  },
  {
    path: "/admins",
    destination: AdminRoutes,
  },
  {
    path: "/academic-semesters",
    destination: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    destination: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    destination: AcademicDepartmentRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.destination));
export default router;
