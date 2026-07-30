import { z } from "zod";

export const propertyFormSchema = z.object({
  name: z
    .string({ error: "Property name is required" })
    .trim()
    .min(2, "Property name must be at least 2 characters"),
  street: z.string().trim().min(1, "Street is required"),
  city: z.string().trim().min(1, "City is required"),
  unitCount: z.coerce
    .number({ error: "Unit count is required" })
    .int("Unit count must be a whole number")
    .min(1, "Unit count must be at least 1"),
  description: z.string().trim().optional(),
});

export type PropertyFormInput = z.input<typeof propertyFormSchema>;
export type PropertyFormFields = z.output<typeof propertyFormSchema>;

export type PropertyFormValues = PropertyFormFields & {
  image: File | null;
};
