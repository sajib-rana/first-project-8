import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudent = async (req:Request,res: Response)=>{

   try{
     const student = req.body.student;
    //will call service function to send data
    const result = await studentServices.createStudentIntoDB(student)
    //send response 
    res.status(200).json({
        success:true,
        message:'student created successfully',
        data:result
    })
   }
   catch(err){
    console.log(err);
   }

}

const getAllStudent = async(req:Request,res:Response) =>{
       try{
        const result = await studentServices.getAllStudentsFromDB()
        res.status(200).json({
        success:true,
        message:'student are retrieve successfully',
        data:result
    })
       }
       catch(err){
        console.log(err);
       }
}
const getSingleStudent = async(req:Request,res:Response) =>{
       try{
        const {studentId} = req.params;
        const result = await studentServices.getSingleStudentFromDB(studentId)
        res.status(200).json({
        success:true,
        message:'student is retrieve successfully',
        data:result
    })
       }
       catch(err){
        console.log(err);
       }
}

export const studentController = {
    createStudent,
    getAllStudent,
    getSingleStudent
}