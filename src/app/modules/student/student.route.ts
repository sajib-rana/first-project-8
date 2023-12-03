import express from "express";
import { studentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router();

// router.post('/create-student',studentController.createStudent)
router.get('/',studentController.getAllStudent)
router.get('/:studentId',studentController.getSingleStudent)
router.patch('/:studentId',validateRequest(updateStudentValidationSchema),studentController.updateStudent);
router.delete('/:studentId',studentController.deleteStudent)

export const StudentRoutes = router;