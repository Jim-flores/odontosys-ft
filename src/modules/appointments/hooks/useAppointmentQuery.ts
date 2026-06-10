import { useAppointmentCreateQuery } from "./useAppointmentCreateQuery";
import { useAppointmentDeleteQuery } from "./useAppointmentDeleteQuery";
import { useAppointmentUpdateQuery } from "./useAppointmentUpdateQuery";

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
