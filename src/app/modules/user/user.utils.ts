import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async (academicSemester: IAcademicSemester) => {
  const lastStudent = await User.findOne(
    {
      role: "student",
      id: new RegExp(`^${academicSemester.year}${academicSemester.code}`),
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId(academicSemester);
  if (lastStudentId) {
    currentId = lastStudentId.substring(6);
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  const finalId = `${academicSemester.year}${academicSemester.code}${incrementId}`;
  return finalId;
};