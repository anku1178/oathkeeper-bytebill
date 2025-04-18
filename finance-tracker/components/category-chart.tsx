"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate mock data for the chart
const data = [
  { name: "Dining", value: 4200, color: "var(--chart-1)" },
  { name: "Groceries", value: 3200, color: "var(--chart-2)" },
  { name: "Transport", value: 2500, color: "var(--chart-3)" },
  { name: "Entertainment", value: 1800, color: "var(--chart-4)" },
  { name: "Utilities", value: 2100, color: "var(--chart-5)" },
  { name: "Other", value: 1400, color: "var(--chart-6)" },
]

export function CategoryChart() {
  return (
    <ChartContainer
      config={{
        Dining: {
          label: "Dining",
          color: "hsl(var(--chart-1))",
        },
        Groceries: {
          label: "Groceries",
          color: "hsl(var(--chart-2))",
        },
        Transport: {
          label: "Transport",
          color: "hsl(var(--chart-3))",
        },
        Entertainment: {
          label: "Entertainment",
          color: "hsl(var(--chart-4))",
        },
        Utilities: {
          label: "Utilities",
          color: "hsl(var(--chart-5))",
        },
        Other: {
          label: "Other",
          color: "hsl(var(--chart-6))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent prefix="₹" />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((category) => (
          <div key={category.name} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
            <div className="flex items-center justify-between w-full">
              <span className="text-xs">{category.name}</span>
              <span className="text-xs font-medium">₹{category.value}</span>
            </div>
          </div>
        ))}
      </div>
    </ChartContainer>
  )
}
