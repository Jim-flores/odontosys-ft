import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().uuid().optional(),

  name: z.string().min(1, "El nombre es requerido"),

  lastName: z.string().min(1, "El apellido es requerido"),

  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),

  dni: z
    .string()
    .min(8, "El DNI debe tener 8 caracteres")
    .max(8, "El DNI debe tener 8 caracteres"),

  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional().nullable(),

  phone: z.string().min(1, "El teléfono es requerido"),

  email: z.string().email("Correo inválido").optional().nullable(),

  currentAddress: z.string().optional().nullable(),

  birthDate: z.union([z.string(), z.date()]).optional().nullable(),

  birthPlace: z.string().optional().nullable(),

  religion: z.string().optional().nullable(),

  maritalStatus: z.string().optional().nullable(),

  occupation: z.string().optional().nullable(),

  grade: z.string().optional().nullable(),

  age: z.number().int().positive().optional().nullable(),

  dep: z.string().optional().nullable(),

  prov: z.string().optional().nullable(),

  city: z.string().optional().nullable(),

  chiefComplaint: z.string().optional().nullable(),

  branchId: z.string().uuid("branchId inválido"),

  userId: z.string().uuid().optional().nullable(),
});
