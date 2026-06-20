import { z } from "zod";

const appointmentDateTimeInput = z
  .string()
  .nonempty("La fecha es obligatoria")
  .refine((value) => !Number.isNaN(new Date(value).getTime()), {
    message: "Ingrese una fecha válida",
  });

export const appointmentStatusSchema = z.enum([
  "SCHEDULED",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
]);

export const appointmentTypeSchema = z.enum([
  "CONSULTATION",
  "CLEANING",
  "EXTRACTION",
  "ENDODONTICS",
  "ORTHODONTICS",
  "CONTROL",
]);
export const appointmentSchema = z.object({
  id: z.string().uuid(),

  appointmentType: appointmentTypeSchema,
  status: appointmentStatusSchema,

  title: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),

  startAt: appointmentDateTimeInput,
  endAt: appointmentDateTimeInput,

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  clientId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const createAppointmentSchema = z.object({
  appointmentType: appointmentTypeSchema,

  status: appointmentStatusSchema.optional(),

  title: z.string().optional(),

  notes: z.string().optional(),

  startAt: appointmentDateTimeInput,

  endAt: appointmentDateTimeInput,

  clientId: z.string().uuid(),

  userId: z.string().uuid(),
});

export const updateAppointmentSchema = z.object({
  appointmentType: appointmentTypeSchema.optional(),

  status: appointmentStatusSchema.optional(),

  title: z.string().optional(),

  notes: z.string().optional(),

  startAt: appointmentDateTimeInput.optional(),

  endAt: appointmentDateTimeInput.optional(),

  clientId: z.string().uuid().optional(),

  userId: z.string().uuid().optional(),

  branchId: z.string().uuid(),
});
