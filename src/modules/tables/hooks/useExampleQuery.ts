import { useCreateExampleRow } from "./useCreateExample";
import { useDeleteExampleRow } from "./useDeleteExample";
import { useUpdateExampleRow } from "./useUpdateExample";

export const useExampleQuery = () => {
  const create = useCreateExampleRow();
  const update = useUpdateExampleRow();
  const remove = useDeleteExampleRow();

  return {
    create,
    update,
    delete: remove,
  };
};
