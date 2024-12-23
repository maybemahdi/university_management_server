import { startSession } from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IName,
  IPresentAddress,
  IStudent,
} from "./student.interface";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

const getAllStudents = async (query: Record<string, unknown>) => {
  // method chaining
  // const queryObj = { ...query }; // clone

  // //searching
  // const searchTerm = (query?.searchTerm as string) || "";
  // const studentSearchableFields = [
  //   "name.firstName",
  //   "name.middleName",
  //   "name.lastName",
  //   "email",
  // ];
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // // filtering
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   })
  //   .populate("admissionSemester");

  // //sorting
  // const sort = (query?.sort as string) || "-createdAt";
  // const sortQuery = filterQuery.sort(sort);

  // // pagination(limit,skip)
  // const page = Number(query?.page) || 1;
  // const limit = Number(query?.limit) || 1;
  // const skip = Number(query?.page) ? (page - 1) * limit : 0;
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // //fields filtering
  // let fields = "-__v";
  // if (query?.fields) {
  //   fields = (query?.fields as string)?.split(",")?.join(" ");
  // }
  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const {
    name,
    presentAddress,
    permanentAddress,
    guardian,
    localGuardian,
    ...remainingStudentData
  } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  const addToModifiedData = (
    prefix: string,
    obj:
      | IName
      | IPresentAddress
      | IGuardian
      | ILocalGuardian
      | { [s: string]: unknown }
      | ArrayLike<unknown>
      | undefined,
  ) => {
    if (obj && Object.keys(obj).length) {
      for (const [key, value] of Object.entries(obj)) {
        modifiedUpdatedData[`${prefix}.${key}`] = value;
      }
    }
  };

  addToModifiedData("name", name);
  addToModifiedData("presentAddress", presentAddress);
  addToModifiedData("permanentAddress", permanentAddress);
  addToModifiedData("guardian", guardian);
  addToModifiedData("localGuardian", localGuardian);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudent = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }
    await session.commitTransaction();
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
