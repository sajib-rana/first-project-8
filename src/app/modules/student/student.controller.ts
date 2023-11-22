import { Request, Response } from "express";
import { studentServices } from "./student.service";
// import studentSchema from "./student.joi.validation";
import { StudentZodModel } from "./student.validation";

const createStudent = async (req:Request,res: Response)=>{

   try{
     const student = req.body.student;
     //data validation using joi
    //  const {error,value} = studentSchema.validate(student)

    //now implement Zod validation
    const zodParseData = StudentZodModel.parse(student)
     //and then validation data send in database from here
    const result = await studentServices.createStudentIntoDB(zodParseData)

//      if(error){
//       res.status(500).json({
//         success:false,
//         message:'something wrong',
//         error:error.details
//    })
//      }
    
   
    //send response 
    res.status(200).json({
        success:true,
        message:'student created successfully',
        data:result
    })
   }
   catch(err:any){
    res.status(500).json({
        success:false,
        message: err.message ||'something wrong',
        error:err
   })
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
       catch(err:any){
        res.status(500).json({
        success:false,
        message: err.message ||'something wrong',
        error:err
   })
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
       catch(err:any){
        res.status(500).json({
        success:false,
        message: err.message ||'something wrong',
        error:err
   })
       }
}
const deleteStudent = async(req:Request,res:Response) =>{
       try{
        const {studentId} = req.params;
        const result = await studentServices.deleteStudentFromDB(studentId)
        res.status(200).json({
        success:true,
        message:'student is deleted successfully',
        data:result
    })
       }
       catch(err:any){
        res.status(500).json({
        success:false,
        message: err.message ||'something wrong',
        error:err
   })
       }
}

export const studentController = {
    createStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent
}