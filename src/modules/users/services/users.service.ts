import api from "@/api/api";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { paginationMap } from "@/utils/paginationMap";
import { UserDTO, UserRequestDTO } from "../interfaces/types";
import { toast } from "sonner";
import { FetchDataParams, FilterConfig } from "@/hooks/useServerTable";
import { buildApiParams } from "@/utils/apiUtils";

class UsersServices {
  static usersTableFilterConfig: FilterConfig[] = [
    { columnId: "Usuarios", param: "search", type: "string" },
    { columnId: "Estado", param: "status", type: "array" },
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
      lastName: user.lastName,
      dni: user.dni,
      phone: user.phone,
      address: user.address || "",
      email: user.email,
      status: user.status,
      createdAt: user.createdAt,
      branchId: user.branchId,
      roles: user.roles,
    }));
  };

  static create = async (values: UserRequestDTO) => {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roles, confirmPassword, ...rest } = values;
    const newData = { ...rest, roles: [roles] };
    const { data } = await api.post(`/users`, newData);
    toast.success(data);
    return data;
  };

  static update = async (id: string, values: UserDTO) => {
    const newData = {
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      dni: values.dni,
      phone: values.phone,
      address: values.address,
      status: values.status,
      branchId: values.branchId,
      roles: [values.roles],
    };
    const { data } = await api.patch(`/users/${id}`, newData);
    toast.success(data);
    return data;
  };

  static remove = async (id: string) => {
    const { data } = await api.delete(`/users/${id}`);
    toast.success(data);
  };
}
export default UsersServices;
