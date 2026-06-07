import { z } from "zod";
import {
  CustumerRequestSchema,
  CustumerResponseSchema,
  CustumerStatus,
} from "../constants/custumerSchema";
import { clientSchema } from "../constants/custumerInfoSchema";
import { antecedentSchema } from "../constants/antecendetSchema";
import { odontogramSchema } from "../constants/odontogramSchema";

export type CustumerDTO = z.infer<typeof CustumerResponseSchema>;
export type CustumerStatusEnum = z.infer<typeof CustumerStatus>;
export type CustumerRequestDTO = z.infer<typeof CustumerRequestSchema>;

// Informacion del cliente para las tabs
export type CustumerInfoDTO = {
  information: z.infer<typeof clientSchema>;
  antecedents: z.infer<typeof antecedentSchema>;
  odontogram: z.infer<typeof odontogramSchema>;
};

export type ClientDTO = z.infer<typeof clientSchema>;
export type AntecedentDTO = z.infer<typeof antecedentSchema>;
export type OdontogramDTO = z.infer<typeof odontogramSchema>;

export type ClientRequestDTO = Partial<Omit<ClientDTO, "id">>;
export type AntecedentRequestDTO = Partial<Omit<AntecedentDTO, "id">>;
export type OdontogramRequestDTO = Partial<Omit<OdontogramDTO, "id">>;
