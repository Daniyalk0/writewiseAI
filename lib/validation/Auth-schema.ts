import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email({message: "Invalid Email Address"}),
    password: z.string().min(6, {message: 'Password must be atleast 6 characters long'})
})

export const signupSchema = z.object({
    email: z.string().email({message: "Invalid Email Address"}),
    password: z.string().min(6, {message: 'Password must be atleast 6 characters long'}),
    name: z.string().min(2, {message: "name is too Short"}),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message:"Password do not match",
    path:['confirmPassword'],
})

export type LoginSchema = z.infer<typeof loginSchema>
export type SignupSchema = z.infer<typeof signupSchema>