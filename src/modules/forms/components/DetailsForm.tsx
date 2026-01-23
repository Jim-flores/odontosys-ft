import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../schema/formSchema";
import { useDialogStore } from "@/store/useDialogStore";

interface Props {
  form: UseFormReturn<FormSchema>;
  onSubmit: (values: FormSchema) => void;
}

const DetailsForm = ({ form, onSubmit }: Props) => {
  const { closeDialog } = useDialogStore();
  const values = form.getValues();
  return (
    <div className="space-y-6">
      {/* PERSONAL */}
      <section>
        <h3 className="font-semibold">Datos personales</h3>
        <p>
          {values.personal.firstName} {values.personal.lastName}
        </p>
        <p>Edad: {values.personal.age}</p>
      </section>

      {/* DOCUMENTO */}
      <section>
        <h3 className="font-semibold">Documento</h3>
        <p>Tipo: {values.document.documentType}</p>
        <p>Número: {values.document.documentNumber}</p>
        <p>Género: {values.document.gender}</p>
      </section>

      {/* ADDRESS */}
      <section>
        <h3 className="font-semibold">Dirección</h3>
        <p>{values.address.street}</p>
        <p>
          {values.address.city}, {values.address.country}
        </p>
      </section>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={closeDialog}>
          Cancelar
        </Button>

        <Button
          onClick={form.handleSubmit((data) => {
            onSubmit(data);
            closeDialog();
          })}
        >
          Confirmar y enviar
        </Button>
      </div>
    </div>
  );
};

export default DetailsForm;
