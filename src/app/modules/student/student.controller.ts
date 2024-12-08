import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentService } from "./student.services";
import httpStatus from "http-status";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudents(req.query);
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
    message: result
      ? "Student is Retrieved Successfully"
      : "This Student doesn't exist",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.updateStudent(studentId, req.body);
  sendResponse(res, {
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: !!result,
    message: result
      ? "Student is updated Successfully"
      : "Failed to updated student",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudent(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
