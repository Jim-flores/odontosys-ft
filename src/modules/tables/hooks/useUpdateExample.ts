import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TicketRow } from "../interfaces/types";
import { tableConstantKey } from "../constants/tableConstants";
import { PaginationResponse } from "@/interfaces/PaginationType";
import ExampleService from "../services/ExampleService";

export const useUpdateExampleRow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<TicketRow, "id" | "createdAt" | "clientId" | "ticketCode">;
    }) => ExampleService.update(id, data),

    onMutate: async (updatedRow) => {
      await queryClient.cancelQueries({
        queryKey: [tableConstantKey],
      });

      const queries = queryClient.getQueriesData<PaginationResponse<TicketRow>>(
        {
          queryKey: [tableConstantKey],
        },
      );
      console.log({ updatedRow });
      queries.forEach(([key, previous]) => {
        if (!previous) return;
        const newData = updatedRow.data;
        queryClient.setQueryData<PaginationResponse<TicketRow>>(key, {
          ...previous,
          rows: previous.rows.map((row) =>
            row.id === updatedRow.id ? { ...row, ...newData } : row,
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
        queryKey: [tableConstantKey],
      });
    },
  });
};
