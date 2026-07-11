import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import InputFx from "@/components/customFormFields/InputFx";
import SelectFx from "@/components/customFormFields/SelectFx";
import TextAreaFx from "@/components/customFormFields/TextAreaFx";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "@/store/useDialogStore";
import { useProfileStore } from "@/store/useProfileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  appointmentStatus,
  appointmentTypes,
  defaultAppointmentAddValues,
} from "../constants/appointmentConstant";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../constants/appointmentSchema";
import {
  Appointment,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "../interfaces/types";
import { useAppointmentQuery } from "../hooks/useAppointmentQuery";
import CustumersServices from "@/modules/custumers/services/custumers.service";
// import { useEffect } from "react";
import { formatCalendarUtc } from "@/utils/dayjsSpanish";

interface Props {
  data?: Appointment;
}

const listParams = {
  pagination: { pageIndex: 0, pageSize: 100 },
  filters: [],
  sorting: [],
};

const toIsoDateTime = (value?: string) => {
  if (!value) return "";
  return new Date(value).toISOString();
};

export const AppointmentFormDialog = ({ data }: Props) => {
  const { closeDialog } = useDialogStore();
  const { id: profileId, branches } = useProfileStore();
  const { create, update } = useAppointmentQuery();

  const clientsQuery = useQuery({
    queryKey: ["appointment-clients-list"],
    queryFn: () => CustumersServices.getAll(listParams),
  });

  const addForm = useForm<CreateAppointmentInput>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      ...defaultAppointmentAddValues,
      startAt: data?.startAt ? formatCalendarUtc(data.startAt) : "",
      endAt: data?.endAt ? formatCalendarUtc(data.endAt) : "",
      branches: branches.map((b) => b.id),
      userId: profileId,
    },
  });

  const editForm = useForm<UpdateAppointmentInput>({
    resolver: zodResolver(updateAppointmentSchema),
    defaultValues: {
      appointmentType: data?.appointmentType,
      status: data?.status,
      title: data?.title || "",
      notes: data?.notes || "",
      startAt: formatCalendarUtc(data?.startAt),
      endAt: formatCalendarUtc(data?.endAt),
      clientId: data?.clientId,
    },
  });

  const onSubmitAdd = (values: CreateAppointmentInput) => {
    create.mutate({
      ...values,
      startAt: toIsoDateTime(values.startAt),
      endAt: toIsoDateTime(values.endAt),
    });
    closeDialog();
  };

  const onSubmitEdit = (values: UpdateAppointmentInput) => {
    if (!data) return;
    update.mutate({
      id: data.id,
      data: {
        ...values,
        startAt: values.startAt ? toIsoDateTime(values.startAt) : undefined,
        endAt: values.endAt ? toIsoDateTime(values.endAt) : undefined,
      },
    });
    closeDialog();
  };

  const clients = clientsQuery.data?.rows ?? [];
  // const users = usersQuery.data?.rows ?? [];

  return data?.id ? (
    <FormWrapper
      form={editForm}
      onSubmit={onSubmitEdit}
      className="column-space"
    >
      <div className="row-space">
        <InputFx
          name="title"
          label="Tratamiento"
          placeholder="Consulta inicial"
        />
        <SelectFx
          name="appointmentType"
          label="Tipo"
          options={appointmentTypes}
          getLabel={(e) => e.name}
          getValue={(e) => e.value}
        />
      </div>
      <div className="row-space">
        <InputFx name="startAt" type="datetime-local" label="Inicio" />
        <InputFx name="endAt" type="datetime-local" label="Fin" />
      </div>
      <div className="row-space">
        <SelectFx
          name="clientId"
          label="Cliente"
          options={clients}
          getLabel={(e) => `${e.name} ${e.lastName}`}
          getValue={(e) => e.id}
        />
        {/* <SelectFx
          name="userId"
          label="Usuario"
          options={users}
          getLabel={(e) => `${e.name} ${e.lastName}`}
          getValue={(e) => e.id}
        /> */}
      </div>
      <div className="row-space">
        <SelectFx
          name="status"
          label="Estado"
          options={appointmentStatus}
          getLabel={(e) => e.name}
          getValue={(e) => e.value}
        />
      </div>
      <TextAreaFx name="notes" label="Notas" placeholder="Notas de la cita" />
      <Button className="w-24" type="submit">
        Guardar
      </Button>
    </FormWrapper>
  ) : (
    <FormWrapper form={addForm} onSubmit={onSubmitAdd} className="column-space">
      <div className="row-space">
        <InputFx
          name="title"
          label="Tratamiento"
          placeholder="Consulta inicial"
        />
        <SelectFx
          name="appointmentType"
          label="Tipo"
          options={appointmentTypes}
          getLabel={(e) => e.name}
          getValue={(e) => e.value}
        />
      </div>
      <div className="row-space">
        <InputFx name="startAt" type="datetime-local" label="Inicio" />
        <InputFx name="endAt" type="datetime-local" label="Fin" />
      </div>
      <div className="row-space">
        <SelectFx
          name="clientId"
          label="Cliente"
          options={clients}
          getLabel={(e) => `${e.name} ${e.lastName}`}
          getValue={(e) => e.id}
        />
        {/* <SelectFx
          name="userId"
          label="Usuario"
          options={users}
          getLabel={(e) => `${e.name} ${e.lastName}`}
          getValue={(e) => e.id}
        /> */}
      </div>
      <TextAreaFx name="notes" label="Notas" placeholder="Notas de la cita" />
      <Button className="w-24" type="submit">
        Guardar
      </Button>
    </FormWrapper>
  );
};
