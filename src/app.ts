import express, { Application, Request, Response } from "express";
import cors from "cors";
import StudentRoutes from "./app/modules/student/student.route";
import UserRoutes from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// middleware and parser
app.use(express.json());
app.use(cors());

// get started
const getRoot = (req: Request, res: Response) => {
  res.send("University Management is Running");
};

app.get("/", getRoot);

// application routes
const routes = [
  {
    path: "/api/v1/students",
    destination: StudentRoutes,
  },
  {
    path: "/api/v1/users",
    destination: UserRoutes,
  },
];

routes.forEach((route) => app.use(route.path, route.destination));

// global error handler
app.use(globalErrorHandler);

export default app;
