import { createContext } from "react";
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitErrorHandler,
} from "react-hook-form";

export interface FormContainerContextInterface {
  absoluteError: boolean;
}
export const FormContainerContext =
  createContext<FormContainerContextInterface | null>(null);
interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit?: (values: T) => void;
  children: React.ReactNode;
  className?: string;
  onError?: SubmitErrorHandler<T>;
  id?: string;
  absoluteError?: boolean;
}

export function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  absoluteError = false,
  onError,
  id,
}: FormWrapperProps<T>) {
  return (
    <FormProvider {...form}>
      <FormContainerContext.Provider
        value={{
          absoluteError,
        }}
      >
        <form
          onSubmit={
            onSubmit
              ? form.handleSubmit(onSubmit, onError)
              : (e) => e.preventDefault()
          }
          id={id}
          className={`flex flex-col gap-4 ${className}`}
        >
          {children}
        </form>
      </FormContainerContext.Provider>
    </FormProvider>
  );
}
