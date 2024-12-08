import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const AcademicDepartmentRoutes = Router();

AcademicDepartmentRoutes.post(
  "/create-academic-department",
  // validateRequest(
  //   AcademicDepartmentValidation.CreateAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentController.createAcademicDepartment,
);

AcademicDepartmentRoutes.get(
  "/",
  AcademicDepartmentController.getAllAcademicDepartments,
);

AcademicDepartmentRoutes.get(
  "/:departmentId",
  AcademicDepartmentController.getSingleAcademicDepartment,
);

AcademicDepartmentRoutes.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export default AcademicDepartmentRoutes;
