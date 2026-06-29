import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { type Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DataTableColumnHeaderProps<TData, TValue> =
  React.HTMLAttributes<HTMLDivElement> & {
    column: Column<TData, TValue>;
    title: string;
  };

const AppTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const align = column.columnDef.meta?.align ?? "center";
  const alignClassName = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  }[align];

  if (!column.getCanSort()) {
    return <div className={cn(alignClassName, className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center gap-2", alignClassName, className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent h-8 justify-center px-2"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ms-1.5 size-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ms-1.5 size-4" />
            ) : (
              <CaretSortIcon className="ms-1.5 size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="text-muted-foreground/70 size-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="text-muted-foreground/70 size-3.5" />
            Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeNoneIcon className="text-muted-foreground/70 size-3.5" />
                Ocultar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AppTableColumnHeader;
