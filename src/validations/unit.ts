import { z } from "zod";

export const unitFormSchema = z.object({
  property: z.string().min(1, "Property is required"),
  name: z.string().trim().min(1, "Unit name is required"),
  occupancyStatus: z.enum(["vacant", "occupied"], {
    error: "Occupancy status is required",
  }),
  rentAmount: z.coerce
    .number({ error: "Rent amount is required" })
    .min(0, "Rent amount cannot be negative"),
  rentInterval: z.enum(["yearly", "monthly"], {
    error: "Rent interval is required",
  }),
});

export type UnitFormInput = z.input<typeof unitFormSchema>;
export type UnitFormFields = z.output<typeof unitFormSchema>;
