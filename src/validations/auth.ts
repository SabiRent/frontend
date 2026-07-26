import { z } from "zod";

export const emailSchema = z
  .string({ error: "Email is required" })
  .trim()
  .toLowerCase()
  .email("Invalid email format");

export const passwordSchema = z
  .string({ error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[0-9]/, "Password must contain a number");

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string({ error: "Please confirm your password" }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    fullName: z
      .string({ error: "Full name is required" })
      .trim()
      .min(1, "Full name is required"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string({ error: "Please confirm your password" }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
