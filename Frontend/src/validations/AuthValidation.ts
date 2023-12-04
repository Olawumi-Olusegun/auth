import { z } from 'zod';

export const schema = {
    email: z.string().trim().email("Email is invalid"),
    password: z.string().trim()
    .min(3, "Password length must be at least 3 characters")
    .max(20, "Password length should not be more than 20 characters"),
};

export const signInSchema = z.object({
    ...schema,
})
export const signUpSchema = z.object({
    ...schema,
    username: z.string().trim().min(2, "Username must be a minimum of 2 characters"),
});