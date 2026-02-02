import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BranchRequestSchema, BranchSchema } from "../schema/branchSchema";
import BranchService from "../services/BranchService";
import { branchConstantKey } from "../constants/branchConstants";
import { PaginationResponse } from "@/interfaces/PaginationType";

interface UpdateProps {
  id: string;
  data: BranchRequestSchema;
}

export const useBranchUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProps) => BranchService.update(id, data),

    onMutate: async (updateRow) => {
      await queryClient.cancelQueries({
        queryKey: [branchConstantKey],
      });

      const queries = queryClient.getQueriesData<
        PaginationResponse<BranchSchema>
      >({
        queryKey: [branchConstantKey],
      });

      queries.forEach(([key, previous]) => {
        if (!previous) return;
        const newData = updateRow.data;
        queryClient.setQueryData<PaginationResponse<BranchSchema>>(key, {
          ...previous,
          rows: previous.rows.map((row) =>
            row.id === updateRow.id ? { ...row, ...newData } : row,
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
        queryKey: [branchConstantKey],
      });
    },
  });
};
