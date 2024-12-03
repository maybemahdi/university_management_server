import { Student } from "./student.model";

const getAllStudents = async () => {
  const result = await Student.find()
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};

export const StudentService = {
  getAllStudents,
};
