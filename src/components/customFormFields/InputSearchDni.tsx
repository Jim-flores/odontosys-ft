import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InputSearchDniProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
  inputContainerClassName?: string;
  disabledController?: boolean;

  /**
   * Se ejecuta cuando APIPERU encuentra datos.
   */
  onFound?: (data: {
    dni: string;
    nombre: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  }) => void;
}

const InputSearchDni = <T extends FieldValues>({
  name,
  label,
  placeholder = "Ingrese DNI",
  inputClassName,
  className,
  inputContainerClassName,
  disabledController,
  onFound,
  ...props
}: InputSearchDniProps<T>) => {
  const { control } = useFormContext<T>();

  const [loading, setLoading] = useState(false);

  const searchDni = async (dni: string) => {
    if (dni.length !== 8) return;

    try {
      setLoading(true);

      const response = await fetch(`https://apiperu.dev/api/dni/${dni}`, {
        headers: {
          Authorization: `Bearer 20131|oqlXDaNLpJ1I9z9emhhS17WYUt0V4qLnLzHcqFhkad9fa6bd`,
          Accept: "application/json",
        },
      });

      if (!response.ok) return;

      const json = await response.json();

      if (!json.success || !json.data) return;

      const persona = json.data;

      onFound?.({
        dni: persona.numero,
        nombres: persona.nombres,
        apellidoPaterno: persona.apellido_paterno,
        apellidoMaterno: persona.apellido_materno,
        nombre: `${persona.nombres} ${persona.apellido_paterno} ${persona.apellido_materno}`,
      });
    } catch (error) {
      console.error("Error buscando DNI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabledController}
      render={({ field }) => (
        <FormItem className={cn("relative", className)}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <div
              className={cn(
                "relative flex items-center",
                inputContainerClassName,
              )}
            >
              <Input
                {...field}
                {...props}
                value={field.value ?? ""}
                maxLength={8}
                inputMode="numeric"
                placeholder={placeholder}
                className={cn("pr-12", inputClassName)}
                onChange={(e) => {
                  // Solo permitir números
                  const value = e.target.value.replace(/\D/g, "");
                  field.onChange(value);
                }}
              />

              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-1 h-8 w-8"
                disabled={loading || (field.value?.length ?? 0) !== 8}
                onClick={() => searchDni(field.value)}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputSearchDni;
