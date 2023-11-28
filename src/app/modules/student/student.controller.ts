/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const catchAsync = (fn:RequestHandler)=>{
       return(req:Request,res:Response,next:NextFunction)=>{
              Promise.resolve(fn(req,res,next)).catch(err=>next(err))
       }
}

const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: 'student are retrieve successfully',
    data: result,
  });
});
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'student is deleted successfully',
    data: result,
  });
});

export const studentController = {
    getAllStudent,
    getSingleStudent,
    deleteStudent
}