import api from "@/api/api";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { paginationMap } from "@/utils/paginationMap";
import { CustumerDTO, CustumerRequestDTO } from "../interfaces/types";
import { toast } from "sonner";
import { FetchDataParams, FilterConfig } from "@/hooks/useServerTable";
import { buildApiParams } from "@/utils/apiUtils";

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
    const { data } = await api.get<PaginationResponse<CustumerDTO>>(
      `/clients`,
      {
        params: apiParams,
      },
    );
    return paginationMap(data, (custumer) => ({
      ...custumer,
      address: custumer.address || "",
      notes: custumer.notes || "",
    }));
  };

  static create = async (values: CustumerRequestDTO) => {
    const { data } = await api.post(`/clients`, values);
    toast.success(data);
    return data;
  };

  static update = async (id: string, values: CustumerDTO) => {
    const { data } = await api.patch(`/clients/${id}`, values);
    toast.success(data);
    return data;
  };

  static remove = async (id: string) => {
    const { data } = await api.delete(`/clients/${id}`);
    toast.success(data);
    return data;
  };
}

export default CustumersServices;
