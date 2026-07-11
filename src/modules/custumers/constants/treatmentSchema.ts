import z from "zod";

export const PaymentStatus = z.enum(["PENDING", "PAID", "PARTIAL"]);
export const PaymentMethod = z.enum(["CASH", "CARD", "TRANSFER"]);

export const TreatmentResponseSchema = z.object({
  id: z.string(),
  notes: z.string(),
  price: z.number().min(0).max(999999.99),
  paid: z.number().min(0).max(999999.99),
  balance: z.number().min(0).max(999999.99),
  paymentStatus: PaymentStatus,
  paymentMethod: PaymentMethod,
  clientId: z.string(),
  userId: z.string(),
  createdAt: z.string(),
});

export const TreatmentRequestSchema = z.object({
  notes: z.string().min(2, "El campo es obligatorio"),
  price: z
    .number()
    .min(0, "El precio debe ser mayor o igual a 0")
    .max(999999.99, "El precio no puede ser mayor a 999999.99"),
  paid: z
    .number()
    .min(0, "El pago debe ser mayor o igual a 0")
    .max(999999.99, "El pago no puede ser mayor a 9999.99"),
  balance: z
    .number()
    .min(0, "El saldo debe ser mayor o igual a 0")
    .max(999999.99, "El saldo no puede ser mayor a 9999.99"),
  paymentStatus: PaymentStatus,
  paymentMethod: PaymentMethod,
  clientId: z.string(),
  userId: z.string(),
});
