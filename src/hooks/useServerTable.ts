import type { PaginationResponse } from "@/interfaces/PaginationType";
import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  type PaginationState,
  type ColumnFiltersState,
  type Table,
  type OnChangeFn,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";

// --- Interfaces y Tipos ---

// La respuesta que esperamos del servidor

// Argumentos que recibirá nuestra función de fetching
export interface FetchDataParams {
  pagination: PaginationState;
  filters: ColumnFiltersState;
  sorting: SortingState; // <-- Añadir sorting
}

// Configuración para cada filtro que queremos sincronizar con la URL
export interface FilterConfig {
  /** El `id` de la columna en TanStack Table */
  columnId: string;
  /** El nombre del parámetro en la URL (ej: 'q', 'status') */
  param: string;
  /**
   * El tipo de dato, para saber cómo (de)serializarlo.
   * 'string' para búsquedas de texto.
   * 'array' para filtros de facetas (múltiples opciones).
   */
  type: "string" | "array";
}

// Props que recibe nuestro hook
interface UseServerTableProps<T> {
  queryKey: string[];
  fetchData: (params: FetchDataParams) => Promise<PaginationResponse<T>>;
  columns: ColumnDef<T>[];
  filterConfigs?: FilterConfig[]; // Hacemos opcional la configuración de filtros
  initialPageSize?: number;
}

// --- El Hook ---

export function useServerTable<T>({
  queryKey,
  fetchData,
  columns,
  filterConfigs = [], // Por defecto, no hay filtros
  initialPageSize = 10,
}: UseServerTableProps<T>): [Table<T>, UseQueryResult<PaginationResponse<T>>] {
  const [searchParams, setSearchParams] = useSearchParams();

  // const [searchValue] = useDebounce(searchParams.get("q") ?? "", 400);

  // 1. Derivar ESTADO desde la URL (Fuente de Verdad)

  // Paginación derivada de la URL
  const pagination = useMemo<PaginationState>(
    () => ({
      pageIndex: parseInt(searchParams.get("page") ?? "1", 10) - 1,
      pageSize: parseInt(
        searchParams.get("pageSize") ?? String(initialPageSize),
        10,
      ),
    }),
    [searchParams, initialPageSize],
  );

  // Filtros derivados de la URL
  const columnFilters = useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    for (const config of filterConfigs) {
      const value = searchParams.get(config.param);
      if (value) {
        if (config.type === "array") {
          filters.push({ id: config.columnId, value: value.split(",") });
        } else {
          // 'string'
          filters.push({ id: config.columnId, value });
        }
      }
    }
    return filters;
  }, [searchParams, filterConfigs]);

  const [columnFiltersDebounced] = useDebounce(columnFilters, 400);

  // NUEVO: Derivar la ordenación desde la URL
  const sorting = useMemo<SortingState>(() => {
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");
    if (!sortBy) return [];
    return [{ id: sortBy, desc: sortOrder === "desc" }];
  }, [searchParams]);

  // 2. Realizar la llamada a la API con React Query
  const dataQuery = useQuery({
    // La queryKey ahora incluye paginación y filtros para que se re-ejecute si cambian
    queryKey: [...queryKey, pagination, columnFiltersDebounced, sorting],
    queryFn: () => fetchData({ pagination, filters: columnFilters, sorting }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // 3. Definir los HANDLERS para actualizar la URL

  // Handler para la paginación
  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const newPagination =
      typeof updater === "function" ? updater(pagination) : updater;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", String(newPagination.pageIndex + 1));
      newParams.set("pageSize", String(newPagination.pageSize));
      return newParams;
    });
  };

  // Handler para los filtros
  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (
    updater,
  ) => {
    const newFilters =
      typeof updater === "function" ? updater(columnFilters) : updater;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      // Primero, borramos todos los parámetros de filtro conocidos
      for (const config of filterConfigs) {
        newParams.delete(config.param);
      }

      // Luego, añadimos los filtros que tienen valor
      for (const filter of newFilters) {
        const config = filterConfigs.find((c) => c.columnId === filter.id);
        if (config) {
          const value = Array.isArray(filter.value)
            ? filter.value.join(",")
            : String(filter.value);

          if (value) {
            // Solo añadir si hay un valor
            newParams.set(config.param, value);
          }
        }
      }

      // IMPORTANTE: Al cambiar un filtro, reseteamos a la página 1
      newParams.set("page", "1");
      return newParams;
    });
  };

  // NUEVO: Handler para la ordenación
  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const newSorting =
      typeof updater === "function" ? updater(sorting) : updater;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      // Si el array de sorting está vacío, eliminamos los parámetros
      if (!newSorting.length) {
        newParams.delete("sortBy");
        newParams.delete("sortOrder");
      } else {
        // Si no, establecemos los nuevos valores
        const sortItem = newSorting[0];
        newParams.set("sortBy", sortItem.id);
        newParams.set("sortOrder", sortItem.desc ? "desc" : "asc");
      }
      return newParams;
    });
  };

  // 4. Crear la instancia de la tabla
  const table = useReactTable({
    data: dataQuery.data?.rows ?? [],
    columns,
    rowCount: dataQuery.data?.pagination.total ?? 0,
    state: {
      pagination,
      columnFilters, // El estado de los filtros viene de la URL
      sorting,
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange, // <-- Conectar el handler de sorting
    onColumnFiltersChange: handleColumnFiltersChange, // Conectamos el handler
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true, // Le decimos a la tabla que el filtrado es manual (servidor)
    manualSorting: true,
  });

  return [table, dataQuery];
}
