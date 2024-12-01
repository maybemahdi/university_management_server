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

const getAcademicSemesters = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemester = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
  return result;
};

const updateSingleAcademicSemester = async (
  semesterId: string,
  updateData: Partial<IAcademicSemester>,
) => {
  if (
    updateData.name &&
    updateData.code &&
    academicSemesterNameCodeMapper[updateData.name] !== updateData.code
  ) {
    throw new Error("Semester name and code didn't match");
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    semesterId,
    { ...updateData },
    { new: true },
  );
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
