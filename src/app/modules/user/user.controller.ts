import httpStatus from "http-status";
import { UserService } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createStudent = catchAsync(async (req, res) => {
  const { password, ...studentData } = req.body;
  const result = await UserService.createStudent(password, studentData);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Student isn't Created",
      data: result,
    });
  }
});

export const UserController = {
  createStudent,
};
