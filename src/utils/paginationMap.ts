import type { PaginationResponse } from "@/interfaces/PaginationType";

export const paginationMap = <T, D>(
  data: PaginationResponse<T>,
  callback: (item: T) => D,
): PaginationResponse<D> => {
  return {
    ...data,
    rows: data.rows.map(callback),
  };
};
