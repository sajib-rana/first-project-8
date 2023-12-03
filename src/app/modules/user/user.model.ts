import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

export const userSchema = new Schema({
    id:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    needsPasswordChange:{type:Boolean,default:true},
    role:{type:String,enum:['admin','student','faculty']},
    status:{type:String,enum:['in-progress','blocked'],default:'in-progress'},
    isDelete:{type:Boolean,default:false}
},
{
    timestamps:true
}
)

//pre save middleware/hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
//post save middleware/hook
userSchema.post('save', function (doc, next) {
    doc.password = '';
  next();
});
export const User = model<TUser>('User',userSchema)