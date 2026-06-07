import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import InputFx from "@/components/customFormFields/InputFx";
import SelectFx from "@/components/customFormFields/SelectFx";
import TextAreaFx from "@/components/customFormFields/TextAreaFx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateCustumerInformationQuery } from "../../hooks/useCustumerInfoQuery";
import { ClientDTO, ClientRequestDTO } from "../../interfaces/types";
import {
  Briefcase,
  Church,
  Clock3,
  GraduationCap,
  Home,
  HouseIcon,
  IdCard,
  LetterTextIcon,
  LucideLetterText,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { UnsavedChangesBar } from "@/components/ui/unsaved-changes-bar";
import { clientSchema } from "../../constants/custumerInfoSchema";
import { formatBirthdate } from "@/utils/dayjsSpanish";

interface Props {
  data?: ClientDTO;
}

const genderOptions = [
  { label: "Masculino", value: "MALE" },
  { label: "Femenino", value: "FEMALE" },
  { label: "Otro", value: "OTHER" },
] as const;

const statusOptions = [
  { label: "Activo", value: "ACTIVE" },
  { label: "Inactivo", value: "INACTIVE" },
] as const;

const buildDefaultValues = (data?: ClientRequestDTO) => ({
  name: data?.name ?? "",
  lastName: data?.lastName ?? "",
  status: data?.status ?? "ACTIVE",
  dni: data?.dni ?? "",
  gender: data?.gender ?? null,
  phone: data?.phone ?? "",
  email: data?.email ?? "",
  currentAddress: data?.currentAddress ?? "",
  birthDate: formatBirthdate(data?.birthDate) ?? "",
  birthPlace: data?.birthPlace ?? "",
  religion: data?.religion ?? "",
  maritalStatus: data?.maritalStatus ?? "",
  occupation: data?.occupation ?? "",
  grade: data?.grade ?? "",
  age: data?.age ?? null,
  dep: data?.dep ?? "",
  prov: data?.prov ?? "",
  city: data?.city ?? "",
  chiefComplaint: data?.chiefComplaint ?? "",
  branchId: data?.branchId ?? "",
  userId: data?.userId ?? null,
});
const Information = ({ data }: Props) => {
  const { mutate } = useUpdateCustumerInformationQuery();
  const form = useForm<ClientRequestDTO>({
    resolver: zodResolver(clientSchema.omit({ id: true }).partial()),
    defaultValues: buildDefaultValues(data),
  });

  const onSubmit = (values: ClientRequestDTO) => {
    if (!data?.id) return;
    mutate(
      {
        id: data.id,
        data: values,
      },
      {
        onSuccess: () => {
          form.reset(buildDefaultValues(values));
        },
      },
    );
  };
  const handleSave = () => {
    form.handleSubmit(onSubmit)();
  };
  const handleDiscard = () => {
    form.reset(buildDefaultValues(data));
  };
  return (
    <FormWrapper form={form} onSubmit={onSubmit} className="w-full px-2">
      <div className="grid gap-4 md:grid-cols-3">
        <InputFx
          name="dni"
          label="DNI"
          placeholder="70000000"
          maxLength={8}
          onInput={(event) => {
            event.currentTarget.value = event.currentTarget.value.replace(
              /[^0-9]/g,
              "",
            );
          }}
          icon={<IdCard />}
        />
        <InputFx
          name="name"
          label="Nombre"
          placeholder="Nombre"
          icon={<LetterTextIcon />}
        />
        <InputFx
          name="lastName"
          label="Apellido"
          placeholder="Apellido"
          icon={<LucideLetterText />}
        />

        <InputFx
          name="phone"
          label="Telefono"
          placeholder="987654321"
          onInput={(event) => {
            event.currentTarget.value = event.currentTarget.value.replace(
              /[^0-9]/g,
              "",
            );
          }}
          icon={<Phone />}
        />
        <InputFx
          name="email"
          type="email"
          label="Correo"
          placeholder="paciente@example.com"
          icon={<Mail />}
        />
        <InputFx
          name="currentAddress"
          label="Direccion actual"
          icon={<Home />}
        />

        <SelectFx
          name="gender"
          label="Genero"
          options={[...genderOptions]}
          getLabel={(option) => option.label}
          getValue={(option) => option.value}
        />
        <SelectFx
          name="status"
          label="Estado"
          options={[...statusOptions]}
          getLabel={(option) => option.label}
          getValue={(option) => option.value}
        />

        <InputFx name="birthDate" type="date" label="Fecha de nacimiento" />
        <InputFx
          name="age"
          type="number"
          label="Edad"
          min={1}
          icon={<Clock3 />}
        />
        <InputFx
          name="birthPlace"
          label="Lugar de nacimiento"
          icon={<HouseIcon />}
        />

        <InputFx name="religion" label="Religion" icon={<Church />} />
        <InputFx name="maritalStatus" label="Estado civil" icon={<Users />} />
        <InputFx name="occupation" label="Ocupacion" icon={<Briefcase />} />
        <InputFx name="grade" label="Grado" icon={<GraduationCap />} />
        <InputFx name="dep" label="Departamento" />
        <InputFx name="prov" label="Provincia" />
        <InputFx name="city" label="Ciudad" />
      </div>
      <TextAreaFx
        name="chiefComplaint"
        label="Motivo de consulta"
        placeholder="Describe el motivo de consulta"
      />
      <UnsavedChangesBar
        visible={form.formState.isDirty}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </FormWrapper>
  );
};

export default Information;
