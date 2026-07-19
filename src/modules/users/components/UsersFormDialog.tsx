import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import { useBranchStore } from "@/store/useBranchStore";
import { useForm } from "react-hook-form";
import { UserDTO, UserRequestDTO } from "../interfaces/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema, UserRequestSchema } from "../constants/userSchema";
import { defaultUserAddValues, UserStatus } from "../constants/userConstants";
import InputFx from "@/components/customFormFields/InputFx";
import SelectFx from "@/components/customFormFields/SelectFx";
import { Button } from "@/components/ui/button";
// import { MultiCheckboxFx } from "@/components/customFormFields/MultiCheckboxFx";
import { useAuthorizationStore } from "@/store/useAuthorizationStore";
import InputPasswordFx from "@/components/customFormFields/InputPasswordFx";
import { useUserQuery } from "../hooks/useUserQuery";
import { useDialogStore } from "@/store/useDialogStore";
import InputSearchDni from "@/components/customFormFields/InputSearchDni";
import ComboboxFx from "@/components/customFormFields/ComboboxFx";

interface Props {
  data?: UserDTO;
}
export const UserFormDialog = ({ data }: Props) => {
  const { branch } = useBranchStore();
  const { closeDialog } = useDialogStore();
  const { create, update } = useUserQuery();
  const { roles } = useAuthorizationStore();
  const addForm = useForm<UserRequestDTO>({
    resolver: zodResolver(UserRequestSchema),
    defaultValues: defaultUserAddValues,
  });
  console.log({ data });
  type UserForm = Omit<UserDTO, "branches"> & {
    branches: string[];
  };
  const editForm = useForm<UserForm>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      ...data,
      branches: data?.branches?.map((b) => b.id) || [],
    },
  });

  const onSubmitAdd = async (values: UserRequestDTO) => {
    create.mutate(values);
    closeDialog();
  };
  const onSubmitEdit = async (values: UserForm) => {
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
        <ComboboxFx
          name="branches"
          label="Sucursal"
          options={branch}
          getLabel={(e) => e.name}
          getValue={(e) => e.id}
        />
      </div>
      <div className="row-space">
        <SelectFx
          name="status"
          label="Estado"
          options={UserStatus}
          getLabel={(e) => e.name}
          getValue={(e) => e.value}
        />
      </div>
      <Button className="w-24" type="submit">
        Guardar
      </Button>
    </FormWrapper>
  ) : (
    <FormWrapper
      form={addForm}
      onSubmit={onSubmitAdd}
      className="column-space"
      onError={(e) => console.log(e)}
    >
      <div className="row-space">
        <InputFx name="name" label="Nombre" placeholder="Nombre" />
        <InputFx name="lastName" label="Apellido" placeholder="Apellido" />
      </div>
      <div className="row-space">
        {/* <InputFx name="dni" label="Dni" placeholder="70000000" /> */}
        <InputSearchDni
          name="dni"
          label="DNI"
          onFound={(persona) => {
            addForm.setValue("name", persona.nombres);
            addForm.setValue(
              "lastName",
              `${persona.apellidoPaterno} ${persona.apellidoMaterno}`,
            );
          }}
        />
        <InputFx name="phone" label="Telefono" />
      </div>
      <div className="row-space">
        <InputFx name="email" label="Correo" placeholder="abc@example.com" />
        <InputFx name="address" label="Dirección" />
      </div>
      <div className="row-space">
        <InputPasswordFx name="password" label="Contraseña" />
        <InputPasswordFx name="confirmPassword" label="Confirmar contraseña" />
      </div>
      <div className="row-space">
        <ComboboxFx
          name="branches"
          label="Sucursal"
          options={branch}
          placeholder="Seleccione..."
          getLabel={(e) => e.name}
          getValue={(e) => e.id}
        />
        <SelectFx
          name="roles"
          label="Rol"
          options={roles}
          getLabel={(e) => e.name}
          getValue={(e) => e.id}
        />
      </div>

      <Button className="w-24" type="submit">
        Guardar
      </Button>
    </FormWrapper>
  );
};
