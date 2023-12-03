import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentSchema } from '../student/student.validation';

const router = express.Router();

router.post('/create-student',validateRequest(studentSchema), UserControllers.createStudent);

export const UserRoutes = router;
