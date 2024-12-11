import { Model, Types } from "mongoose";

export type IGender = "male" | "female" | "other";
export type IBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export interface IUserName {
  firstName: string;
  middleName: string;
  lastName: string;
};

export interface IAdmin {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: IUserName;
  gender: IGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: IBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<IAdmin> {
  isUserExists(id: string): Promise<IAdmin | null>;
}
