import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "../ui/select";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";

interface SelectProps<T extends FieldValues, U> extends Omit<
  React.ComponentProps<typeof Select>,
  "onValueChange" | "value"
> {
  // control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  options: U[];
  getValue: (item: U) => string;
  getLabel: (item: U) => string;
  className?: string;
  onChange?: (value: U | undefined) => void;
  selectClassName?: string;
}

const SelectFx = <T extends FieldValues, U>({
  name,
  label,
  placeholder = "Seleccione...",
  description,
  options,
  getValue,
  getLabel,
  className = "",
  onChange,
  selectClassName,
  ...props
}: SelectProps<T, U>) => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="w-full truncate">{label}</FormLabel>}
          <FormControl>
            <Select
              value={field.value || ""}
              onValueChange={(value) => {
                field.onChange(value);
                const option = options.find((opt) => getValue(opt) === value);
                onChange?.(option);
              }}
              {...props}
            >
              <SelectTrigger
                ref={field.ref}
                className={cn("w-full truncate", selectClassName)}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="null">{placeholder}</SelectItem>
                  {options.map((option) => (
                    <SelectItem
                      key={getValue(option)}
                      value={getValue(option).toString()}
                    >
                      {getLabel(option)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectFx;
