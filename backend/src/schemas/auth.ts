import * as z from "zod";

const BaseUserSchema = z.object({
    name: z.string().min(3),
    age: z.number().int().min(18).optional(),
    email: z.email(),
});

export const RegisterSchema = BaseUserSchema.extend({
    password: z.string().min(6)
}).openapi("Register")

export const LoginSchema = z.object({
    email: z.string(),
    password: z.string().min(6)
}).openapi("Login")

export const UserResponseSchema = BaseUserSchema.extend({
    id: z.number().int().positive(),
}).openapi("UserResponse")

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type UserResponseType = z.infer<typeof UserResponseSchema>;