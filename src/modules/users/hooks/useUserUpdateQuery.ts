import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormDTO } from "../interfaces/types";
import UsersServices from "../services/users.service";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { userConstantKey } from "../constants/userConstants";

interface UpdateProps {
  id: string;
  data: UserFormDTO;
}

export const useUserUpdateQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: UpdateProps) => UsersServices.update(id, data),

    onMutate: async (updateRow) => {
      await queryClient.cancelQueries({
        queryKey: [userConstantKey],
      });

      const queries = queryClient.getQueriesData<
        PaginationResponse<UserFormDTO>
      >({
        queryKey: [userConstantKey],
      });

      queries.forEach(([key, previous]) => {
        if (!previous) return;
        queryClient.setQueryData<PaginationResponse<UserFormDTO>>(key, {
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
        queryKey: [userConstantKey],
      });
    },
  });
};
