import { z } from "zod";

export const UserStatus = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);
export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  dni: z.string(),
  address: z.string().optional(),
  status: UserStatus,
  createdAt: z.string(),
  branchId: z.string(),
  // solo el primer rol del usuario
  roles: z.string(),
});

export const UserRequestSchema = z
  .object({
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
    address: z.string().optional(),

    // status: z
    //   .preprocess((val) => (val === "" ? undefined : val), UserStatus)
    //   .default("ACTIVE"),
    status: UserStatus,
    password: z
      .string()
      .min(6, "Minimo 6 caracteres")
      .nonempty("El campo es obligatorio"),
    confirmPassword: z
      .string()
      .min(6, "Minimo 6 caracteres")
      .nonempty("El campo es obligatorio"),
    branchId: z
      .string()
      .nonempty("Seleccione una sucursal")
      .refine((val) => val !== "null", {
        message: "Debe seleccionar una opción",
      }),
    roles: z
      .string()
      .nonempty("Seleccione un rol")
      .refine((val) => val !== "null", {
        message: "Debe seleccionar una opción",
      }),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
