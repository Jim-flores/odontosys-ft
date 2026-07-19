import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Typography } from "@/components/ui/Typography";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Chart2 } from "./components/Chart2";
import { Chart1 } from "./components/Chart1";

const items = [
  { value: "puno", label: "puno" },
  { value: "juliaca", label: "juliaca" },
  { value: "arequipa", label: "arequipa" },
];

const treatmentItems = [
  { label: "Extraccion", value: "20" },
  { label: "Ortodoncia", value: "30" },
  { label: "Control", value: "35" },
];

const doctorItems = [
  { label: "Dr. Alex", value: "S/. 5 000.00" },
  { label: "Dra. Maria", value: "S/. 4 000.00" },
  { label: "Dr. Javier", value: "S/. 3 000.00" },
];

const Charts = () => {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="flex shrink-0 items-center justify-between">
          <Typography variant="h3">Resumen general</Typography>
          <Select>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Todas las sedes" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid min-h-28 shrink-0 w-full auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex h-full w-full flex-col items-start justify-center overflow-hidden rounded-xl bg-muted p-4">
            <span>
              <Typography variant="h4">INGRESOS</Typography>
            </span>
            <span>
              <Typography variant="p">S/. 45 000.00</Typography>
            </span>
            <span>
              <Typography
                variant="muted"
                className="text-green-400 flex items-center"
              >
                <ArrowUpIcon size={14} />
                12%
              </Typography>
            </span>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center overflow-hidden rounded-xl bg-muted p-4">
            <span>
              <Typography variant="h4">POR COBRAR</Typography>
            </span>
            <span>
              <Typography variant="p">S/. 8 000.00</Typography>
            </span>
            <span>
              <Typography
                variant="muted"
                className="text-red-400 flex items-center"
              >
                <ArrowDownIcon size={14} />
                5%
              </Typography>
            </span>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center overflow-hidden rounded-xl bg-muted p-4">
            <span>
              <Typography variant="h4">CITAS</Typography>
            </span>
            <span>
              <Typography variant="p">+ 342</Typography>
            </span>
            <span>
              <Typography
                variant="muted"
                className="text-green-400 flex items-center"
              >
                <ArrowUpIcon size={14} />
                10%
              </Typography>
            </span>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center overflow-hidden rounded-xl bg-muted p-4">
            <span>
              <Typography variant="h4">PACIENTES NUEVOS</Typography>
            </span>
            <span>
              <Typography variant="p">+ 48</Typography>
            </span>
            <span>
              <Typography
                variant="muted"
                className="text-green-400 flex items-center"
              >
                <ArrowUpIcon size={14} />
                7%
              </Typography>
            </span>
          </div>
        </div>
        <div className="grid min-h-90 w-full flex-[2_1_0] grid-cols-1 gap-4 sm:grid-cols-2">
          <Chart2 />
          <Chart1 />
        </div>
        <div className="grid min-h-45 w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <Typography variant="large">Tratamientos</Typography>
              <Typography variant="muted">Total 85</Typography>
            </div>
            <div className="min-h-0 space-y-2 overflow-auto">
              {treatmentItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-lg bg-muted/45 px-3 py-2"
                >
                  <Typography variant="muted">{item.label}</Typography>
                  <Typography variant="muted">{item.value}</Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <Typography variant="large">Doctores</Typography>
              <Typography variant="muted">Ingresos</Typography>
            </div>
            <div className="min-h-0 space-y-2 overflow-auto">
              {doctorItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-lg bg-muted/45 px-3 py-2"
                >
                  <Typography variant="muted">{item.label}</Typography>
                  <Typography variant="muted" className="text-right">
                    {item.value}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
