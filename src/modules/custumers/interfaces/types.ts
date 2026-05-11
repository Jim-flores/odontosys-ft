import { z } from "zod";
import {
  CustumerRequestSchema,
  CustumerResponseSchema,
  CustumerStatus,
} from "../constants/custumerSchema";

export type CustumerDTO = z.infer<typeof CustumerResponseSchema>;
export type CustumerStatusEnum = z.infer<typeof CustumerStatus>;
export type CustumerRequestDTO = z.infer<typeof CustumerRequestSchema>;
