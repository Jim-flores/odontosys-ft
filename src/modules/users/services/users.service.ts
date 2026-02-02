import api from "@/api/api";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { paginationMap } from "@/utils/paginationMap";
import { UserDTO, UserRequestDTO } from "../interfaces/types";
import { toast } from "sonner";
import { FetchDataParams, FilterConfig } from "@/hooks/useServerTable";
import { buildApiParams } from "@/utils/apiUtils";

class UsersServices {
  static usersTableFilterConfig: FilterConfig[] = [
    { columnId: "name", param: "search", type: "string" },
    { columnId: "status", param: "status", type: "string" },
  ];
  static getAll = async (
    params: FetchDataParams,
  ): Promise<PaginationResponse<UserDTO>> => {
    const apiParams = buildApiParams(
      params,
      UsersServices.usersTableFilterConfig,
    );
    const { data } = await api.get<PaginationResponse<UserDTO>>(`/users`, {
      params: apiParams,
    });
    return paginationMap(data, (user) => ({
      id: user.id,
      name: user.name,
      lastName: user.name,
      dni: user.dni,
      phone: user.phone,
      address: user.address || "",
      email: user.email,
      status: user.status,
      createdAt: user.createdAt,
      branchId: user.branchId,
    }));
  };

  static create = async (values: UserRequestDTO) => {
    const { data } = await api.post(`/users`, values);
    toast.success(data);
    return data;
  };

  static update = async (
    id: string,
    values: Omit<UserRequestDTO, "password">,
  ) => {
    const { data } = await api.patch(`/users/${id}`, values);
    toast.success(data);
    return data;
  };

  static remove = async (id: string) => {
    //remove function
    console.log(id);
  };
}
export default UsersServices;
