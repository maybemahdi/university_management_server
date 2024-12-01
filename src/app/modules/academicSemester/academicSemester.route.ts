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

AcademicSemesterRoutes.get(
  "/",
  AcademicSemesterController.getAcademicSemesters,
);

AcademicSemesterRoutes.get(
  "/:semesterId",
  AcademicSemesterController.getSingleAcademicSemester,
);

AcademicSemesterRoutes.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidations.UpdateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateSingleAcademicSemester,
);

export default AcademicSemesterRoutes;
