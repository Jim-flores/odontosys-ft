import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { treatmentConstantKey } from "../constants/treatmentConstants";
import TreatmentService from "../services/treatment.service";
import { TreatmentRequestDTO } from "../interfaces/types";

export const useTreatmentQuery = (userId: string, clientId: string) => {
  return useQuery({
    queryKey: [treatmentConstantKey, userId, clientId],
    queryFn: () => TreatmentService.getTreatments(userId, clientId),
    enabled: Boolean(userId && clientId),
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
};

export const useCreateTreatmentQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TreatmentRequestDTO) =>
      TreatmentService.create(values),
    onSuccess: (_, values) => {
      queryClient.invalidateQueries({
        queryKey: [treatmentConstantKey, values.userId, values.clientId],
      });
    },
  });
};

export const useUpdateTreatmentQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: TreatmentRequestDTO }) =>
      TreatmentService.update(id, values),
    onSuccess: (_, { values }) => {
      queryClient.invalidateQueries({
        queryKey: [treatmentConstantKey, values.userId, values.clientId],
      });
    },
  });
};

export const useDeleteTreatmentQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      userId,
      clientId,
    }: {
      id: string;
      userId: string;
      clientId: string;
    }) => TreatmentService.remove(id, userId, clientId),
    onSuccess: (_, { userId, clientId }) => {
      queryClient.invalidateQueries({
        queryKey: [treatmentConstantKey, userId, clientId],
      });
    },
  });
};
