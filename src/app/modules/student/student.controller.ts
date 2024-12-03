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
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudent(studentId);
  sendResponse(res, {
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: !!result,
    message:  result ?"Student is Retrieved Successfully": "This Student doesn't exist",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
};
