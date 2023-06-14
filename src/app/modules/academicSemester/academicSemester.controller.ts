import { IAcademicSemester } from './academicSemester.interface';
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester fetched successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const academicSemesterData = req.body;
  const result = await AcademicSemesterService.updateSemester(
    id,
    academicSemesterData
  );
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
