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

const UsersPage = () => {
  const columns = useMemo<ColumnDef<UserDTO>[]>(() => {
    return [
      {
        accessorKey: "users",
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
        accessorKey: "Acciones",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Acciones" />;
        },
        cell: () => (
          <div className="flex gap-2">
            <Button>
              <Pencil />
            </Button>
            <Button>
              <Trash2 />
            </Button>
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
        <Button>Agregar</Button>
      </div>
      <AppTableToolbar
        table={table}
        searchPlaceholder="Filtar por nombre"
        searchKey="client"
        filters={[
          {
            columnId: "status",
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
