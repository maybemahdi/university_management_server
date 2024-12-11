/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from "mongoose";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { IFaculty } from "../faculty/faculty.interface";
import { Admin } from "../admin/admin.model";
import { IAdmin } from "../admin/admin.interface";
import { Faculty } from "../faculty/faculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import config from "../../config";

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

const createFaculty = async (password: string, payload: IFaculty) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    throw new Error(err);
  } finally {
    await session.endSession();
  }
};

const createAdmin = async (password: string, payload: IAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";

  const session = await startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();

    throw new Error(err);
  } finally {
    await session.endSession();
  }
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
