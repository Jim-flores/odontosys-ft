import { FileText, Stethoscope } from "lucide-react";
import Information from "./Information";
import Odontogram from "./Odontogram";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Antecedent from "./Antecedent";
import { useParams } from "react-router";
import { useCustumerInfoQuery } from "../../hooks/useCustumerInfoQuery";
import { Typography } from "@/components/ui/Typography";
import Treatment from "./Treatment";

const CustumerInformation = () => {
  const { id } = useParams();

  const { data: customer, isLoading, error } = useCustumerInfoQuery(id ?? "");

  if (isLoading) return <p>Cargando...</p>;

  if (error) return <p>Error al obtener cliente</p>;
  return (
    <section className="flex h-[calc(100vh-8rem)] min-h-0 w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        Historial Clinico de:{" "}
        <Typography variant="large" className="uppercase">
          {customer?.information?.name + " " + customer?.information?.lastName}
        </Typography>
      </div>

      <Tabs
        defaultValue="information"
        className="flex min-h-0 w-full flex-1 flex-col gap-4 h-full"
      >
        <TabsList className="grid h-auto w-full grid-cols-1 gap-2 rounded-xl bg-muted/60 p-2 sm:grid-cols-4">
          <TabsTrigger
            value="information"
            className="flex h-auto items-start justify-start gap-3 rounded-lg px-4 py-3 text-left hover:cursor-pointer"
          >
            <FileText data-icon="inline-start" />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Informacion</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="antecedent"
            className="flex h-auto items-start justify-start gap-3 rounded-lg px-4 py-3 text-left hover:cursor-pointer"
          >
            <FileText data-icon="inline-start" />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Antecedentes</span>
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="odontogram"
            className="flex h-auto items-start justify-start gap-3 rounded-lg px-4 py-3 text-left hover:cursor-pointer"
          >
            <Stethoscope data-icon="inline-start" />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Odontograma</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="treatment"
            className="flex h-auto items-start justify-start gap-3 rounded-lg px-4 py-3 text-left hover:cursor-pointer"
          >
            <Stethoscope data-icon="inline-start" />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Procedimiento</span>
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="min-h-0 flex-1">
          <ScrollArea className="h-full px-2">
            <Information data={customer?.information} />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="antecedent" className="min-h-0 flex-1">
          <ScrollArea className="h-full px-2">
            <Antecedent data={customer?.antecedents} />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="odontogram" className="min-h-0 flex-1">
          <ScrollArea className="h-full px-2">
            <Odontogram data={customer?.odontogram} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="treatment" className="min-h-0 flex-1">
          <ScrollArea className="h-full px-2">
            <Treatment />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default CustumerInformation;
