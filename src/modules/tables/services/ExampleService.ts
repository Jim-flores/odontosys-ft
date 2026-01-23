import { FetchDataParams, FilterConfig } from "@/hooks/useServerTable";
import dataExample from "../data/dataExample.json";
import { TicketResponse, TicketRow } from "../interfaces/types";
// const FAKE_DB = [...dataExample.rows];
let FAKE_DB: TicketRow[] = [...dataExample.rows];
const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));
class ExampleService {
  static contactTableFilterConfigs: FilterConfig[] = [
    { columnId: "client", param: "search", type: "string" },
    { columnId: "status", param: "statusGroup", type: "array" },
  ];
  static getAll = async (params: FetchDataParams): Promise<TicketResponse> => {
    await delay();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getFilterValue = (filters: any[], id: string): any => {
      return filters.find((f) => f.id === id)?.value;
    };
    // const apiParams = buildApiParams(
    //   params,
    //   ExampleService.contactTableFilterConfigs
    // );
    // 🟢 pagination
    const pageIndex = params.pagination?.pageIndex ?? 0;
    const pageSize = params.pagination?.pageSize ?? 10;

    // backend-style
    const page = pageIndex + 1;

    // 🟢 filters
    const search = getFilterValue(params.filters, "client") ?? "";
    const statusGroup = getFilterValue(params.filters, "status") ?? [];

    let rows = [...FAKE_DB];

    // 🔍 filter: search
    if (search) {
      console.log({ search });
      rows = rows.filter((row) =>
        row.client.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // 🔍 filter: status
    if (statusGroup?.length) {
      rows = rows.filter((row) => statusGroup.includes(row.status));
    }

    const total = rows.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedRows = rows.slice(start, end);

    return {
      rows: paginatedRows,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
      statusCount: ExampleService.getStatusCount(FAKE_DB),
    };
  };

  static create = async (data: TicketRow) => {
    await delay();
    FAKE_DB.unshift(data);
    return data;
  };
  // id, ticketCode, clientId, createdAt
  static update = async (
    id: string,
    data: Omit<TicketRow, "id" | "createdAt" | "clientId" | "ticketCode">,
  ) => {
    await delay();
    const oldData = FAKE_DB.find((row) => row.id === id);
    if (!oldData) return null;
    const newData = { ...oldData, ...data };
    console.log({ newData });
    FAKE_DB = FAKE_DB.map((row) => (row.id === id ? newData : row));
    return data;
  };

  static delete = async (id: string) => {
    await delay();
    FAKE_DB = FAKE_DB.filter((row) => row.id !== id);
    return id;
  };

  static getStatusCount(rows: TicketRow[]) {
    return rows.reduce((acc, row) => {
      //@ts-expect-error any
      acc[row.status] = (acc[row.status] || 0) + 1;
      return acc;
    }, {});
  }
}
export default ExampleService;
