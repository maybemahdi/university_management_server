import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AdminControllers } from "./admin.controller";
import { UpdateAdminValidationSchema } from "./admin.validation";

const AdminRoutes = Router();

AdminRoutes.get("/", AdminControllers.getAllAdmins);

AdminRoutes.get("/:id", AdminControllers.getSingleAdmin);

AdminRoutes.patch(
  "/:id",
  validateRequest(UpdateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

AdminRoutes.delete("/:adminId", AdminControllers.deleteAdmin);

export default AdminRoutes;