import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//Handle Same title Validation
academicFacultySchema.pre('save', async function (next) {
  const facultyExists = await AcademicFaculty.exists({
    title: this.title,
  });
  if (facultyExists) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic Faculty already exists!');
  }

  next();
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
