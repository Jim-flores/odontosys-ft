import { useCustumerCreateQuery } from "./useCustumerCreateQuery";
import { useCustumerDeleteQuery } from "./useCustumerDeleteQuery";
import { useCustumerUpdateQuery } from "./useCustumerUpdateQuery";

export const useCustumerQuery = () => {
  const create = useCustumerCreateQuery();
  const update = useCustumerUpdateQuery();
  const remove = useCustumerDeleteQuery();

  return {
    create,
    update,
    delete: remove,
  };
};
