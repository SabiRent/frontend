import { z } from "zod";

const today = new Date().toISOString().slice(0, 10);

export const tenantFormSchema = z.object({
  unit: z.string().min(1, "Unit is required"),
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  phone: z.string().trim().min(7, "Phone number is required"),
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .optional()
    .or(z.literal("")),
  rentAmount: z.coerce
    .number()
    .positive("Rent amount must be greater than zero"),
  paymentFrequency: z.enum(["yearly", "quarterly", "monthly"], {
    error: "Payment frequency is required",
  }),
  lastPaymentDate: z
    .string()
    .min(1, "Last payment date is required")
    .refine(
      (date) => date <= today,
      "Last payment date cannot be in the future",
    ),
  status: z
    .enum(["active", "inactive", "pending"], {
      error: "Status is required",
    })
    .default("active"),
});

export type TenantFormInput = z.input<typeof tenantFormSchema>;
export type TenantFormFields = z.infer<typeof tenantFormSchema>;
