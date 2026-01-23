import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";

interface TextAreaProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  inputClassName?: string;
}

const TextAreaFx = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  className,
  inputClassName,
  ...props
}: TextAreaProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="text-foreground">{label}</FormLabel>}
          <FormControl>
            <div className="relative flex items-center">
              <Textarea
                placeholder={placeholder}
                {...field}
                {...props}
                className={cn(inputClassName)}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaFx;
