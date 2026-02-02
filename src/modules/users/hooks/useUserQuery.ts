import { useUserCreateQuery } from "./useUserCreateQuery";
import { userUserDeletQuery } from "./useUserDeleteQuery";
import { useUserUpdateQuery } from "./useUserUpdateQuery";

export const useUserQuery = () => {
  const create = useUserCreateQuery();
  const update = useUserUpdateQuery();
  const remove = userUserDeletQuery();

  return {
    create,
    update,
    delete: remove,
  };
};
