import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tableConstantKey } from "../constants/tableConstants";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { TicketRow } from "../interfaces/types";
import ExampleService from "../services/ExampleService";

export const useDeleteExampleRow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ExampleService.delete(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [tableConstantKey],
      });

      const queries = queryClient.getQueriesData<PaginationResponse<TicketRow>>(
        {
          queryKey: [tableConstantKey],
        },
      );
      queries.forEach(([key, previous]) => {
        if (!previous) return;
        queryClient.setQueryData<PaginationResponse<TicketRow>>(key, {
          ...previous,
          rows: previous.rows.filter((row) => row.id !== id),
        });
      });

      return { queries };
    },

    onError: (_err, _id, context) => {
      context?.queries.forEach(([key, previous]) => {
        queryClient.setQueryData(key, previous);
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [tableConstantKey],
      });
    },
  });
};
