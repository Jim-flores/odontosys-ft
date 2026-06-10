import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentConstantKey } from "../constants/appointmentConstant";
import { CreateAppointmentInput } from "../interfaces/types";
import AppointmentsServices from "../services/appointments.service";

export const useAppointmentCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentInput) =>
      AppointmentsServices.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appointmentConstantKey],
      });
    },
  });
};
