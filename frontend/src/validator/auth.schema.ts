import { z } from "zod"

export const signupSchema = z.object({
  email: z
    .email({ message: "Invalid email address" }),
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  age: z
    .number({ message: "Age is required" })
    .int()
    .min(18, { message: "Age must be at least 18" })
    .max(100, { message: "Age must be at most 100" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z
    .string({ message: "Confirm Password is required" })
    .min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Shows the error on the confirmPassword field
})

export type SignupFormValues = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
})

export type LoginFormValues = z.infer<typeof loginSchema>
