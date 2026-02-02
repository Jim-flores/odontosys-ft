import { API_URL } from "@/api/api";
import { io } from "socket.io-client";

export const socket = io(API_URL, {
  autoConnect: false,
});
