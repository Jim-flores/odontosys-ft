import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import AppTable from "@/components/table/AppTable";
import AppTableColumnHeader from "@/components/table/AppTableColumnHeader";
import { AppTablePagination } from "@/components/table/AppTablePagination";
import AppTableToolbar from "@/components/table/AppTableToolBar";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { useServerTable } from "@/hooks/useServerTable";
import { cn } from "@/lib/utils";
import CustumersServices from "@/modules/custumers/services/custumers.service";
import UsersServices from "@/modules/users/services/users.service";
import { useDialogStore } from "@/store/useDialogStore";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { AppointmentFormDialog } from "../components/AppointmentFormDialog";
import {
  appointmentConstantKey,
  appointmentStatus,
  appointmentTypes,
  formatAppointmentStatus,
  formatAppointmentType,
} from "../constants/appointmentConstant";
import { useAppointmentQuery } from "../hooks/useAppointmentQuery";
import { Appointment } from "../interfaces/types";
import AppointmentsServices from "../services/appointments.service";

const listParams = {
  pagination: { pageIndex: 0, pageSize: 100 },
  filters: [],
  sorting: [],
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

const AppointmentsPage = () => {
  const { openDialog } = useDialogStore();
  const { delete: deleteMutation } = useAppointmentQuery();

  const clientsQuery = useQuery({
    queryKey: ["appointments-page-clients-list"],
    queryFn: () => CustumersServices.getAll(listParams),
  });

  const usersQuery = useQuery({
    queryKey: ["appointments-page-users-list"],
    queryFn: () => UsersServices.getAll(listParams),
  });

  const clients = clientsQuery.data?.rows ?? [];
  const users = usersQuery.data?.rows ?? [];

  const columns = useMemo<ColumnDef<Appointment>[]>(() => {
    return [
      {
        id: "Citas",
        accessorKey: "title",
        meta: {
          label: "Citas",
        },
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Citas" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">
              {row.original.title ||
                formatAppointmentType(row.original.appointmentType)}
            </Typography>
            <Typography variant="muted">
              {formatAppointmentType(row.original.appointmentType) || "N/A"}
            </Typography>
          </div>
        ),
        enableHiding: true,
      },
      {
        id: "Cliente",
        accessorKey: "clientId",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Cliente" />
        ),
        cell: ({ row }) => {
          const client = clients.find(
            (item) => item.id === row.original.clientId,
          );
          return (
            <Typography variant="small">
              {client ? `${client.name} ${client.lastName}` : "N/A"}
            </Typography>
          );
        },
        enableHiding: true,
        enableSorting: false,
      },
      {
        id: "Usuario",
        accessorKey: "userId",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Usuario" />
        ),
        cell: ({ row }) => {
          const user = users.find((item) => item.id === row.original.userId);
          return (
            <Typography variant="small">
              {user ? `${user.name} ${user.lastName}` : "N/A"}
            </Typography>
          );
        },
        enableHiding: true,
        enableSorting: false,
      },
      {
        id: "Inicio",
        accessorKey: "startAt",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Inicio" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {formatDateTime(row.original.startAt)}
          </Typography>
        ),
        enableHiding: true,
      },
      {
        id: "Fin",
        accessorKey: "endAt",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Fin" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {formatDateTime(row.original.endAt)}
          </Typography>
        ),
        enableHiding: true,
      },
      {
        id: "Tipo",
        accessorKey: "appointmentType",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Tipo" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {formatAppointmentType(row.original.appointmentType) || "N/A"}
          </Typography>
        ),
        enableHiding: true,
      },
      {
        id: "Estado",
        accessorKey: "status",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => (
          <Typography
            variant="small"
            className={`${formatAppointmentStatus(row.original.status, "color")} flex p-2 rounded-xl w-fit`}
          >
            {formatAppointmentStatus(row.original.status, "name") || "N/A"}
          </Typography>
        ),
        enableHiding: true,
      },
      {
        id: "Acciones",
        accessorKey: "Acciones",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Acciones" />
        ),
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                openDialog({ title: "Editar cita" }, () => (
                  <AppointmentFormDialog data={row.original} />
                ))
              }
            >
              <Pencil />
            </Button>
            <ConfirmDialog
              title="¿Eliminar cita?"
              onConfirm={() => deleteMutation.mutate(row.original.id)}
              trigger={
                <Button variant="destructive">
                  <Trash2 />
                </Button>
              }
            />
          </div>
        ),
        enableHiding: true,
      },
    ];
  }, [clients, deleteMutation, openDialog, users]);

  const [table, appointmentsQuery] = useServerTable({
    queryKey: [appointmentConstantKey],
    fetchData: AppointmentsServices.getAll,
    columns,
    filterConfigs: AppointmentsServices.appointmentsTableFilterConfig,
    initialPageSize: 10,
  });

  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16',
        "flex flex-1 flex-col gap-4 overflow-auto p-4",
      )}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h2">Lista de citas</Typography>
        <Button
          onClick={() =>
            openDialog({ title: "Agregar cita" }, () => (
              <AppointmentFormDialog />
            ))
          }
        >
          Agregar
        </Button>
      </div>
      <AppTableToolbar
        table={table}
        searchPlaceholder="Buscar por título"
        searchKey="Citas"
        filterConfigs={AppointmentsServices.appointmentsTableFilterConfig}
        filters={[
          {
            columnId: "Estado",
            title: "Estado",
            options: appointmentStatus.map((status) => ({
              value: status.value,
              label: status.name,
            })),
          },
          {
            columnId: "Tipo",
            title: "Tipo",
            options: appointmentTypes.map((type) => ({
              value: type.value,
              label: type.name,
            })),
          },
        ]}
      />
      <AppTable
        table={table}
        isGettingData={
          appointmentsQuery.isPlaceholderData || appointmentsQuery.isLoading
        }
      />
      <AppTablePagination
        table={table}
        isLoading={appointmentsQuery.isFetching}
      />
    </div>
  );
};

export default AppointmentsPage;
