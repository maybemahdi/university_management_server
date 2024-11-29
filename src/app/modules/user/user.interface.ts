export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
}
