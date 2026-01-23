import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { ReactNode } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
interface InputProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  icon?: ReactNode;
  placeholder?: string;
  inputClassName?: string;
  disabledController?: boolean;
  className?: string;
  inputContainerClassName?: string;
  rightComponent?: ReactNode;
}
const InputFx = <T extends FieldValues>({
  name,
  label,
  icon,
  placeholder,
  inputClassName,
  className,
  disabledController,
  inputContainerClassName,
  rightComponent,
  ...props
}: InputProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabledController}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div
              className={`relative flex items-center w-full ${inputContainerClassName}`}
            >
              {icon && (
                <div className="absolute left-3 text-gray-500">{icon}</div>
              )}
              <Input
                placeholder={placeholder}
                {...field}
                value={field.value ?? ""}
                {...props}
                className={cn(`${icon ? "pl-10" : "pl-2"}`, inputClassName)}
              />
              {rightComponent}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFx;
