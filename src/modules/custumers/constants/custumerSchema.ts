import { z } from "zod";

export const CustumerStatus = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);
export const CustumerGender = z.enum(["MALE", "FEMALE", "OTHER"]);
export const CustumerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  dni: z.string(),
  currentAddress: z.string().optional(),
  // notes: z.string().optional(),
  status: CustumerStatus,
  createdAt: z.string(),
  branchId: z.string(),
  userId: z.string(),
  gender: CustumerGender,
});

export const CustumerRequestSchema = z.object({
  name: z
    .string()
    .min(2, "Minimo 2 caracteres")
    .nonempty("El campo es obligatorio"),
  lastName: z
    .string()
    .min(2, "Minimo 2 caracteres")
    .nonempty("El campo es obligatorio"),
  email: z
    .string()
    .email("Ingrese un correo válido")
    .nonempty("El campo es obligario"),
  dni: z
    .string()
    .length(8, "El DNI debe tener 8 caracteres")
    .nonempty("El campo es obligario"),
  phone: z
    .string()
    .length(9, "El teléfono debe tener 9 caracteres")
    .nonempty("El campo es obligario"),
  currentAddress: z.string().optional(),
  // notes: z.string().optional(),
  status: CustumerStatus,
  gender: z.enum(["MALE", "FEMALE"]),
  branchId: z.string().nonempty("Seleccione una sucursal"),
  userId: z.string().nonempty("El usuario es obligatorio"),
});
