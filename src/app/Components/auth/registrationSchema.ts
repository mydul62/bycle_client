import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
  
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  
  passwordConfirm: z
    .string({ required_error: "Password confirmation is required" })
    .min(1, "Password confirmation cannot be empty"),

  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
    .regex(/^[0-9\-\+\(\)]+$/, "Phone number must be valid"),

  gender: z
    .string({ required_error: "Gender is required" })
    .refine((val) => ["male", "female", "other"].includes(val), {
      message: "Gender must be one of 'male', 'female', or 'other'",
    }),

  dateOfBirth: z
    .string({ required_error: "Date of birth is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

  photo: z
    .string({ required_error: "Photo URL is required" })
    .url("Invalid URL format"),
});
