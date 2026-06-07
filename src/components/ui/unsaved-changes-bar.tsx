import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UnsavedChangesBarProps {
  visible: boolean;
  onSave: () => void;
  onDiscard?: () => void;
}

export function UnsavedChangesBar({
  visible,
  onSave,
  onDiscard,
}: UnsavedChangesBarProps) {
  return (
    <div
      className={cn(
        "fixed right-5 z-50  max-w-xl ",
        "bottom-6 transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-24",
      )}
    >
      <div className="flex items-center justify-between rounded-lg border bg-muted px-4 py-3 shadow-lg">
        <span className="text-sm text-muted-foreground">
          Tienes cambios sin guardar
        </span>

        <div className="flex gap-2">
          {onDiscard && (
            <Button variant="ghost" size="sm" onClick={onDiscard} type="button">
              Descartar
            </Button>
          )}
          <Button size="sm" onClick={onSave} type="button">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
