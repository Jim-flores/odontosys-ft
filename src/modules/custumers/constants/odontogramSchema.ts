import { z } from "zod";

export const toothSurfaceSchema = z.enum(["M", "D", "V", "L", "O", "I"]);

export const toothConditionSchema = z.enum([
  "CARIES",
  "CROWN",
  "EXTRACTION",
  "IMPLANT",
  "FRACTURE",
  "RESIN",
  "ENDO",
  "MISSING",
  "SEALANT",
]);

export const surfacesSchema = z.object({
  M: z.array(toothConditionSchema).optional(),
  D: z.array(toothConditionSchema).optional(),
  V: z.array(toothConditionSchema).optional(),
  L: z.array(toothConditionSchema).optional(),
  O: z.array(toothConditionSchema).optional(),
  I: z.array(toothConditionSchema).optional(),
});

export const toothRecordSchema = z.object({
  tooth: z.string(),

  surfaces: surfacesSchema.optional(),

  conditions: z.array(toothConditionSchema).optional(),
});

export const odontogramChangeSchema = z.array(toothRecordSchema);

export const odontogramSchema = z.object({
  details: odontogramChangeSchema.optional(),

  clientId: z.string().uuid("Cliente inválido"),
});

export type ToothSurface = z.infer<typeof toothSurfaceSchema>;

export type ToothCondition = z.infer<typeof toothConditionSchema>;

export type ToothRecord = z.infer<typeof toothRecordSchema>;

export type OdontogramChange = z.infer<typeof odontogramChangeSchema>;
