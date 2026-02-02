import AppTable from "@/components/table/AppTable";
import { AppTablePagination } from "@/components/table/AppTablePagination";
import AppTableToolbar from "@/components/table/AppTableToolBar";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { BranchSchema } from "../schema/branchSchema";
import { useMemo, useState } from "react";
import AppTableColumnHeader from "@/components/table/AppTableColumnHeader";
import { useServerTable } from "@/hooks/useServerTable";
import { branchConstantKey } from "../constants/branchConstants";
import BranchService from "../services/BranchService";
import { Pencil, Trash2 } from "lucide-react";
import { BranchForm } from "./BranchForm";
import { useBranchDeleteQuery } from "../hooks/useBranchDeleteQuery";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";

export const BranchTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<BranchSchema | undefined>();
  const { mutate: deleteBranch } = useBranchDeleteQuery();

  const columns = useMemo<ColumnDef<BranchSchema>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Nombre" />;
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">
              {row.original.name || "N/A"}
            </Typography>
          </div>
        ),
      },
      {
        accessorKey: "address",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Dirección" />;
        },
        cell: ({ row }) => (
          <Typography variant="small">
            {row.original.address || "N/A"}
          </Typography>
        ),
      },
      {
        accessorKey: "phone",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Teléfono" />;
        },
        cell: ({ row }) => (
          <Typography variant="small">{row.original.phone || "N/A"}</Typography>
        ),
      },
      {
        accessorKey: "Acciones",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Acciones" />;
        },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setEditData(row.original);
                setShowForm(true);
              }}
            >
              <Pencil />
            </Button>
            <ConfirmDialog
              onConfirm={() => deleteBranch(row.original.id)}
              title="¿Estás seguro?"
              description="Esta acción no se puede deshacer."
              trigger={
                <Button variant="destructive">
                  <Trash2 />
                </Button>
              }
            />
          </div>
        ),
      },
    ];
  }, [deleteBranch]);

  const [table, branchQuery] = useServerTable({
    queryKey: [branchConstantKey],
    fetchData: BranchService.getAll,
    columns: columns,
    filterConfigs: BranchService.branchTableFilterConfig,
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
        <Typography variant="h2">Lista de sucursales</Typography>
        <Button
          onClick={() => {
            setEditData(undefined);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cerrar" : "Agregar"}
        </Button>
      </div>
      {showForm && <BranchForm data={editData} />}
      <AppTableToolbar
        table={table}
        searchPlaceholder="Filtar por nombre"
        searchKey="name"
      />
      <AppTable
        table={table}
        isGettingData={branchQuery.isPlaceholderData || branchQuery.isLoading}
      />
      <AppTablePagination table={table} isLoading={branchQuery.isFetching} />
    </div>
  );
};
