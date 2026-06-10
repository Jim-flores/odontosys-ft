import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import InputFx from "@/components/customFormFields/InputFx";
// import SelectFx from "@/components/customFormFields/SelectFx";
import TextAreaFx from "@/components/customFormFields/TextAreaFx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateCustumerAntecedentQuery } from "../../hooks/useCustumerInfoQuery";
import { AntecedentDTO, AntecedentRequestDTO } from "../../interfaces/types";
// import { MultiCheckboxFx } from "@/components/customFormFields/MultiCheckboxFx";
// import { Typography } from "@/components/ui/Typography";
import { CalendarIcon, Timer } from "lucide-react";
import { UnsavedChangesBar } from "@/components/ui/unsaved-changes-bar";
import { antecedentSchema } from "../../constants/antecendetSchema";

interface Props {
  data?: AntecedentDTO;
}

const buildDefaultValues = (data?: AntecedentRequestDTO) => ({
  lastAppointment: data?.lastAppointment ?? "",
  numberOfBrushesPerDay: data?.numberOfBrushesPerDay ?? undefined,
  pain: data?.pain ?? false,
  painDetails: data?.painDetails ?? "",
  clench: data?.clench ?? false,
  clenchDetails: data?.clenchDetails ?? "",
  headache: data?.headache ?? false,
  headacheDetails: data?.headacheDetails ?? "",
  medication: data?.medication ?? false,
  medicationDetails: data?.medicationDetails ?? "",
  allergies: data?.allergies ?? false,
  allergiesDetails: data?.allergiesDetails ?? "",
  arthritis: data?.arthritis ?? false,
  hypertension: data?.hypertension ?? false,
  diabetes: data?.diabetes ?? false,
  hemorrhage: data?.hemorrhage ?? false,
  cardiovascular: data?.cardiovascular ?? false,
  pregnancy: data?.pregnancy ?? false,
  others: data?.others ?? "",
  clientId: data?.clientId ?? "",
});

const Antecedent = ({ data }: Props) => {
  const { mutate } = useUpdateCustumerAntecedentQuery();
  const form = useForm<AntecedentRequestDTO>({
    resolver: zodResolver(antecedentSchema.partial()),
    defaultValues: buildDefaultValues(data),
  });

  const onSubmit = (values: AntecedentRequestDTO) => {
    if (!values.clientId) return;

    mutate(
      {
        id: values.clientId,
        data: values,
      },
      {
        onSuccess: () => {
          form.reset(buildDefaultValues(values));
        },
      },
    );
  };
  const handleSave = () => {
    form.handleSubmit(onSubmit)();
  };
  const handleDiscard = () => {
    form.reset(buildDefaultValues(data));
  };
  return (
    <FormWrapper form={form} onSubmit={onSubmit} className="w-full px-2">
      <div className="grid gap-4 md:grid-cols-2">
        <InputFx
          name="lastAppointment"
          label="Ultima cita"
          placeholder="Ultima cita"
          icon={<CalendarIcon />}
        />
        <InputFx
          name="numberOfBrushesPerDay"
          type="number"
          label="Cepillados por dia"
          min={0}
          icon={<Timer />}
        />
        {/* <div className="flex gap-2 items-center">
          <Typography variant="small">Ruidos extraños o dolor cuando abre la boca</Typography>
          <MultiCheckboxFx name="pain" label="SI" value={true} className="w-20" />
          <MultiCheckboxFx name="pain" label="NO" value={false} />
        </div> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextAreaFx
          name="painDetails"
          label="Detalle de dolor"
          placeholder="si/no, observaciones"
        />
        <TextAreaFx
          name="clenchDetails"
          label="Detalle de apretamiento"
          placeholder="si/no, observaciones"
        />
        <TextAreaFx
          name="headacheDetails"
          label="Detalle de dolor de cabeza"
          placeholder="si/no, observaciones"
        />
        <TextAreaFx
          name="medicationDetails"
          label="Detalle de medicacion"
          placeholder="si/no, observaciones"
        />
        <TextAreaFx
          name="allergiesDetails"
          label="Detalle de alergias"
          placeholder="si/no, observaciones"
        />
        <TextAreaFx
          name="others"
          label="Otros antecedentes"
          placeholder="Observaciones adicionales"
        />
      </div>

      <UnsavedChangesBar
        visible={form.formState.isDirty}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </FormWrapper>
  );
};

export default Antecedent;
