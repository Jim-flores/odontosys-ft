import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserDTO, UserRequestDTO } from "../interfaces/types";
import UsersServices from "../services/users.service";
import { userConstantKey } from "../constants/userConstants";
import { PaginationResponse } from "@/interfaces/PaginationType";

interface UpdateProps {
  id: string;
  data: UserRequestDTO;
}

export const useUserUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProps) => UsersServices.update(id, data),

    onMutate: async (updateRow) => {
      await queryClient.cancelQueries({
        queryKey: [userConstantKey],
      });

      const queries = queryClient.getQueriesData<PaginationResponse<UserDTO>>({
        queryKey: [userConstantKey],
      });

      queries.forEach(([key, previous]) => {
        if (!previous) return;
        const newData = updateRow.data;
        queryClient.setQueryData<PaginationResponse<UserDTO>>(key, {
          ...previous,
          rows: previous.rows.map((row) =>
            row.id === updateRow.id ? { ...row, newData } : row,
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
