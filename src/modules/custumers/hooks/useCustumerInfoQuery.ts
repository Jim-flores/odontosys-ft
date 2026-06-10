import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { custumerConstantKey } from "../constants/custumerConstants";
import {
  AntecedentRequestDTO,
  ClientRequestDTO,
  OdontogramRequestDTO,
} from "../interfaces/types";
import CustumerInfoService from "../services/custumerInfo.service";

const getCustumerInfoQueryKey = (id: string) =>
  [custumerConstantKey, "info", id] as const;

export const useCustumerInfoQuery = (id: string) => {
  return useQuery({
    queryKey: getCustumerInfoQueryKey(id),
    queryFn: () => CustumerInfoService.getCustumerInfo(id),
    enabled: Boolean(id),
    gcTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useUpdateCustumerInformationQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ClientRequestDTO }) =>
      CustumerInfoService.updateInformation(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: getCustumerInfoQueryKey(id),
      });
    },
  });
};

export const useUpdateCustumerAntecedentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AntecedentRequestDTO }) =>
      CustumerInfoService.updateAntecedent(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: getCustumerInfoQueryKey(id),
      });
    },
  });
};

export const useUpdateCustumerOdontogramQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: OdontogramRequestDTO }) =>
      CustumerInfoService.updateOdontogram(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: getCustumerInfoQueryKey(id),
      });
    },
  });
};
