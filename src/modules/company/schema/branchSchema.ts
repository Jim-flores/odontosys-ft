import { z } from "zod";

export const branchSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  createdAt: z.string(),
});
export const branchRequestSchema = z.object({
  name: z.string().min(2).max(100),
  address: z.string().optional(),
  phone: z.string().length(9).optional(),
  companyId: z.string(),
});
export type BranchSchema = z.infer<typeof branchSchema>;
export type BranchRequestSchema = z.infer<typeof branchRequestSchema>;
