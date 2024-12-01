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

const getAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAcademicSemesters();
  sendResponse(res, {
    statusCode: result ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR,
    success: !!result,
    message: result
      ? "Academic Semesters retrieved successfully"
      : "Failed to retrieve Academic Semesters",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterService.getSingleAcademicSemester(semesterId);
  sendResponse(res, {
    statusCode: result ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR,
    success: !!result,
    message: result
      ? "Academic Semester is retrieved successfully"
      : "Failed to retrieve Academic Semester",
    data: result,
  });
});

const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterService.updateSingleAcademicSemester(semesterId, req.body);
  sendResponse(res, {
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: !!result,
    message: result
      ? "Academic Semester updated successfully"
      : "No Semester found for this ID",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
