
import { z } from 'zod'
import { UserRole } from './constants';


export const loginFormSchema = () =>
  z.object({
   identifier : z.
   coerce.string({
  invalid_type_error: 'Name must to be a text',
  required_error: 'Name is required',
}),
      
password: z
  .string()
  // .min(8, 'Password must be at least 8 characters')
  // .max(64, 'Password must be less than 64 characters')
  // .refine((pwd) => /[A-Z]/.test(pwd), {
  //   message: 'Must contain at least one uppercase letter',
  // })
  // .refine((pwd) => /[a-z]/.test(pwd), {
  //   message: 'Must contain at least one lowercase letter',
  // })
  // .refine((pwd) => /[0-9]/.test(pwd), {
  //   message: 'Must contain at least one number',
  // })
  // .refine((pwd) => /[!@#$%^&*()]/.test(pwd), {
  //   message: 'Must contain at least one special character',
  // }),
  })

export const userSchema = () =>
  z.object({
    _id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(8, 'Phone is required').max(11),
  cid: z.string().length(11, 'CID must be exactly 11 characters'),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: 'Invalid role selected' }),
  }),
  password: z
    .string()
    .optional()
    .refine((pwd) => pwd === undefined || pwd.length >= 8, {
      message: 'Password must be at least 8 characters',
    })
    .refine((pwd) => pwd === undefined || pwd.length <= 64, {
      message: 'Password must be less than 64 characters',
    })
    .refine((pwd) => pwd === undefined || /[A-Z]/.test(pwd), {
      message: 'Must contain at least one uppercase letter',
    })
    .refine((pwd) => pwd === undefined || /[a-z]/.test(pwd), {
      message: 'Must contain at least one lowercase letter',
    })
    .refine((pwd) => pwd === undefined || /[0-9]/.test(pwd), {
      message: 'Must contain at least one number',
    })
    .refine((pwd) => pwd === undefined || /[!@#$%^&*()]/.test(pwd), {
      message: 'Must contain at least one special character',
    }),
});
