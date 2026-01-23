import { z } from "zod";

export const personalSchema = z.object({
  firstName: z.string().min(2).nonempty("El nombre es obligatorio"),
  lastName: z.string().min(2).nonempty("El apellido es obligatorio"),
  age: z.string().optional(),
});

export const documentSchema = z.object({
  documentType: z.enum(["DNI", "PASSPORT"]).default("DNI").optional(),
  documentNumber: z.string().min(6).max(10).nonempty("El campo es obligatorio"),
  gender: z.enum(["Hombre", "Mujer"]).optional(),
});

export const addressSchema = z.object({
  street: z.string().min(3).optional(),
  city: z.string().nonempty("La ciudad es obligatoria"),
  country: z.string().nonempty("El pais es obligatorio"),
});

export const formSchema = z.object({
  personal: personalSchema,
  document: documentSchema,
  address: addressSchema,
});

export type FormSchema = z.infer<typeof formSchema>;

export const defaultValues: FormSchema = {
  personal: { firstName: "", lastName: "", age: "" },
  document: { documentType: "DNI", documentNumber: "", gender: undefined },
  address: { street: "", city: "", country: "" },
};
