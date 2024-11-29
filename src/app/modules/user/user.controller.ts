import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, ...studentData } = req.body;
    const result = await UserService.createStudent(password, studentData);
    if (result) {
      res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
