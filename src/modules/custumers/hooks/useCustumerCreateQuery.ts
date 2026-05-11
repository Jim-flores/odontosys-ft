import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustumerRequestDTO } from "../interfaces/types";
import CustumersServices from "../services/custumers.service";
import { custumerConstantKey } from "../constants/custumerConstants";

export const useCustumerCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CustumerRequestDTO) => {
      return CustumersServices.create(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [custumerConstantKey],
      });
    },
  });
};
