import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import { useBranchStore } from "@/store/useBranchStore";
import { useProfileStore } from "@/store/useProfileStore";
import { useForm } from "react-hook-form";
import { CustumerDTO, CustumerRequestDTO } from "../interfaces/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustumerRequestSchema,
  CustumerResponseSchema,
} from "../constants/custumerSchema";
import {
  defaultCustumerAddValues,
  CustumerStatusOptions,
} from "../constants/custumerConstants";
import InputFx from "@/components/customFormFields/InputFx";
import SelectFx from "@/components/customFormFields/SelectFx";
import { Button } from "@/components/ui/button";
import { useCustumerQuery } from "../hooks/useCustumerQuery";
import { useDialogStore } from "@/store/useDialogStore";
import { useEffect } from "react";

interface Props {
  data?: CustumerDTO;
}

export const CustumerFormDialog = ({ data }: Props) => {
  const { branch } = useBranchStore();
  const { closeDialog } = useDialogStore();
  const { create, update } = useCustumerQuery();
  const { id: profileId } = useProfileStore();

  const addForm = useForm<CustumerRequestDTO>({
    resolver: zodResolver(CustumerRequestSchema),
    defaultValues: {
      ...defaultCustumerAddValues,
      userId: profileId,
    },
  });

  const editForm = useForm<CustumerDTO>({
    resolver: zodResolver(CustumerResponseSchema),
    defaultValues: {
      ...data,
      userId: data?.userId || profileId,
    },
  });

  useEffect(() => {
    if (!profileId) return;
    addForm.setValue("userId", profileId);
    if (!data?.id) return;
    editForm.reset({
      ...data,
      userId: data.userId || profileId,
    });
  }, [profileId, data]);

  const onSubmitAdd = async (values: CustumerRequestDTO) => {
    create.mutate(values);
    closeDialog();
  };

  const onSubmitEdit = async (values: CustumerDTO) => {
    if (!data?.id) return;
    update.mutate({ id: data.id, data: values });
    closeDialog();
  };

  return data?.id ? (
    <FormWrapper form={editForm} onSubmit={onSubmitEdit}>
      <div className="row-space">
        <InputFx name="name" label="Nombre" placeholder="Nombre" />
        <InputFx name="lastName" label="Apellido" placeholder="Apellido" />
      </div>
      <div className="row-space">
        <InputFx name="dni" label="Dni" placeholder="70000000" />
        <InputFx name="phone" label="Telefono" />
      </div>
      <div className="row-space">
        <InputFx name="email" label="Correo" placeholder="abc@example.com" />
        <InputFx name="address" label="Dirección" />
      </div>
      <div className="row-space">
        <InputFx name="notes" label="Notas" />
      </div>
      <div className="row-space">
        <SelectFx
          name="branchId"
          label="Sucursal"
          options={branch}
          getLabel={(e) => e.name}
          getValue={(e) => e.id}
        />
        <SelectFx
          name="status"
          label="Estado"
          options={CustumerStatusOptions}
          getLabel={(e) => e.name}
          getValue={(e) => e.value}
        />
      </div>
      <Button className="w-24" type="submit">
        Guardar
      </Button>
    </FormWrapper>
  ) : (
    <FormWrapper form={addForm} onSubmit={onSubmitAdd} className="column-space">
      <div className="row-space">
        <InputFx name="name" label="Nombre" placeholder="Nombre" />
        <InputFx name="lastName" label="Apellido" placeholder="Apellido" />
      </div>
      <div className="row-space">
        <InputFx name="dni" label="Dni" placeholder="70000000" />
        <InputFx name="phone" label="Telefono" />
      </div>
      <div className="row-space">
        <InputFx name="email" label="Correo" placeholder="abc@example.com" />
        <InputFx name="address" label="Dirección" />
      </div>
      <div className="row-space">
        <InputFx name="notes" label="Notas" />
      </div>
      <div className="row-space">
        <SelectFx
          name="branchId"
          label="Sucursal"
          options={branch}
          getLabel={(e) => e.name}
          getValue={(e) => e.id}
        />
        <SelectFx
          name="status"
          label="Estado"
          options={CustumerStatusOptions}
          getLabel={(e) => e.name}
          getValue={(e) => e.value}
        />
      </div>
      <Button className="w-24" type="submit">
        Guardar
      </Button>
    </FormWrapper>
  );
};
