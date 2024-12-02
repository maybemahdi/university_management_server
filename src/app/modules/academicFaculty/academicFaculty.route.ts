import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const AcademicFacultyRoutes = Router();

AcademicFacultyRoutes.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.CreateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

AcademicFacultyRoutes.get(
  "/",
  AcademicFacultyControllers.getAllAcademicFaculties,
);

AcademicFacultyRoutes.get(
  "/:facultyId",
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

AcademicFacultyRoutes.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export default AcademicFacultyRoutes;
