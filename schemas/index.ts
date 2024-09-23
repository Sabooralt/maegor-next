import * as z from "zod";

// Login Schema
export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().trim().min(1, "Password is required"),

  code: z.optional(z.string()),
});

// Register Schema
export const RegisterSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters")
      .transform((value) => value.toLowerCase()),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z.string().trim().nonempty("Confirm Password is required"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

// Reset Password Schema
export const ResetSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

// New Password Schema
export const NewPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

// Settings Schema with refinement
export const SettingsSchema = z
  .object({
    name: z.optional(z.string().trim()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(["ADMIN", "USER"]),
    email: z.optional(z.string().email("Invalid email address").trim()),
    password: z.optional(
      z.string().min(6, "Password must be at least 6 characters").trim()
    ),
    newPassword: z.optional(
      z.string().min(6, "New password must be at least 6 characters").trim()
    ),
  })
  .refine((data) => !data.password || !!data.newPassword, {
    message: "New password is required when changing the password",
    path: ["newPassword"],
  })
  .refine((data) => !data.newPassword || !!data.password, {
    message: "Password is required when changing the password",
    path: ["password"],
  });
