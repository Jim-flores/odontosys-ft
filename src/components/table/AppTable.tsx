import { flexRender, type Table as TableType } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface AppTableProps<T> {
  table: TableType<T>;
  isGettingData?: boolean;
}

const AppTable = <T,>({ table, isGettingData = false }: AppTableProps<T>) => {
  const skeletonRows = 8;
  const columnCount = table.getAllLeafColumns().length;
  const getAlignClassName = (align: "left" | "center" | "right" = "center") =>
    ({
      left: "px-3 text-left [&>div]:mr-auto",
      center: "px-3 text-center [&>div]:mx-auto [&>div]:w-fit",
      right: "px-3 text-right [&>div]:ml-auto [&>div]:w-fit",
    })[align];

  return (
    <div className="custom-scrollbar h-full w-full overflow-auto rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50 sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={getAlignClassName(
                      header.column.columnDef.meta?.align,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isGettingData
            ? Array.from({ length: skeletonRows }).map((_, i) => (
                <TableRow key={`skeleton-${i}`} className="h-[52px]">
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <TableCell key={`skeleton-cell-${i}-${j}`} className="px-3">
                      <Skeleton className="mx-auto h-9 w-full max-w-[160px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={getAlignClassName(
                        cell.column.columnDef.meta?.align,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppTable;
