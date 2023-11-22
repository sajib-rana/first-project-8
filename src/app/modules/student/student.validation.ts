import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string()
    .min(1)
    .max(20)
    .refine((value) => value[0].toUpperCase() + value.slice(1) === value, {
      message: 'Value is not in capitalized format',
    }),
  middleName: z.string().optional(),
  lastName: z.string()
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Value is not valid',
    })
    ,
});

const gurdianSchema = z.object({
  fatherName: z.string(),
  fatherOcupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOcupation: z.string(),
  motherContactNo: z.string(),
});

const localGurdianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentSchema = z.object({
  id: z.string(),
  password:z.string().max(20),
  name: userNameSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  gurdian: gurdianSchema,
  localGurdian: localGurdianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted:z.boolean()
});

export const StudentZodModel = studentSchema;
