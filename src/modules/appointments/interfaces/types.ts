import z from "zod";
import {
  appointmentSchema,
  appointmentStatusSchema,
  appointmentTypeSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../constants/appointmentSchema";

export type Appointment = z.infer<typeof appointmentSchema>;
export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;
export type AppointmentType = z.infer<typeof appointmentTypeSchema>;

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;

// Calendar

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  extendedProps?: {
    status: AppointmentStatus;
    appointmentType: AppointmentType;
    clientId: string;
    userId: string;
  };
};

export type CalendarQuery = {
  start: Date;
  end: Date;
};
