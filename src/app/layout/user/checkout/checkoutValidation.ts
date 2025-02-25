import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  district: z.string().min(1, "District is required"),
  termsChecked: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
