import express, { Application, Request, Response } from "express";
import cors from "cors";
import StudentRoutes from "./app/modules/student/student.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// get started
const getRoot = (req: Request, res: Response) => {
  res.send("University Management is Running");
};

// application routes
const routes = [
  {
    path: "/",
    destination: getRoot,
  },
  {
    path: "/api/v1/students",
    destination: StudentRoutes,
  },
];

routes.forEach((route) => app.use(route.path, route.destination));

export default app;
