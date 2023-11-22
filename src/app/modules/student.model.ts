import { Schema, model } from 'mongoose';
import { StudentModel, TGurdian, TLocalGurdian, TStudent, TUserName } from './student/student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt'
import config from '../config';

const userNameSchema = new Schema<TUserName>(
  {
        firstName:{type:String,
            required:[true,'first name is required'],
            trim:true,
            maxlength:[20,'first name can not be more than 20 character'],
            validate:{
                validator:function(value:string){
                    const firstNameStr = value.charAt(0).toUpperCase()+value.slice(1)
                    return firstNameStr === value;
                },
                message:'{VALUE} is not capitalize format'
            }
        },
        middleName:{type:String},
        lastName:{type:String,
            required:[true,'last name is required'],
            validate:{
                validator:(value:string)=>validator.isAlpha(value),
                message:'{VALUE} is not valid'
            }
        }

    }
)
const gurdianSchema = new Schema<TGurdian>(
  {
        fatherName:{type:String,required:true},
        fatherOcupation:{type:String,required:true},
        fatherContactNo:{type:String,required:true},
        motherName:{type:String,required:true},
        motherOcupation:{type:String,required:true},
        motherContactNo:{type:String,required:true},
    }
)
const localGurdianSchema = new Schema<TLocalGurdian>(
  {
        name:{type:String,required:true},
        occupation:{type:String,required:true},
        contactNo:{type:String,required:true},
        address:{type:String,required:true}
    }
)

const studentSchema = new Schema<TStudent,StudentModel>({
    id:{type: String,required:true,unique:true},
    password:{type: String,required:true,maxlength:[20,'password give maxlength 20 character']},
    name:{type:userNameSchema,required:true},
    gender:{type:String,enum:{values:['male','female'],message:'{VALUE} is not valid'},required:true},
    dateOfBirth:{type:String},
    email:{type: String,
        required:true,
        unique:true,
        validate:{
            validator:(value:string)=> validator.isEmail(value),
            message:'{VALUE} is not valid email type'
        }
    },
    contactNo:{type: String,required:true},
    emergencyContactNo:{type: String,required:true},
    bloodGroup:{type:String,enum:['A+','A-','AB+','AB-','B+','B-','O+','O-'],required:true},
    presentAddress: {type:String,required:true},
    permanentAddress: {type: String,required:true},
    gurdian:{type:gurdianSchema,required:true},
    localGurdian:{type:localGurdianSchema,required:true},
    profileImg:{type:String},
    isActive:{type:String,enum:['active','blocked'],default:'active'},
    isDeleted:{type:Boolean,default:false}
})

//pre save middleware/hook
studentSchema.pre('save', async function(next){
 // eslint-disable-next-line @typescript-eslint/no-this-alias
 const user = this;
 user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
 next()
})
//post save middleware/hook
studentSchema.post('save',function(doc,next){

    next();
})

//query middleware
studentSchema.pre('find',function(next){
    this.find({isDeleted:{$ne:true}})
    next();
})
studentSchema.pre('findOne',function(next){
    this.find({isDeleted:{$ne:true}})
    next();
})

studentSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
    next();
})

//creating a static method
studentSchema.statics.isUserExists = async function(id:string){
    const existingUser = await Student.findOne({id});
    return existingUser;
}

//creating an custom instance method
// studentSchema.methods.isUserExists = async function (id:string){
//     const existingUser = await Student.findOne({id}) 
//     return existingUser;
// }

export const Student = model<TStudent,StudentModel>('Student',studentSchema)