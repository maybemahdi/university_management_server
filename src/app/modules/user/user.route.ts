import { Router } from "express";
import { UserController } from "./user.controller";

const UserRoutes = Router();

UserRoutes.post("/create-student", UserController.createStudent);

export default UserRoutes;
