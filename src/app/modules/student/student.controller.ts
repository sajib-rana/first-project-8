import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudent = async (req:Request,res: Response)=>{

   try{
     const student = req.body;
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

export const studentController = {
    createStudent
}