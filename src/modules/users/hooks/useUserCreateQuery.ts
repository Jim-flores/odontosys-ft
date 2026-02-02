import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRequestDTO } from "../interfaces/types";
import UsersServices from "../services/users.service";
import { userConstantKey } from "../constants/userConstants";

export const useUserCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserRequestDTO) => {
      return UsersServices.create(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userConstantKey],
      });
    },
  });
};
