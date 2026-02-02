import { useMutation, useQueryClient } from "@tanstack/react-query";
import UsersServices from "../services/users.service";
import { userConstantKey } from "../constants/userConstants";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { UserDTO } from "../interfaces/types";

export const userUserDeletQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UsersServices.remove(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [userConstantKey],
      });

      const queries = queryClient.getQueriesData<PaginationResponse<UserDTO>>({
        queryKey: [userConstantKey],
      });
      queries.forEach(([key, previous]) => {
        if (!previous) return;
        queryClient.setQueryData<PaginationResponse<UserDTO>>(key, {
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
        queryKey: [userConstantKey],
      });
    },
  });
};
