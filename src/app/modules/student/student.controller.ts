import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentService } from "./student.services";
import httpStatus from "http-status";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudents();
  sendResponse(res, {
    statusCode: result ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR,
    success: !!result,
    message: "Students Retrieved Successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
};
