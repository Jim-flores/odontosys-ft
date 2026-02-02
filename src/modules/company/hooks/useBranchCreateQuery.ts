import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BranchRequestSchema } from "../schema/branchSchema";
import BranchService from "../services/BranchService";
import { branchConstantKey } from "../constants/branchConstants";

export const useBranchCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BranchRequestSchema) => {
      return BranchService.create(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [branchConstantKey],
      });
    },
  });
};
