import httpStatus from "http-status";
import { UserService } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createStudent = catchAsync(async (req, res) => {
  const { password, ...studentData } = req.body;
  const result = await UserService.createStudent(password, studentData);
  sendResponse(res, {
    statusCode: result ? httpStatus.CREATED : httpStatus.INTERNAL_SERVER_ERROR,
    success: !!result,
    message: result
      ? "Student is created successfully"
      : "Failed to create student",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFaculty(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdmin(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
