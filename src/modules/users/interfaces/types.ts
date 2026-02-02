import { z } from "zod";
import {
  UserRequestSchema,
  UserResponseSchema,
  UserStatus,
} from "../constants/userSchema";

export type UserDTO = z.infer<typeof UserResponseSchema>;
export type UserStatusEnum = z.infer<typeof UserStatus>;
export type UserRequestDTO = z.infer<typeof UserRequestSchema>;
