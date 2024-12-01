import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const AcademicSemesterRoutes = Router();

AcademicSemesterRoutes.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.CreateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

export default AcademicSemesterRoutes;
