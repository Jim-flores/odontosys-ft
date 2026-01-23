import { useDialogStore } from "@/store/useDialogStore";
import { useForm } from "react-hook-form";
import {
  exampleDefaultValues,
  exampleFormSchema,
  ExampleFormSchema,
} from "../constants/exampleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import InputFx from "@/components/customFormFields/InputFx";
import { Button } from "@/components/ui/button";
import { TicketRow } from "../interfaces/types";
import SelectFx from "@/components/customFormFields/SelectFx";
import { statusData } from "../constants/tableConstants";
import { useExampleQuery } from "../hooks/useExampleQuery";
interface Props {
  data?: TicketRow;
}
const ElementModal = ({ data }: Props) => {
  const { closeDialog } = useDialogStore();
  const { create, update } = useExampleQuery();
  const form = useForm<ExampleFormSchema>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues: data ? data : exampleDefaultValues,
  });

  async function onSubmit(values: ExampleFormSchema) {
    if (data) {
      update.mutate({ id: data.id, data: values });
    } else {
      create.mutate(values);
    }
    closeDialog();
  }
  return (
    <FormWrapper
      onSubmit={onSubmit}
      form={form}
      className="flex flex-col gap-3"
    >
      <InputFx
        name="client"
        label="Nombre del cliente"
        placeholder="Nombre y apellidos"
      />
      {/* <InputFx name="status" label="Estado" /> */}
      <SelectFx
        name="status"
        label="Estado"
        options={statusData}
        getLabel={(r) => r.name}
        getValue={(r) => r.value}
      />
      <InputFx name="brand" label="Marca" placeholder="####" />
      <InputFx name="model" label="Modelo" placeholder="####" />
      <InputFx name="phone" label="Telefono" placeholder="987654321" />
      <Button type="submit">{data ? "Actualizar" : "Crear"}</Button>
    </FormWrapper>
  );
};

export default ElementModal;
