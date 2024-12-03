import { Types } from "mongoose";

export interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
export interface IPresentAddress {
  city: string;
  postCode: number;
}
export interface IPermanentAddress {
  city: string;
  postCode: number;
}
export interface IGuardian {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
}
export interface ILocalGuardian {
  guardianName: string;
  guardianContactNo: string;
  guardianOccupation: string;
}

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  name: IName;
  gender: string;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: IPresentAddress;
  permanentAddress: IPermanentAddress;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
}
