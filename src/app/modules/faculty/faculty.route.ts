import validateRequest from "../../middlewares/validateRequest";
import { UpdateFacultyValidationSchema } from "./faculty.validation";
import { FacultyController } from "./faculty.controller";
import { Router } from "express";

const FacultyRoutes = Router();

FacultyRoutes.get("/", FacultyController.getAllFaculties);
FacultyRoutes.get("/:id", FacultyController.getSingleFaculty);

FacultyRoutes.patch(
  "/:id",
  validateRequest(UpdateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

FacultyRoutes.delete("/:id", FacultyController.deleteFaculty);

export default FacultyRoutes;
