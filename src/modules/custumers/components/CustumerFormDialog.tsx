import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import { useBranchStore } from "@/store/useBranchStore";
import { useProfileStore } from "@/store/useProfileStore";
import { useForm } from "react-hook-form";
import { CustumerRequestDTO } from "../interfaces/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustumerRequestSchema } from "../constants/custumerSchema";
import { defaultCustumerAddValues } from "../constants/custumerConstants";
import InputFx from "@/components/customFormFields/InputFx";
import SelectFx from "@/components/customFormFields/SelectFx";
import { Button } from "@/components/ui/button";
import { useCustumerQuery } from "../hooks/useCustumerQuery";
import { useDialogStore } from "@/store/useDialogStore";

export const CustumerFormDialog = () => {
  const { branch } = useBranchStore();
  const { closeDialog } = useDialogStore();
  const { create } = useCustumerQuery();
  const { id: profileId } = useProfileStore();

  const addForm = useForm<CustumerRequestDTO>({
    resolver: zodResolver(CustumerRequestSchema),
    defaultValues: {
      ...defaultCustumerAddValues,
      userId: profileId,
      status: "ACTIVE",
    },
  });

  const onSubmitAdd = async (values: CustumerRequestDTO) => {
    create.mutate(values);
    closeDialog();
  };

  return (
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
        <InputFx name="currentAddress" label="Dirección" />
      </div>
      {/* <div className="row-space">
        <InputFx name="notes" label="Notas" />
      </div> */}
      <div className="row-space">
        <SelectFx
          name="branchId"
          label="Sucursal"
          options={branch}
          getLabel={(e) => e.name}
          getValue={(e) => e.id}
        />
        <SelectFx
          name="gender"
          label="Género"
          options={[
            { id: "1", name: "Masculino", value: "MALE" },
            { id: "2", name: "Femenino", value: "FEMALE" },
          ]}
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
