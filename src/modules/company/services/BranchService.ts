import { PaginationResponse } from "@/interfaces/PaginationType";
import { paginationMap } from "@/utils/paginationMap";
import { BranchSchema, BranchRequestSchema } from "../schema/branchSchema";
import { toast } from "sonner";
import { FetchDataParams, FilterConfig } from "@/hooks/useServerTable";
import { buildApiParams } from "@/utils/apiUtils";
import { getBranches } from "@/store/useBranchStore";
import { apiClient } from "@/utils/apiClient";

class BranchService {
  static branchTableFilterConfig: FilterConfig[] = [
    { columnId: "name", param: "search", type: "string" },
  ];
  static getAll = async (
    params: FetchDataParams,
  ): Promise<PaginationResponse<BranchSchema>> => {
    const apiParams = buildApiParams(
      params,
      BranchService.branchTableFilterConfig,
    );
    const { data } = await apiClient.get<PaginationResponse<BranchSchema>>(
      `/branches/list`,
      {
        params: apiParams,
      },
    );
    return paginationMap(data, (branch) => ({
      id: branch.id,
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      createdAt: branch.createdAt,
    }));
  };

  static create = async (values: BranchRequestSchema) => {
    const { data } = await apiClient.post(`/branches`, values);
    toast.success("Sucursal creada exitosamente");
    getBranches();
    return data;
  };

  static update = async (id: string, values: BranchRequestSchema) => {
    const { data } = await apiClient.patch(`/branches/${id}`, values);
    toast.success("Sucursal actualizada exitosamente");
    getBranches();
    return data;
  };

  static remove = async (id: string) => {
    const { data } = await apiClient.delete(`/branches/${id}`);
    toast.success("Sucursal eliminada exitosamente");
    getBranches();
    return data;
  };
}
export default BranchService;
