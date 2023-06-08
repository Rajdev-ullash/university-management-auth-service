import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from '../user/user.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  UserController.createUser
);

export const AcademicRoutes = router;
