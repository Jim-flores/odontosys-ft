import { PaginationResponse } from "@/interfaces/PaginationType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentConstantKey } from "../constants/appointmentConstant";
import { Appointment, UpdateAppointmentInput } from "../interfaces/types";
import AppointmentsServices from "../services/appointments.service";

interface UpdateProps {
  id: string;
  data: UpdateAppointmentInput;
}

export const useAppointmentUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProps) =>
      AppointmentsServices.update(id, data),

    onMutate: async (updateRow) => {
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
          rows: previous.rows.map((row) =>
            row.id === updateRow.id ? { ...row, ...updateRow.data } : row,
          ),
        });
      });

      return { queries };
    },

    onError: (_err, _row, context) => {
      context?.queries.forEach(([key, previous]) => {
        queryClient.setQueryData(key, previous);
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appointmentConstantKey],
      });
    },
  });
};
