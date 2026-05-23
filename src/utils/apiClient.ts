import api from "@/api/api";
import { SuccessResponse } from "@/interfaces/SuccesType";

export const apiClient = {
  get: async <T>(url: string, config = {}): Promise<SuccessResponse<T>> => {
    return api.get(url, config);
  },

  post: async <T>(
    url: string,
    body?: unknown,
    config = {},
  ): Promise<SuccessResponse<T>> => {
    return api.post(url, body, config);
  },

  put: async <T>(
    url: string,
    body?: unknown,
    config = {},
  ): Promise<SuccessResponse<T>> => {
    return api.put(url, body, config);
  },

  patch: async <T>(
    url: string,
    body?: unknown,
    config = {},
  ): Promise<SuccessResponse<T>> => {
    return api.patch(url, body, config);
  },

  delete: async <T>(url: string, config = {}): Promise<SuccessResponse<T>> => {
    return api.delete(url, config);
  },
};
