import { apiClient } from "@/utils/apiClient";
import { toast } from "sonner";
import {
  AntecedentRequestDTO,
  CustumerInfoDTO,
  ClientRequestDTO,
  OdontogramRequestDTO,
} from "../interfaces/types";

class CustumerInfoService {
  static getCustumerInfo = async (id: string) => {
    const { data } = await apiClient.get<CustumerInfoDTO>(`/clients/${id}`);
    return data;
  };

  static updateInformation = async (id: string, values: ClientRequestDTO) => {
    const { data, message } = await apiClient.patch(`/clients/${id}`, values);
    toast.success(message);
    return data;
  };

  static updateAntecedent = async (
    id: string,
    values: AntecedentRequestDTO,
  ) => {
    const { data, message } = await apiClient.patch(
      `/antecedents/${id}`,
      values,
    );
    toast.success(message);
    return data;
  };

  static updateOdontogram = async (
    id: string,
    values: OdontogramRequestDTO,
  ) => {
    const { data, message } = await apiClient.patch(
      `/odontograms/${id}`,
      values,
    );
    toast.success(message);
    return data;
  };
}

export default CustumerInfoService;
