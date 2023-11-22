// import { Schema, model, connect } from 'mongoose';

import { Model } from "mongoose";

export type TGurdian = {
    fatherName:string;
    fatherOcupation:string;
    fatherContactNo:string
    motherName:string;
    motherOcupation:string;
    motherContactNo:string
}

export type TUserName = {
    firstName:string;
    middleName?:string;
    lastName:string;
  }

export type TLocalGurdian = {
    name:string;
    occupation:string;
    contactNo:string;
    address:string
}

export type TStudent = {
  id:string;
  password:string;
  name: TUserName ,
  gender:'male'|'female';
  dateOfBirth:string;
  email: string;
  contactNo: string;
  emergencyContactNo:string;
  bloodGroup:'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress:string;
  permanentAddress:string;
  gurdian: TGurdian;
  localGurdian:TLocalGurdian;
  profileImg?:string;
  isActive: 'active'|'blocked';
  isDeleted:boolean;
}



//for creating an static method
export interface StudentModel extends Model<TStudent> {
  isUserExists(id:string):Promise<TStudent | null>
}

//for creating an instance method
// export type StudentMethod = {
//   isUserExists(id:string):Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent,Record<string, never>, StudentMethod>;