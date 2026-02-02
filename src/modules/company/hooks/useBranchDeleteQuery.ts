import { useMutation, useQueryClient } from "@tanstack/react-query";
import BranchService from "../services/BranchService";
import { branchConstantKey } from "../constants/branchConstants";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { BranchSchema } from "../schema/branchSchema";

export const useBranchDeleteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BranchService.remove(id),

    onMutate: async (id) => {
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
        queryClient.setQueryData<PaginationResponse<BranchSchema>>(key, {
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
        queryKey: [branchConstantKey],
      });
    },
  });
};
