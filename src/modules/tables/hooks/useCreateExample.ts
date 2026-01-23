import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TicketRow } from "../interfaces/types";
import { tableConstantKey } from "../constants/tableConstants";
import { PaginationResponse } from "@/interfaces/PaginationType";
import ExampleService from "../services/ExampleService";

export const useCreateExampleRow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: Omit<TicketRow, "ticketCode" | "id" | "createdAt" | "clientId">,
    ) => {
      console.log(data);
    },

    onMutate: async (newRow) => {
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
        const newData = {
          ...newRow,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ticketCode: (previous.rows.length + 1).toString(),
          clientId: crypto.randomUUID(),
        };
        ExampleService.create(newData);
        queryClient.setQueryData<PaginationResponse<TicketRow>>(key, {
          ...previous,
          rows: [newData, ...previous.rows],
        });
      });

      return { queries };
    },

    onError: (_err, _newRow, context) => {
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
