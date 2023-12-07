/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

export const catchAsync = (fn:RequestHandler)=>{
       return(req:Request,res:Response,next:NextFunction)=>{
              Promise.resolve(fn(req,res,next)).catch(err=>next(err))
       }
}

const getAllStudent:RequestHandler = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  const result = await studentServices.getAllStudentsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'student are retrieve successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentServices.deleteStudentFromDB(id);
  res.status(200).json({
    success: true,
    message: 'student is deleted successfully',
    data: result,
  });
});

export const studentController = {
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent,
    
}