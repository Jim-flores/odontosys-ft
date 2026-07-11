import { PaginationResponse } from "@/interfaces/PaginationType";
import { TreatmentDTO, TreatmentRequestDTO } from "../interfaces/types";
import { apiClient } from "@/utils/apiClient";
import { paginationMap } from "@/utils/paginationMap";
import { toast } from "sonner";

class TreatmentService {
  static getTreatments = async (
    userId: string,
    clientId: string,
  ): Promise<PaginationResponse<TreatmentDTO[]>> => {
    const { data } = await apiClient.get<PaginationResponse<TreatmentDTO[]>>(
      `/treatments`,
      {
        params: {
          userId,
          clientId,
        },
      },
    );
    return paginationMap(data, (treatment) => ({
      ...treatment,
    }));
  };

  static create = async (values: TreatmentRequestDTO) => {
    const { data, message } = await apiClient.post(`/treatments`, values);
    toast.success(message);
    return data;
  };

  static update = async (id: string, values: TreatmentRequestDTO) => {
    const { data, message } = await apiClient.patch(
      `/treatments/${id}`,
      values,
    );
    toast.success(message);
    return data;
  };

  static remove = async (id: string, userId: string, clientId: string) => {
    const { message } = await apiClient.delete(`/treatments/${id}`, {
      params: {
        userId,
        clientId,
      },
    });
    toast.success(message);
  };
}
export default TreatmentService;
