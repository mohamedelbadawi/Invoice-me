import z from "zod";

export const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "password must be at least 8 characters"),
});
