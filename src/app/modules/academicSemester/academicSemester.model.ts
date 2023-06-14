import { Schema, model } from 'mongoose';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

//Handle Same Year Same Semester Validation
academicSemesterSchema.pre('save', async function (next) {
  const semesterExists = await AcademicSemester.exists({
    title: this.title,
    year: this.year,
  });
  if (semesterExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester already exists!'
    );
  }

  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
