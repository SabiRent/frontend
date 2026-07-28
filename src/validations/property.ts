import { z } from "zod";

export const addPropertySchema = z.object({
  propertyName: z.string().trim().min(1, "Property name is required"),
  city: z.string().trim().min(1, "City is required"),
  propertyAddress: z.string().trim().min(1, "Property address is required"),
  unitCount: z.coerce
    .number({ error: "Unit count is required" })
    .int("Unit count must be a whole number")
    .min(1, "Unit count must be at least 1"),
  description: z.string().optional(),
});

export type AddPropertyFormInput = z.input<typeof addPropertySchema>;

export type AddPropertyFormValues = z.output<typeof addPropertySchema> & {
  image: File | null;
};
