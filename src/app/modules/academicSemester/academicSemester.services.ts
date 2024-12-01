import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemester = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Semester name and code didn't match");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterService = {
  createAcademicSemester,
};
