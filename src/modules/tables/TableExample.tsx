import { useServerTable } from "@/hooks/useServerTable";
import {
  statusData,
  tableConstantKey,
  TICKET_CSS,
  TICKET_STATUS,
} from "./constants/tableConstants";
import ExampleService from "./services/ExampleService";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TicketResponse, TicketRow } from "./interfaces/types";
import AppTableColumnHeader from "@/components/table/AppTableColumnHeader";
import { Typography } from "@/components/ui/Typography";
import { formatDateTimeUtc } from "@/utils/dayjsSpanish";
import { GoDotFill } from "react-icons/go";
// import { useNavigate } from "react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AppTableToolbar from "@/components/table/AppTableToolBar";
import AppTable from "@/components/table/AppTable";
import { AppTablePagination } from "@/components/table/AppTablePagination";
import { useDialogStore } from "@/store/useDialogStore";
import ElementModal from "./components/ElementModal";
import { useExampleQuery } from "./hooks/useExampleQuery";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";

const TableExample = () => {
  // const navigate = useNavigate();
  const { delete: remove } = useExampleQuery();
  const columns = useMemo<ColumnDef<TicketRow>[]>(() => {
    return [
      {
        accessorKey: "ticketCode",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Ticket" />;
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">
              #OT-{row.original.ticketCode.padStart(4, "0")}
            </Typography>
            <Typography variant="muted">
              {formatDateTimeUtc(row.original.createdAt)}
            </Typography>
          </div>
        ),
        enableHiding: true,
      },
      {
        accessorKey: "client",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Cliente" />;
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">
              {row.original.client || "N/A"}
            </Typography>
            <Typography variant="muted">{row.original.phone}</Typography>
          </div>
        ),
        enableHiding: true,
      },
      {
        accessorKey: "brand",
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Equipo" />;
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Typography variant="small">{row.original.brand}</Typography>
            <h1
              className="truncate max-w-[200px] text-muted-foreground text-sm"
              title={row.original.model}
            >
              {row.original.model}
            </h1>
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
          <div className="flex items-center">
            <div
              className={`text-wrap flex items-center rounded-2xl p-1 font-light text-xs ${TICKET_CSS[row.original.status]}`}
            >
              <GoDotFill />
              {TICKET_STATUS[row.original.status]}
            </div>
          </div>
        ),
        enableHiding: true,
      },
      {
        id: "ver",
        enableHiding: false,
        header: ({ column }) => {
          return <AppTableColumnHeader column={column} title="Ver" />;
        },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              className="text-primary cursor-pointer"
              onClick={() =>
                openDialog(() => <ElementModal data={row.original} />, {
                  title: "Editar usuario",
                  width: 600,
                })
              }
            >
              <Pencil />
            </Button>
            {/* <Button variant={"ghost"} className="text-destructive cursor-pointer">
              <Trash />
            </Button> */}
            <ConfirmDialog
              trigger={
                <Button variant={"ghost"}>
                  <Trash2 />
                </Button>
              }
              onConfirm={() => {
                remove.mutate(row.original.id);
              }}
            />
          </div>
        ),
      },
    ];
  }, []);

  const [table, usersQuery] = useServerTable({
    queryKey: [tableConstantKey],
    fetchData: ExampleService.getAll,
    columns: columns,
    filterConfigs: ExampleService.contactTableFilterConfigs,
    initialPageSize: 10,
  });

  const resume = useMemo(() => {
    const resumeData = usersQuery.data as TicketResponse | undefined;
    return [
      {
        title: "En diagnóstico",
        status: "text-(--color-diag-text)",
        value: resumeData?.statusCount?.DIAGNOSIS ?? 0,
      },
      {
        title: "En reparación",
        status: "text-(--color-repair-text)",
        value: resumeData?.statusCount?.REPAIR ?? 0,
      },
      {
        title: "Por Entregar",
        status: "text-(--color-ready-text)",
        value: resumeData?.statusCount?.READY ?? 0,
      },
      {
        title: "Entregados (Mes)",
        status: "text-(--color-deliv-text)",
        value: resumeData?.statusCount?.DELIVERED ?? 0,
      },
    ];
  }, [usersQuery.data]);
  const { openDialog } = useDialogStore();
  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16',
        "flex flex-1 flex-col gap-4 overflow-auto p-4",
      )}
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-md sm:text-2xl font-bold">
            Ejemplo de tabla con tanStack Query/Table
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              openDialog(() => <ElementModal />, {
                title: "Editar usuario",
                width: 600,
              })
            }
          >
            <Plus />
            Agregar
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {resume.map((item, index) => (
          <div className="rounded-md bg-muted p-4" key={index}>
            <Typography variant="muted">{item.title}</Typography>
            <Typography variant="h2" className={`${item.status}`}>
              {item.value}
            </Typography>
          </div>
        ))}
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
              statusData.map((status) => ({
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
      <AppTablePagination table={table} isLoading={usersQuery.isRefetching} />
    </div>
  );
};

export default TableExample;
