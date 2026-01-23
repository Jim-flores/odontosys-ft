import { Button } from "@/components/ui/button";
import { Step } from "../FormExample";
import { ChevronRight, HouseIcon, IdCard } from "lucide-react";
import React from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/Typography";

export interface StepProps {
  key: Step;
  label: string;
  icon: React.ReactNode;
}
const steps: StepProps[] = [
  { key: "personal", label: "Datos personales", icon: <PersonIcon /> },
  { key: "document", label: "Documento", icon: <IdCard /> },
  { key: "address", label: "Dirección", icon: <HouseIcon /> },
];
interface Props {
  validSteps: string[];
}
const HeaderTabs = ({ validSteps }: Props) => {
  console.log(validSteps);
  return (
    <div className="flex w-full items-center justify-center gap-6">
      {steps.map((step, index) => {
        const isDisabled = !validSteps.includes(step.key);

        return (
          <React.Fragment key={step.key}>
            {/* STEP */}
            <TabsTrigger value={step.key} disabled={isDisabled} asChild>
              <Button
                type="button"
                variant="ghost"
                className="flex items-center gap-2 data-[state=active]:bg-secondary             data-[state=active]:text-primary"
              >
                <span className="rounded-2xl w-6 h-6 flex items-center justify-center">
                  {step.icon}
                </span>
                <Typography variant="small" className="hidden sm:flex">
                  {step.label}
                </Typography>
              </Button>
            </TabsTrigger>

            {/* SEPARATOR */}
            {index !== steps.length - 1 && (
              <span className="flex items-center justify-center">
                <ChevronRight size={16} className="text-muted-foreground" />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default HeaderTabs;
