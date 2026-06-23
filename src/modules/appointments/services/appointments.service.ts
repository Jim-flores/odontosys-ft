import { FetchDataParams, FilterConfig } from "@/hooks/useServerTable";
import { PaginationResponse } from "@/interfaces/PaginationType";
import { apiClient } from "@/utils/apiClient";
import { buildApiParams } from "@/utils/apiUtils";
import { paginationMap } from "@/utils/paginationMap";
import { toast } from "sonner";
import {
  Appointment,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "../interfaces/types";

class AppointmentsServices {
  static appointmentsTableFilterConfig: FilterConfig[] = [
    { columnId: "Citas", param: "search", type: "string" },
    { columnId: "Estado", param: "status", type: "array" },
    { columnId: "Tipo", param: "appointmentType", type: "array" },
  ];

  static getAll = async (
    params: FetchDataParams,
  ): Promise<PaginationResponse<Appointment>> => {
    const apiParams = buildApiParams(
      params,
      AppointmentsServices.appointmentsTableFilterConfig,
    );
    const { data } = await apiClient.get<PaginationResponse<Appointment>>(
      "/appointments",
      {
        params: apiParams,
      },
    );

    return paginationMap(data, (appointment) => ({
      ...appointment,
      title: appointment.title || "",
      notes: appointment.notes || "",
    }));
  };

  static create = async (values: CreateAppointmentInput) => {
    const { data, message } = await apiClient.post("/appointments", values);
    toast.success(message);
    return data;
  };

  static update = async (
    id: string,
    values: UpdateAppointmentInput,
    alert: boolean = true,
  ) => {
    const { data, message } = await apiClient.patch(
      `/appointments/${id}`,
      values,
    );
    if (alert) toast.success(message);
    return data;
  };

  static remove = async (id: string) => {
    const { message } = await apiClient.delete(`/appointments/${id}`);
    toast.success(message);
  };
}

export default AppointmentsServices;
