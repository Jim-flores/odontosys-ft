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
import { useCompanyStore } from "@/store/useCompanyStore";
import { FormWrapper } from "@/components/customFormFields/FormWrapper";

interface BranchFormProps {
  data?: BranchSchema;
}

export const BranchForm = ({ data }: BranchFormProps) => {
  const { mutate: createBranch, isPending: isCreating } =
    useBranchCreateQuery();
  const { mutate: updateBranch, isPending: isUpdating } =
    useBranchUpdateQuery();
  const { company } = useCompanyStore();
  console.log(company.id);
  const form = useForm<BranchRequestSchema>({
    resolver: zodResolver(branchRequestSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      companyId: company.id,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        address: data.address || "",
        phone: data.phone || "",
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
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      className="space-y-4"
      onError={(err) => console.log(err)}
    >
      <InputFx<BranchRequestSchema>
        name="name"
        label="Nombre"
        placeholder="Nombre de la sucursal"
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
        onInput={(e) => {
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
        }}
        maxLength={9}
      />

      <Button type="submit" disabled={isCreating || isUpdating}>
        {isCreating || isUpdating ? "Guardando..." : "Guardar"}
      </Button>
    </FormWrapper>
  );
};
