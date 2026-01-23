import { z } from "zod";
export const exampleDefaultValues = {
  client: "",
  status: "",
  brand: "",
  model: "",
  phone: "",
};
export const exampleFormSchema = z.object({
  client: z.string().min(2, { message: "Ingrese un nombres validos" }),
  status: z.string(),
  brand: z.string().min(2, { message: "Ingrese un nombres validos" }),
  model: z.string().min(2, { message: "Ingrese un nombres validos" }),
  phone: z.string().min(8, { message: "Ingrese numero de telefono valido" }),
});

export type ExampleFormSchema = z.infer<typeof exampleFormSchema>;
