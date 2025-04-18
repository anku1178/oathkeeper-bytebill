"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate mock data for the chart
const weeklyData = [
  { name: "Mon", expenses: 580 },
  { name: "Tue", expenses: 450 },
  { name: "Wed", expenses: 350 },
  { name: "Thu", expenses: 620 },
  { name: "Fri", expenses: 890 },
  { name: "Sat", expenses: 750 },
  { name: "Sun", expenses: 420 },
]

const monthlyData = [
  { name: "Week 1", expenses: 3100 },
  { name: "Week 2", expenses: 4200 },
  { name: "Week 3", expenses: 3800 },
  { name: "Week 4", expenses: 4100 },
]

interface ExpensesChartProps {
  timeframe: "weekly" | "monthly"
}

export function ExpensesChart({ timeframe }: ExpensesChartProps) {
  const data = timeframe === "weekly" ? weeklyData : monthlyData

  return (
    <ChartContainer
      config={{
        expenses: {
          label: "Expenses",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <defs>
            <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-expenses)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="var(--color-expenses)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            stroke="var(--muted-foreground)"
            fontSize={12}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickFormatter={(value) => `₹${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent prefix="₹" />} />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="var(--color-expenses)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
            fill="url(#expensesFill)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
