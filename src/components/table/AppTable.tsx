import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";

interface AppTableProps<T> {
  table: TableType<T>;
  isGettingData?: boolean;
}
const AppTable = <T,>({ table, isGettingData = false }: AppTableProps<T>) => {
  const skeletonRows = 8;
  const columnCount = table.getAllLeafColumns().length;

  return (
    <div className="overflow-auto rounded-md border h-full w-full custom-scrollbar">
      <Table>
        <TableHeader className="sticky top-0 bg-border ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
                    <TableCell key={`skeleton-cell-${i}-${j}`}>
                      <Skeleton className="h-10  w-full" />
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
                    <TableCell key={cell.id}>
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
