import * as z from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(3),
    age: z.number().int().min(18).positive().optional(),
    email: z.email(),
    password: z.string().min(6)
}).openapi("Register")

export type RegisterType = z.infer<typeof RegisterSchema>;