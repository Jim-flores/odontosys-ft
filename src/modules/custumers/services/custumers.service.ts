import { PaginationResponse } from "@/interfaces/PaginationType";
import { paginationMap } from "@/utils/paginationMap";
import { CustumerDTO, CustumerRequestDTO } from "../interfaces/types";
import { toast } from "sonner";
import { FetchDataParams, FilterConfig } from "@/hooks/useServerTable";
import { buildApiParams } from "@/utils/apiUtils";
import { apiClient } from "@/utils/apiClient";

class CustumersServices {
  static custumersTableFilterConfig: FilterConfig[] = [
    { columnId: "Clientes", param: "search", type: "string" },
    { columnId: "Estado", param: "status", type: "array" },
  ];

  static getAll = async (
    params: FetchDataParams,
  ): Promise<PaginationResponse<CustumerDTO>> => {
    const apiParams = buildApiParams(
      params,
      CustumersServices.custumersTableFilterConfig,
    );
    const { data } = await apiClient.get<PaginationResponse<CustumerDTO>>(
      `/clients`,
      {
        params: apiParams,
      },
    );
    return paginationMap(data, (custumer) => ({
      ...custumer,
      currentAddress: custumer.currentAddress || "",
    }));
  };

  static create = async (values: CustumerRequestDTO) => {
    const { data, message } = await apiClient.post(`/clients`, values);
    toast.success(message);
    return data;
  };

  static update = async (id: string, values: CustumerDTO) => {
    const { data, message } = await apiClient.patch(`/clients/${id}`, values);
    toast.success(message);
    return data;
  };

  static remove = async (id: string) => {
    const { message } = await apiClient.delete(`/clients/${id}`);
    toast.success(message);
  };
}

export default CustumersServices;
