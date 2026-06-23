import { QueryClient } from "@tanstack/react-query";
import { useAppointmentCreateQuery } from "./useAppointmentCreateQuery";
import { useAppointmentDeleteQuery } from "./useAppointmentDeleteQuery";
import { useAppointmentUpdateQuery } from "./useAppointmentUpdateQuery";
import { appointmentConstantKey } from "../constants/appointmentConstant";
import { calendarConstantKey } from "../constants/calendarConstant";

export const invalidateAppointmentQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: [appointmentConstantKey],
  });

  queryClient.invalidateQueries({
    queryKey: [calendarConstantKey],
  });
};

export const useAppointmentQuery = () => {
  const create = useAppointmentCreateQuery();
  const update = useAppointmentUpdateQuery();
  const remove = useAppointmentDeleteQuery();

  return {
    create,
    update,
    delete: remove,
  };
};
