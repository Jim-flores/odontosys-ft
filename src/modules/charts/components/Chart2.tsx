"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    month: "Ene",
    total: 120,
    attended: 82,
  },
  {
    month: "Feb",
    total: 135,
    attended: 94,
  },
  {
    month: "Mar",
    total: 148,
    attended: 105,
  },
  {
    month: "Abr",
    total: 162,
    attended: 118,
  },
  {
    month: "May",
    total: 175,
    attended: 127,
  },
  {
    month: "Jun",
    total: 190,
    attended: 142,
  },
];

const chartConfig = {
  total: {
    label: "Total de pacientes",
    color: "var(--chart-1)",
  },
  attended: {
    label: "Pacientes atendidos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function Chart2() {
  return (
    <Card className="flex min-h-0 flex-col">
      <CardHeader>
        <CardTitle>Pacientes por mes</CardTitle>

        <CardDescription>
          Comparación entre pacientes totales y pacientes atendidos
        </CardDescription>
      </CardHeader>

      <CardContent className="min-h-0 flex-1">
        <ChartContainer
          config={chartConfig}
          className="h-full min-h-0 w-full aspect-auto"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <YAxis tickLine={false} axisLine={false} tickMargin={10} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <ChartLegend content={<ChartLegendContent />} />

            <Bar dataKey="total" fill="var(--color-total)" radius={4} />

            <Bar dataKey="attended" fill="var(--color-attended)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
