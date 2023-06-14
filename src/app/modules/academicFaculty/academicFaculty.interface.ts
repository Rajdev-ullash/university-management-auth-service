import { Model } from 'mongoose';
type IAcademicFaculty = {
  title: string;
};

type AcademicFacultyModel = Model<IAcademicFaculty, Record<string, object>>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};

export { IAcademicFaculty, AcademicFacultyModel };
