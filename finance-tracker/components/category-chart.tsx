"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate mock data for the chart


import { useEffect, useState } from "react"

export function CategoryChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/expenses/categories")
      .then(res => res.json())
      .then(json => {
        setData(json.categories || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load category data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="h-full w-full flex items-center justify-center">Loading...</div>;
  if (error) return <div className="h-full w-full flex items-center justify-center text-red-500">{error}</div>;

  // Dynamically generate config and color for each category
  const config = data.reduce((acc: Record<string, any>, category: any, idx: number) => {
    const colorVar = `--chart-${(idx % 6) + 1}`;
    acc[category.name] = {
      label: category.name,
      color: `hsl(var(${colorVar}))`,
    };
    category.color = `hsl(var(${colorVar}))`;
    return acc;
  }, {});

  return (
    <ChartContainer
      config={config}
      className="h-full w-full"
    >
      <>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent prefix="₹" />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((category: any) => (
            <div key={category.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
              <div className="flex items-center justify-between w-full">
                <span className="text-xs">{category.name}</span>
                <span className="text-xs font-medium">₹{category.value}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    </ChartContainer>
  )
}
