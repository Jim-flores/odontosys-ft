"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
    arequipa: 24500,
    puno: 18200,
    juliaca: 15800,
  },
  {
    month: "Feb",
    arequipa: 26800,
    puno: 19500,
    juliaca: 17200,
  },
  {
    month: "Mar",
    arequipa: 25300,
    puno: 21000,
    juliaca: 18500,
  },
  {
    month: "Abr",
    arequipa: 29100,
    puno: 22400,
    juliaca: 20100,
  },
  {
    month: "May",
    arequipa: 31500,
    puno: 21800,
    juliaca: 22300,
  },
  {
    month: "Jun",
    arequipa: 33800,
    puno: 24700,
    juliaca: 23500,
  },
];

const chartConfig = {
  arequipa: {
    label: "Arequipa",
    color: "var(--chart-1)",
  },
  puno: {
    label: "Puno",
    color: "var(--chart-2)",
  },
  juliaca: {
    label: "Juliaca",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function Chart1() {
  return (
    <Card className="flex min-h-0 flex-col">
      <CardHeader>
        <CardTitle>Ingresos por sucursal</CardTitle>

        <CardDescription>
          Comparación de ingresos mensuales entre las tres sucursales
        </CardDescription>
      </CardHeader>

      <CardContent className="min-h-0 flex-1">
        <ChartContainer
          config={chartConfig}
          className="h-full min-h-0 w-full aspect-auto"
        >
          <AreaChart
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
              axisLine={false}
              tickMargin={10}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `S/ ${(value / 1000).toFixed(0)}k`}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value) =>
                    `S/ ${Number(value).toLocaleString("es-PE")}`
                  }
                />
              }
            />

            <ChartLegend content={<ChartLegendContent />} />

            <defs>
              <linearGradient id="fillArequipa" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-arequipa)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-arequipa)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillPuno" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-puno)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-puno)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillJuliaca" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-juliaca)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-juliaca)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey="arequipa"
              type="natural"
              fill="url(#fillArequipa)"
              fillOpacity={0.4}
              stroke="var(--color-arequipa)"
              stackId="a"
            />

            <Area
              dataKey="puno"
              type="natural"
              fill="url(#fillPuno)"
              fillOpacity={0.4}
              stroke="var(--color-puno)"
              stackId="b"
            />

            <Area
              dataKey="juliaca"
              type="natural"
              fill="url(#fillJuliaca)"
              fillOpacity={0.4}
              stroke="var(--color-juliaca)"
              stackId="c"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
