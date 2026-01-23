export interface PaginationResponse<T> {
  rows: T[];
  pagination: {
    pageSize: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
