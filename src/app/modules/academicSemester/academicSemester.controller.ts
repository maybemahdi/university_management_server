import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterService } from "./academicSemester.services";
import httpStatus from "http-status";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemester(req.body);
  sendResponse(res, {
    statusCode: result ? httpStatus.CREATED : httpStatus.INTERNAL_SERVER_ERROR,
    success: !!result,
    message: result
      ? "Academic Semester is created successfully"
      : "Failed to create Academic Semester",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
