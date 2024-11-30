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

export const UserController = {
  createStudent,
};
