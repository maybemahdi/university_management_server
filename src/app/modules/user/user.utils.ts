import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

//student id
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

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};
