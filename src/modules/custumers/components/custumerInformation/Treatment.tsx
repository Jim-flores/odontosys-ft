import AppTable from "@/components/table/AppTable";
import AppTableColumnHeader from "@/components/table/AppTableColumnHeader";
import { AppTablePagination } from "@/components/table/AppTablePagination";
import AppTableToolbar from "@/components/table/AppTableToolBar";
import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import InputFx from "@/components/customFormFields/InputFx";
import SelectFx from "@/components/customFormFields/SelectFx";
import TextAreaFx from "@/components/customFormFields/TextAreaFx";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { useProfileStore } from "@/store/useProfileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";
import { TreatmentRequestSchema } from "../../constants/treatmentSchema";
import {
  useCreateTreatmentQuery,
  useDeleteTreatmentQuery,
  useTreatmentQuery,
} from "../../hooks/useTreatmentQuery";
import { TreatmentDTO, TreatmentRequestDTO } from "../../interfaces/types";

const paymentStatusOptions = [
  { label: "Pendiente", value: "PENDING" },
  { label: "Pagado", value: "PAID" },
  { label: "Parcial", value: "PARTIAL" },
] as const;

const paymentMethodOptions = [
  { label: "Efectivo", value: "CASH" },
  { label: "Tarjeta", value: "CARD" },
  { label: "Transferencia", value: "TRANSFER" },
] as const;

const TreatmentFormSchema = TreatmentRequestSchema.extend({
  price: z.coerce
    .number()
    .min(0, "El precio debe ser mayor o igual a 0")
    .max(999999.99, "El precio no puede ser mayor a 999999.99"),
  paid: z.coerce
    .number()
    .min(0, "El pago debe ser mayor o igual a 0")
    .max(999999.99, "El pago no puede ser mayor a 9999.99"),
  balance: z.coerce
    .number()
    .min(0, "El saldo debe ser mayor o igual a 0")
    .max(999999.99, "El saldo no puede ser mayor a 9999.99"),
});

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(value);

const formatDate = (value: string) =>
  value ? new Intl.DateTimeFormat("es-PE").format(new Date(value)) : "N/A";

const getPaymentStatusLabel = (value: TreatmentDTO["paymentStatus"]) =>
  paymentStatusOptions.find((option) => option.value === value)?.label ?? value;

const getPaymentMethodLabel = (value: TreatmentDTO["paymentMethod"]) =>
  paymentMethodOptions.find((option) => option.value === value)?.label ?? value;

