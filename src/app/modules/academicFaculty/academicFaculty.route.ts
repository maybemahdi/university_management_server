import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";

const AcademicFacultyRoutes = Router();

AcademicFacultyRoutes.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.CreateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

AcademicFacultyRoutes.get(
  "/",
  AcademicFacultyController.getAllAcademicFaculties,
);

AcademicFacultyRoutes.get(
  "/:facultyId",
  AcademicFacultyController.getSingleAcademicFaculty,
);

AcademicFacultyRoutes.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export default AcademicFacultyRoutes;
