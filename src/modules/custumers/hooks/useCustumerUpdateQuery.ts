import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustumerDTO } from "../interfaces/types";
import CustumersServices from "../services/custumers.service";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { custumerConstantKey } from "../constants/custumerConstants";

interface UpdateProps {
  id: string;
  data: CustumerDTO;
}

export const useCustumerUpdateQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: UpdateProps) =>
      CustumersServices.update(id, data),

    onMutate: async (updateRow) => {
      await queryClient.cancelQueries({
        queryKey: [custumerConstantKey],
      });

      const queries = queryClient.getQueriesData<
        PaginationResponse<CustumerDTO>
      >({
        queryKey: [custumerConstantKey],
      });

      queries.forEach(([key, previous]) => {
        if (!previous) return;
        queryClient.setQueryData<PaginationResponse<CustumerDTO>>(key, {
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
        queryKey: [custumerConstantKey],
      });
    },
  });
};
