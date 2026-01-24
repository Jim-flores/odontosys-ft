import ENV from "@/config/env";
import { ErrorResponse } from "@/interfaces/ErrorType";
import StorageAdapter from "@/storage/StorageAdapter";
import { useLoaderStore } from "@/store/useLoaderStore";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  // baseURL: ENV.API_URL + "/api",
  baseURL: ENV.API_URL,
});

let requestsCount = 0;

export const showLoader = (noLoader: boolean = false) => {
  if (!noLoader && requestsCount === 0) {
    useLoaderStore.getState().setLoading(true);
  }
  if (!noLoader) requestsCount++;
};

export const hideLoader = (noLoader: boolean = false) => {
  if (!noLoader) {
    requestsCount--;
    if (requestsCount === 0) {
      useLoaderStore.getState().setLoading(false);
    }
  }
};

api.interceptors.request.use(
  (req) => {
    showLoader(req?.noLoader);
    const token = StorageAdapter.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    hideLoader(err.config?.noLoader);
    return Promise.reject(err);
  },
);

api.interceptors.response.use(
  async (res) => {
    hideLoader(res.config?.noLoader);
    return res;
  },
  (err) => {
    hideLoader(err.config?.noLoader);
    const error = err.response.data as ErrorResponse;
    toast.error(error.error.message || "Error desconocido");
    return Promise.reject(err);
  },
);

export default api;
