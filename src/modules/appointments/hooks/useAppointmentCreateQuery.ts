import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAppointmentInput } from "../interfaces/types";
import AppointmentsServices from "../services/appointments.service";
import { invalidateAppointmentQueries } from "./useAppointmentQuery";

export const useAppointmentCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentInput) =>
      AppointmentsServices.create(data),

    onSuccess: () => {
      invalidateAppointmentQueries(queryClient);
    },
  });
};
