import { useQuery } from "@tanstack/react-query";
import AppointmentsServices from "../services/appointments.service";

export const getAppointmentDetailQueryOptions = (id: string) => ({
  queryKey: ["detail-event", id] as const,
  queryFn: () => AppointmentsServices.findOne(id),
  enabled: !!id,
  staleTime: 1000 * 60 * 5,
});

export const useAppointmentDetailQuery = (id: string) =>
  useQuery(getAppointmentDetailQueryOptions(id));
