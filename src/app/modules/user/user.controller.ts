import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...user } = req.body;
  const result = await UserService.createStudent(student, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
