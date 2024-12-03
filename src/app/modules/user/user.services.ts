import { startSession } from "mongoose";
import config from "../../config";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudent = async (password: string, studentData: IStudent) => {
  // generate student id before creating a user and student
  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );
  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found");
  }
  const session = await startSession();
  try {
    session.startTransaction();
    // set user id, role and password for creating a user before creating a student
    const userData: Partial<IUser> = {
      id: await generateStudentId(academicSemester as IAcademicSemester),
      password: password || (config.default_student_pass as string),
      role: "student",
    };

    // create user
    const newUser = await User.create([userData], { session }); // write with session(1)
    // if user is created then set student.id from user.id and student.user => user._id (ref)
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id; // reference id
    // create a student
    const newStudent = await Student.create([studentData], { session }); // write with session (2)
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }
    await session.commitTransaction();
    return newStudent[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    // End session
    await session.endSession();
  }
};

export const UserService = {
  createStudent,
};
