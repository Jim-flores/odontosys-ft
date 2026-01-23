import { useState } from "react";
import { defaultValues, FormSchema, formSchema } from "./schema/formSchema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
// import { z } from "zod"
import InputFx from "@/components/customFormFields/InputFx";
import { Button } from "@/components/ui/button";
import SelectFx from "@/components/customFormFields/SelectFx";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderTabs from "./components/HeaderTabs";
import {
  LucideHotel,
  LucideHouse,
  LucideLanguages,
  LucideLetterText,
  LucideMapPin,
  LucideTrendingUp,
} from "lucide-react";
import { useDialogStore } from "@/store/useDialogStore";
import DetailsForm from "./components/DetailsForm";
export type Step = "personal" | "document" | "address";

const optionsGender = [
  { label: "Hombre", value: "Hombre" },
  { label: "Mujer", value: "Mujer" },
];
const optionsDoc = [
  { label: "DNI", value: "DNI" },
  { label: "PASSPORT", value: "PASSPORT" },
];
const FormExample = () => {
  const [step, setStep] = useState<Step>("personal");
  const [validStep, setValidStep] = useState<string[]>(["personal"]);
  const { openDialog } = useDialogStore();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onTouched",
  });

  // const { getValues, setError } = form

  async function validateCurrentStep(step: Step, next: Step): Promise<boolean> {
    const values = form.getValues(step);
    const result = formSchema.shape[step].safeParse(values);

    if (result.success) {
      if (!validStep.includes(next)) setValidStep([...validStep, next]);
      return true;
    }

    result.error.issues.forEach((issue) => {
      const fieldPath = `${step}.${issue.path.join(".")}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setError(fieldPath as any, {
        message: issue.message,
      });
    });

    return false;
  }

  async function nextStep(next: Step) {
    const ok = await validateCurrentStep(step, next);
    if (ok) setStep(next);
  }

  async function onSubmit(values: FormSchema) {
    console.log(values);
    toast.success("Formulario enviado correctamente");
  }
  const handleStepChange = (value: string) => {
    setStep(value as Step);
  };

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      className="w-full flex justify-center align-middle items-center"
    >
      <Tabs value={step} onValueChange={handleStepChange} className="lg:w-2/3">
        <TabsList className="flex flex-col gap-4 w-full">
          <HeaderTabs validSteps={validStep} />
        </TabsList>
        <TabsContent value="personal" className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <img
              src="/images/first.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 space-y-6">
            <InputFx
              name="personal.firstName"
              label="Nombres"
              icon={<LucideLanguages />}
            />
            <InputFx
              name="personal.lastName"
              label="Apellidos"
              icon={<LucideLetterText />}
            />
            <InputFx
              name="personal.age"
              label="Edad"
              icon={<LucideTrendingUp />}
            />
            <Button type="button" onClick={() => nextStep("document")}>
              Siguiente
            </Button>
          </div>
        </TabsContent>

        {/* DOCUMENTO */}
        <TabsContent value="document" className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <img
              src="/images/second.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 space-y-6">
            <SelectFx
              label="Tipo Documento"
              name="document.documentType"
              options={optionsDoc}
              getLabel={(r) => r.label}
              getValue={(r) => r.value}
            />
            <InputFx
              name="document.documentNumber"
              label="N° Documento"
              placeholder="71990087"
            />
            <SelectFx
              label="Género"
              name="document.gender"
              options={optionsGender}
              getLabel={(r) => r.label}
              getValue={(r) => r.value}
            />
            <Button type="button" onClick={() => nextStep("address")}>
              Siguiente
            </Button>
          </div>
        </TabsContent>

        {/* ADDRESS */}
        <TabsContent value="address" className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <img
              src="/images/third.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 space-y-6">
            <InputFx
              name="address.street"
              label="Calle"
              icon={<LucideHouse />}
            />
            <InputFx
              name="address.city"
              label="Ciudad"
              icon={<LucideHotel />}
            />
            <InputFx
              name="address.country"
              label="Pais"
              icon={<LucideMapPin />}
            />
            <Button
              type="button"
              onClick={() =>
                openDialog(
                  () => <DetailsForm form={form} onSubmit={onSubmit} />,
                  {
                    title: "Detalles del Formulario",
                  },
                )
              }
            >
              Enviar Formulario
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </FormWrapper>
  );
};

export default FormExample;
