import config from "../../config";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createStudent = async (password: string, studentData: IStudent) => {
  // set user id, role and password for creating a user before creating a student
  const userData: Partial<IUser> = {
    id: "20301101", // static, but will make it generated in-future
    password: password || (config.default_student_pass as string),
    role: "student",
  };

  // create user
  const newUser = await User.create(userData);
  // if user is created then set student.id from user.id and student.user => user._id (ref)
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference id
    // create a student
    const newStudent = await Student.create(studentData);
    return newStudent;
  } else {
    return null;
  }
};

export const UserService = {
  createStudent,
};
