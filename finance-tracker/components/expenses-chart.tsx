"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate mock data for the chart


interface ExpensesChartProps {
  timeframe: "weekly" | "monthly"
}

import { useEffect, useState } from "react"

export function ExpensesChart({ timeframe }: ExpensesChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/expenses/trends")
      .then(res => res.json())
      .then(json => {
        // You can adjust this if your backend returns both weekly and monthly
        setData(json.trends || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load chart data.");
        setLoading(false);
      });
  }, [timeframe]);

  if (loading) return <div className="h-full w-full flex items-center justify-center">Loading...</div>;
  if (error) return <div className="h-full w-full flex items-center justify-center text-red-500">{error}</div>;

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
