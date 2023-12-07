import { Types } from "mongoose";

export type TPreRequisitCourse = {
    course:Types.ObjectId;
    isDeleted:boolean
}
export type TCourse = {
    title:string;
    prefix:string;
    code:number;
    credit:number;
    isDeleted:boolean;
    preRequisitCourse: [TPreRequisitCourse]
}

export type TCourseFaculty = {
    course:Types.ObjectId;
    faculties:[Types.ObjectId]
}