const Treatment = () => {
  const { id: clientId = "" } = useParams();
  const { id: userId } = useProfileStore();
  const treatmentsQuery = useTreatmentQuery(userId, clientId);
  const createTreatment = useCreateTreatmentQuery();
  const deleteTreatment = useDeleteTreatmentQuery();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const defaultValues = useMemo<TreatmentRequestDTO>(
    () => ({
      notes: "",
      price: 0,
      paid: 0,
      balance: 0,
      paymentStatus: "PENDING",
      paymentMethod: "CASH",
      clientId,
      userId,
    }),
    [clientId, userId],
  );

  const form = useForm<TreatmentRequestDTO>({
    resolver: zodResolver(TreatmentFormSchema),
    defaultValues,
  });

  const columns = useMemo<ColumnDef<TreatmentDTO>[]>(
    () => [
      {
        id: "#",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="N°" />
        ),
        meta: {
          label: "N°",
          className: "text-center",
        },
        cell: ({ row, table }) => (
          <Typography variant="small">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              row.index +
              1}
          </Typography>
        ),
        enableHiding: false,
        enableSorting: false,
      },
      {
        id: "Notas",
        accessorKey: "notes",
        meta: {
          align: "left",
          label: "Notas",
        },
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Notas" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">{row.original.notes || "N/A"}</Typography>
        ),
      },
      {
        id: "Precio",
        accessorKey: "price",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Precio" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {formatCurrency(row.original.price)}
          </Typography>
        ),
      },
      {
        id: "Pagado",
        accessorKey: "paid",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Pagado" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {formatCurrency(row.original.paid)}
          </Typography>
        ),
      },
      {
        id: "Saldo",
        accessorKey: "balance",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Saldo" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {formatCurrency(row.original.balance)}
          </Typography>
        ),
      },
      {
        id: "Estado",
        accessorKey: "paymentStatus",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {getPaymentStatusLabel(row.original.paymentStatus)}
          </Typography>
        ),
      },
      {
        id: "Metodo",
        accessorKey: "paymentMethod",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Metodo" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {getPaymentMethodLabel(row.original.paymentMethod)}
          </Typography>
        ),
      },
      {
        id: "Fecha",
        accessorKey: "createdAt",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Fecha" />
        ),
        cell: ({ row }) => (
          <Typography variant="small">
            {formatDate(row.original.createdAt)}
          </Typography>
        ),
      },
      {
        id: "Acciones",
        accessorKey: "Acciones",
        header: ({ column }) => (
          <AppTableColumnHeader column={column} title="Acciones" />
        ),
        cell: ({ row }) => (
          <Button
            variant="destructive"
            size="icon"
            onClick={() =>
              deleteTreatment.mutate({
                id: row.original.id,
                userId,
                clientId,
              })
            }
            disabled={deleteTreatment.isPending}
          >
            <Trash2 />
          </Button>
        ),
        enableHiding: true,
        enableSorting: false,
      },
    ],
    [clientId, deleteTreatment, userId],
  );

  const treatments = (treatmentsQuery.data?.rows ??
    []) as unknown as TreatmentDTO[];

  const table = useReactTable({
    data: treatments,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const onSubmit = (values: TreatmentRequestDTO) => {
    createTreatment.mutate(
      {
        ...values,
        userId,
        clientId,
      },
      {
        onSuccess: () => {
          form.reset(defaultValues);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4 px-2">
      <FormWrapper form={form} onSubmit={onSubmit} className="w-full">
        <TextAreaFx
          name="notes"
          label="Tratamiento"
          placeholder="Detalle del procedimiento"
          disabled={!userId || !clientId || createTreatment.isPending}
        />
        <div className="grid gap-4 md:grid-cols-3">
          <InputFx
            name="price"
            label="Precio"
            type="number"
            min={0}
            step="0.01"
            disabled={!userId || !clientId || createTreatment.isPending}
          />
          <InputFx
            name="paid"
            label="Pagado"
            type="number"
            min={0}
            step="0.01"
            disabled={!userId || !clientId || createTreatment.isPending}
          />
          <InputFx
            name="balance"
            label="Saldo"
            type="number"
            min={0}
            step="0.01"
            disabled={!userId || !clientId || createTreatment.isPending}
          />
          <SelectFx
            name="paymentStatus"
            label="Estado de pago"
            options={[...paymentStatusOptions]}
            getLabel={(option) => option.label}
            getValue={(option) => option.value}
            disabled={!userId || !clientId || createTreatment.isPending}
          />
          <SelectFx
            name="paymentMethod"
            label="Metodo de pago"
            options={[...paymentMethodOptions]}
            getLabel={(option) => option.label}
            getValue={(option) => option.value}
            disabled={!userId || !clientId || createTreatment.isPending}
          />
        </div>

        <Button
          className="w-fit"
          type="submit"
          disabled={!userId || !clientId || createTreatment.isPending}
        >
          Guardar
        </Button>
      </FormWrapper>

      <AppTableToolbar
        table={table}
        searchPlaceholder="Buscar procedimiento"
        filters={[
          {
            columnId: "Estado",
            title: "Estado",
            options: paymentStatusOptions.map((option) => ({
              label: option.label,
              value: option.value,
            })),
          },
        ]}
      />
      <AppTable
        table={table}
        isGettingData={treatmentsQuery.isLoading || treatmentsQuery.isFetching}
      />
      <AppTablePagination
        table={table}
        isLoading={treatmentsQuery.isFetching}
      />
    </div>
  );
};

export default Treatment;
