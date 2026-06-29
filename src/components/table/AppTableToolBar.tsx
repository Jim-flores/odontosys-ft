import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./faceted-filter";
import { DataTableViewOptions } from "./view-options";
import { useEffect, type ReactNode } from "react";
import type { FilterConfig } from "@/hooks/useServerTable";

type AppTableToolbarProps<TData> = {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchKey?: string;
  filters?: {
    columnId: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
  HeaderLeft?: ReactNode;
  filterConfigs?: FilterConfig[];
};

const AppTableToolbar = <TData,>({
  table,
  searchPlaceholder = "Filter...",
  searchKey,
  filters = [],
  HeaderLeft,
  filterConfigs = [],
}: AppTableToolbarProps<TData>) => {
  const searchConfig = searchKey
    ? filterConfigs.find((filter) => filter.columnId === searchKey)
    : undefined;
  const canUseSearchInput = !searchConfig || searchConfig.type === "string";
  const searchColumn = searchKey ? table.getColumn(searchKey) : undefined;

  useEffect(() => {
    if (import.meta.env.PROD) return;
    if (searchConfig && searchConfig.type !== "string") {
      console.warn(
        `[AppTableToolbar] searchKey "${searchKey}" debe mapear a un filtro de tipo "string".`,
      );
    }
  }, [searchConfig, searchKey]);

  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-2 sm:flex-row sm:items-center">
        {searchKey && canUseSearchInput ? (
          <Input
            placeholder={searchPlaceholder}
            value={(searchColumn?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              searchColumn?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : !searchKey ? (
          <Input
            placeholder={searchPlaceholder}
            value={table.getState().globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : null}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const column = table.getColumn(filter.columnId);
            if (!column) return null;
            return (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            );
          })}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        {HeaderLeft}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
};
export default AppTableToolbar;
