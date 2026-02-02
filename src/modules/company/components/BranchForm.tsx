import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  BranchRequestSchema,
  branchRequestSchema,
  BranchSchema,
} from "../schema/branchSchema";
import InputFx from "@/components/customFormFields/InputFx";
import { useBranchCreateQuery } from "../hooks/useBranchCreateQuery";
import { useBranchUpdateQuery } from "../hooks/useBranchUpdateQuery";
import { useEffect } from "react";

interface BranchFormProps {
  data?: BranchSchema;
}

export const BranchForm = ({ data }: BranchFormProps) => {
  const { mutate: createBranch, isPending: isCreating } =
    useBranchCreateQuery();
  const { mutate: updateBranch, isPending: isUpdating } =
    useBranchUpdateQuery();

  const form = useForm<BranchRequestSchema>({
    resolver: zodResolver(branchRequestSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        address: data.address || "",
        phone: data.phone || "",
      });
    } else {
      form.reset({
        name: "",
        address: "",
        phone: "",
      });
    }
  }, [data, form]);

  const onSubmit = (values: BranchRequestSchema) => {
    if (data) {
      updateBranch({ id: data.id, data: values });
    } else {
      createBranch(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputFx<BranchRequestSchema>
          name="name"
          label="Nombre"
          placeholder="Nombre de la sucursal"
          required
        />
        <InputFx<BranchRequestSchema>
          name="address"
          label="Dirección"
          placeholder="Dirección de la sucursal"
        />
        <InputFx<BranchRequestSchema>
          name="phone"
          label="Teléfono"
          placeholder="Teléfono de la sucursal"
        />

        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </Form>
  );
};
