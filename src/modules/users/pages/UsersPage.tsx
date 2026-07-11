import AppTable from "@/components/table/AppTable";
import { AppTablePagination } from "@/components/table/AppTablePagination";
import AppTableToolbar from "@/components/table/AppTableToolBar";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { UserDTO } from "../interfaces/types";
import { useMemo } from "react";
import AppTableColumnHeader from "@/components/table/AppTableColumnHeader";
import { useServerTable } from "@/hooks/useServerTable";
import {
  formatStatus,
  userConstantKey,
  userStatus,
} from "../constants/userConstants";
import UsersServices from "../services/users.service";
import { Pencil, Trash2 } from "lucide-react";
import { useDialogStore } from "@/store/useDialogStore";
import { UserFormDialog } from "../components/UsersFormDialog";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { useUserQuery } from "../hooks/useUserQuery";
import { useBranchStore } from "@/store/useBranchStore";
import { useAuthorizationStore } from "@/store/useAuthorizationStore";

const UsersPage = () => {
  const { openDialog } = useDialogStore();
  const { branch } = useBranchStore();
  const { roles } = useAuthorizationStore();
  const { delete: deleteMutation } = useUserQuery();
  const columns = useMemo<ColumnDef<UserDTO>[]>(() => {
    return [
      {
        id: "#",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="N°" />
        ),
        meta: {
          label: "N°",
          className: "text-center",
        },
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Typography variant="small">{row.index + 1}</Typography>
          </div>
        ),
        enableHiding: false,
      },
      {
        id: "Usuarios",
        accessorKey: "lastName",
        meta: {
          align: "left",
          label: "Usuarios", // Agrega una etiqueta personalizada para el nombre de la columna (vistas)
        },
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Usuarios" />;
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">
              {row.original.name + " " + row.original.lastName || "N/A"}
            </Typography>
            <Typography variant="muted">{row.original.email}</Typography>
          </div>
        ),
        enableHiding: true,
      },
      {
        id: "dni",
        accessorKey: "dni",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Documento" />;
        },
        meta: {
          label: "Documento",
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">{row.original.dni || "N/A"}</Typography>
          </div>
        ),
        enableHiding: true,
        enableSorting: false,
      },
      {
        id: "Sucursal",
        accessorKey: "branchId",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Sucursal" />;
        },

        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">
              {branch.find((b) => b.id === row.original.branches[0].id)?.name ||
                "N/A"}
            </Typography>
          </div>
        ),
        enableHiding: true,
        enableSorting: false,
      },
      {
        id: "Telefono",
        accessorKey: "phone",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Telefono" />;
        },
        meta: {
          label: "Telefono",
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">
              {row.original.phone || "N/A"}
            </Typography>
          </div>
        ),
        enableHiding: true,
        enableSorting: false,
      },
      {
        id: "Estado",
        accessorKey: "status",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Estado" />;
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography
              variant="small"
              className={`${formatStatus(row.original.status, "color")} flex p-2 rounded-xl w-fit`}
            >
              {formatStatus(row.original.status, "name") || "N/A"}
            </Typography>
          </div>
        ),
        enableHiding: true,
      },
      {
        id: "Rol",
        accessorKey: "roleId",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Rol" />;
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">
              {roles.find((r) => r.id === row.original.roles)?.name || "N/A"}
            </Typography>
          </div>
        ),
        enableHiding: true,
        enableSorting: false,
      },
      {
        id: "Acciones",
        accessorKey: "Acciones",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Acciones" />;
        },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                openDialog({ title: "Editar usuario" }, () => (
                  <UserFormDialog data={row.original} />
                ))
              }
            >
              <Pencil />
            </Button>
            <ConfirmDialog
              title="¿Eliminar usuario?"
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
  }, []);

  const [table, usersQuery] = useServerTable({
    queryKey: [userConstantKey],
    fetchData: UsersServices.getAll,
    columns: columns,
    filterConfigs: UsersServices.usersTableFilterConfig,
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
        <Typography variant="h2">Lista de usuarios</Typography>
        <Button
          onClick={() =>
            openDialog({ title: "Agregar usuario" }, () => <UserFormDialog />)
          }
        >
          Agregar
        </Button>
      </div>
      <AppTableToolbar
        table={table}
        searchPlaceholder="Buscar por nombre o dni"
        searchKey="Usuarios"
        filterConfigs={UsersServices.usersTableFilterConfig}
        filters={[
          {
            columnId: "Estado",
            title: "Estado",
            options:
              userStatus.map((status) => ({
                value: status.value,
                label: status.name,
              })) ?? [],
          },
        ]}
      />
      <AppTable
        table={table}
        isGettingData={usersQuery.isPlaceholderData || usersQuery.isLoading}
      />
      <AppTablePagination table={table} isLoading={usersQuery.isFetching} />
    </div>
  );
};
export default UsersPage;
