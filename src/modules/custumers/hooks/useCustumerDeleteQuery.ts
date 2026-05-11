import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustumersServices from "../services/custumers.service";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { CustumerDTO } from "../interfaces/types";
import { custumerConstantKey } from "../constants/custumerConstants";

export const useCustumerDeleteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CustumersServices.remove(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [custumerConstantKey],
      });

      const [[fullKey, previous]]: Array<
        [readonly unknown[], PaginationResponse<CustumerDTO> | undefined]
      > = queryClient.getQueriesData({
        queryKey: [custumerConstantKey],
      });

      if (previous) {
        const newData: PaginationResponse<CustumerDTO> = {
          ...previous,
          rows: previous.rows.filter((row) => row.id !== id),
          pagination: {
            ...previous.pagination,
            total: previous.pagination.total - 1,
          },
        };
        queryClient.setQueryData(fullKey, newData);
      }

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData([custumerConstantKey], ctx.previous);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [custumerConstantKey],
      });
    },
  });
};
