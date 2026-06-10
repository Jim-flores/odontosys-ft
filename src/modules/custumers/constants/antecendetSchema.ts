import { z } from "zod";

export const antecedentSchema = z.object({
  lastAppointment: z.string().optional(),

  numberOfBrushesPerDay: z
    .number({
      invalid_type_error: "Debe ser un número",
    })
    .int("Debe ser un número entero")
    .min(0, "No puede ser negativo")
    .optional(),

  pain: z.boolean(),
  painDetails: z.string().optional(),

  clench: z.boolean(),
  clenchDetails: z.string().optional(),

  headache: z.boolean(),
  headacheDetails: z.string().optional(),

  medication: z.boolean(),
  medicationDetails: z.string().optional(),

  allergies: z.boolean(),
  allergiesDetails: z.string().optional(),

  arthritis: z.boolean(),

  hypertension: z.boolean(),

  diabetes: z.boolean(),

  hemorrhage: z.boolean(),

  cardiovascular: z.boolean(),

  pregnancy: z.boolean(),

  others: z.string().optional(),

  clientId: z.string().uuid("clientId debe ser un UUID"),
});
