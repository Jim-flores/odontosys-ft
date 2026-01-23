import { useState } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Lock } from "lucide-react";

interface InputPasswordProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

const InputPasswordFx = <T extends FieldValues>({
  name,
  label,
  placeholder = "123456",
  className = "",
  inputClassName = "",
}: InputPasswordProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="text-foreground">{label}</FormLabel>}
          <FormControl>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-500">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                {...field}
                className={cn("pl-10 pr-10", inputClassName)}
              />
              <button
                type="button"
                className="absolute right-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputPasswordFx;
