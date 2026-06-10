import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";

interface MultiCheckboxFxProps<T extends FieldValues> {
  name: Path<T>;
  value: string | number | boolean; // el value único del checkbox
  label: string;
  description?: string;
  className?: string;
}

export function MultiCheckboxFx<T extends FieldValues>({
  name,
  value,
  label,
  description,
  className,
}: MultiCheckboxFxProps<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected: (string | number | boolean)[] = field.value || [];

        const isChecked = selected.includes(value);

        const toggle = (checked: boolean) => {
          const newValue = checked
            ? [...selected, value]
            : selected.filter((v) => v !== value);

          field.onChange(newValue);
        };

        return (
          <FormItem
            className={`flex flex-col space-y-1 rounded-lg p-3 ${className}`}
          >
            <div className="flex space-x-3 items-center">
              <FormControl>
                <Checkbox checked={isChecked} onCheckedChange={toggle} />
              </FormControl>

              <div className="flex flex-col">
                <FormLabel className="text-base">{label}</FormLabel>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
}
