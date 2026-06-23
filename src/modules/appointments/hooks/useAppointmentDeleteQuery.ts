import { PaginationResponse } from "@/interfaces/PaginationType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentConstantKey } from "../constants/appointmentConstant";
import { Appointment } from "../interfaces/types";
import AppointmentsServices from "../services/appointments.service";
import { invalidateAppointmentQueries } from "./useAppointmentQuery";

export const useAppointmentDeleteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AppointmentsServices.remove(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [appointmentConstantKey],
      });

      const queries = queryClient.getQueriesData<
        PaginationResponse<Appointment>
      >({
        queryKey: [appointmentConstantKey],
      });

      queries.forEach(([key, previous]) => {
        if (!previous) return;
        queryClient.setQueryData<PaginationResponse<Appointment>>(key, {
          ...previous,
          rows: previous.rows.filter((row) => row.id !== id),
          pagination: {
            ...previous.pagination,
            total: previous.pagination.total - 1,
          },
        });
      });

      return { queries };
    },

    onError: (_err, _vars, context) => {
      context?.queries.forEach(([key, previous]) => {
        queryClient.setQueryData(key, previous);
      });
    },

    onSuccess: () => {
      invalidateAppointmentQueries(queryClient);
    },
  });
};
