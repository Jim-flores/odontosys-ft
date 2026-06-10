import { CreateAppointmentInput } from "../interfaces/types";

export const appointmentConstantKey = "appointments";

export const appointmentStatus = [
  {
    id: "1",
    name: "PROGRAMADA",
    value: "SCHEDULED",
    color: "text-(--color-await-text) bg-(--color-await-bg)",
  },
  {
    id: "2",
    name: "CONFIRMADA",
    value: "CONFIRMED",
    color: "text-(--color-ready-text) bg-(--color-ready-bg)",
  },
  {
    id: "3",
    name: "EN PROGRESO",
    value: "IN_PROGRESS",
    color: "text-(--color-await-text) bg-(--color-await-bg)",
  },
  {
    id: "4",
    name: "COMPLETADA",
    value: "COMPLETED",
    color: "text-(--color-ready-text) bg-(--color-ready-bg)",
  },
  {
    id: "5",
    name: "CANCELADA",
    value: "CANCELLED",
    color: "text-(--color-decl-text) bg-(--color-decl-bg)",
  },
  {
    id: "6",
    name: "NO ASISTIDA",
    value: "NO_SHOW",
    color: "text-(--color-decl-text) bg-(--color-decl-bg)",
  },
];

export const appointmentTypes = [
  {
    id: "1",
    name: "CONSULTA",
    value: "CONSULTATION",
  },
  {
    id: "2",
    name: "LIMPIEZA",
    value: "CLEANING",
  },
  {
    id: "3",
    name: "EXTRACCION",
    value: "EXTRACTION",
  },
  {
    id: "4",
    name: "ENDODONCIA",
    value: "ENDODONTICS",
  },
  {
    id: "5",
    name: "ORTODONCIA",
    value: "ORTHODONTICS",
  },
  {
    id: "6",
    name: "CONTROL",
    value: "CONTROL",
  },
];

export const defaultAppointmentAddValues: CreateAppointmentInput = {
  appointmentType: "CONSULTATION",
  status: "SCHEDULED",
  title: "",
  notes: "",
  startAt: "",
  endAt: "",
  clientId: "",
  userId: "",
};

export const formatAppointmentStatus = (
  str: string,
  option: "name" | "color",
) => {
  const status = appointmentStatus.find((item) => item.value === str);
  return option === "name" ? status?.name : status?.color;
};

export const formatAppointmentType = (str: string) => {
  return appointmentTypes.find((item) => item.value === str)?.name;
};
