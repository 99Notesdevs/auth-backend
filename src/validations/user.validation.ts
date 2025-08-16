import { z } from 'zod';

export const userDetailsValidation = z.object({
    firstName: z.string().min(2, { message: "First name must be atleast 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be atleast 2 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
})

export const userLoginValidation = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
})

export const userUpdateValidation = z.object({
    id: z.string().uuid({ message: "Invalid user id" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
})