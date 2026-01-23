export type TicketStatus =
  | "DIAGNOSIS"
  | "AWAITING"
  | "REPAIR"
  | "READY"
  | "DELIVERED"
  | "DECLINED";

export type TicketRow = {
  id: string;
  ticketCode: string;
  client: string;
  clientId: string;
  status: string;
  brand: string;
  model: string;
  phone: string;
  createdAt: string;
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type TicketResponse = {
  rows: TicketRow[];
  pagination: Pagination;
  statusCount: Partial<Record<TicketStatus, number>>;
};
