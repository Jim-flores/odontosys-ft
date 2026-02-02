import { z } from "zod";

export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  dni: z.string(),
  address: z.string().optional(),
  status: z.string(),
  createdAt: z.string(),
  branchId: z.object({ name: z.string() }),
});

export const UserStatus = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED", "null"]);

export const UserRequestSchema = z.object({
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
    .length(8)
    .email("Ingrese un correo válido")
    .nonempty("El campo es obligario"),
  phone: z
    .string()
    .length(9)
    .email("Ingrese un correo válido")
    .nonempty("El campo es obligario"),
  address: z.string().optional(),

  status: UserStatus.default("ACTIVE").refine((val) => val !== "null", {
    message: "Debe seleccionar un rol válido",
  }),
  password: z
    .string()
    .min(6, "Minimo 6 caracteres")
    .nonempty("El campo es obligatorio"),
  branchId: z
    .string()
    .nonempty("Seleccione una sucursal")
    .refine((val) => val !== "null", {
      message: "Debe seleccionar una opción",
    }),
  roles: z.array(z.string().uuid()),
});
