import { z } from 'zod';




export const userZodSchema = z.object({
  password: z.string({invalid_type_error:'Password must be string'}).max(20,{message:'dont give more than 20 character'}).optional(),
});

export const TUserZod = {userZodSchema}
