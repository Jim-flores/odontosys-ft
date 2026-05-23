import AppTable from "@/components/table/AppTable";
import { AppTablePagination } from "@/components/table/AppTablePagination";
import AppTableToolbar from "@/components/table/AppTableToolBar";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { CustumerDTO } from "../interfaces/types";
import { useMemo } from "react";
import AppTableColumnHeader from "@/components/table/AppTableColumnHeader";
import { useServerTable } from "@/hooks/useServerTable";
import {
  formatStatus,
  custumerConstantKey,
  custumerStatus,
} from "../constants/custumerConstants";
import CustumersServices from "../services/custumers.service";
import { Trash2 } from "lucide-react";
import { useDialogStore } from "@/store/useDialogStore";
import { CustumerFormDialog } from "../components/CustumerFormDialog";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { useCustumerQuery } from "../hooks/useCustumerQuery";
import { useBranchStore } from "@/store/useBranchStore";

const CustumersPage = () => {
  const { openDialog } = useDialogStore();
  const { branch } = useBranchStore();
  const { delete: deleteMutation } = useCustumerQuery();

  const columns = useMemo<ColumnDef<CustumerDTO>[]>(() => {
    return [
      {
        id: "Clientes",
        accessorKey: "lastName",
        meta: {
          label: "Clientes",
        },
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Clientes" />;
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
              {branch.find((b) => b.id === row.original.branchId)?.name ||
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
        id: "Acciones",
        accessorKey: "Acciones",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Acciones" />;
        },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <ConfirmDialog
              title="¿Eliminar cliente?"
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
  }, [branch, deleteMutation, openDialog]);

  const [table, custumersQuery] = useServerTable({
    queryKey: [custumerConstantKey],
    fetchData: CustumersServices.getAll,
    columns: columns,
    filterConfigs: CustumersServices.custumersTableFilterConfig,
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
        <Typography variant="h2">Lista de clientes</Typography>
        <Button
          onClick={() =>
            openDialog({ title: "Agregar cliente" }, () => (
              <CustumerFormDialog />
            ))
          }
        >
          Agregar
        </Button>
      </div>
      <AppTableToolbar
        table={table}
        searchPlaceholder="Buscar por nombre o dni"
        searchKey="Clientes"
        filterConfigs={CustumersServices.custumersTableFilterConfig}
        filters={[
          {
            columnId: "Estado",
            title: "Estado",
            options:
              custumerStatus.map((status) => ({
                value: status.value,
                label: status.name,
              })) ?? [],
          },
        ]}
      />
      <AppTable
        table={table}
        isGettingData={
          custumersQuery.isPlaceholderData || custumersQuery.isLoading
        }
      />
      <AppTablePagination table={table} isLoading={custumersQuery.isFetching} />
    </div>
  );
};

export default CustumersPage;
