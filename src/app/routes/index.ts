import { Router } from "express";
import StudentRoutes from "../modules/student/student.route";
import UserRoutes from "../modules/user/user.route";

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
];

routes.forEach((route) => router.use(route.path, route.destination));
export default router;
