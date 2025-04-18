"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowDownRight, ArrowUpRight, Download, Calendar, Filter } from "lucide-react"

// Sample monthly trends data
const monthlySpendingData = [
  { month: "Jan", expenses: 12000 },
  { month: "Feb", expenses: 13200 },
  { month: "Mar", expenses: 11800 },
  { month: "Apr", expenses: 14500 },
  { month: "May", expenses: 13900 },
  { month: "Jun", expenses: 12700 },
  { month: "Jul", expenses: 15200 },
]

// Sample monthly category data
const categoryData = [
  { name: "Dining", value: 4200, color: "var(--chart-1)" },
  { name: "Groceries", value: 3200, color: "var(--chart-2)" },
  { name: "Transport", value: 2500, color: "var(--chart-3)" },
  { name: "Entertainment", value: 1800, color: "var(--chart-4)" },
  { name: "Utilities", value: 2100, color: "var(--chart-5)" },
  { name: "Other", value: 1400, color: "var(--chart-6)" },
]

// Sample predicted spending
const predictedData = [
  { category: "Dining", current: 4200, predicted: 4500 },
  { category: "Groceries", current: 3200, predicted: 3400 },
  { category: "Transport", current: 2500, predicted: 2200 },
  { category: "Entertainment", current: 1800, predicted: 2000 },
  { category: "Utilities", current: 2100, predicted: 2100 },
  { category: "Other", current: 1400, predicted: 1500 },
]

// Sample comparison data for current vs. previous period
const comparisonData = [
  { category: "Dining", current: 4200, previous: 3900 },
  { category: "Groceries", current: 3200, previous: 3500 },
  { category: "Transport", current: 2500, previous: 2800 },
  { category: "Entertainment", current: 1800, previous: 1600 },
  { category: "Utilities", current: 2100, previous: 2100 },
  { category: "Other", current: 1400, previous: 1200 },
]

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("monthly")

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">View your spending patterns and predictions</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>July 2023</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Spending (July)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹15,200</div>
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>3.8% vs. June</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Dining</div>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                  <span>₹4,200 (28% of total)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Predicted August</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹16,100</div>
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>5.9% vs. July</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Largest Change</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Entertainment</div>
                <div className="flex items-center gap-1 mt-1 text-green-500 text-sm">
                  <ArrowDownRight className="h-3 w-3" />
                  <span>12.5% vs. June</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
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
                      <LineChart data={monthlySpendingData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis
                          dataKey="month"
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
                          tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <ChartTooltip content={<ChartTooltipContent prefix="₹" />} />
                        <Line
                          type="monotone"
                          dataKey="expenses"
                          stroke="var(--color-expenses)"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
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
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent prefix="₹" />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {categoryData.map((category) => (
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
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Predicted vs. Current Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    current: {
                      label: "Current",
                      color: "hsl(var(--chart-1))",
                    },
                    predicted: {
                      label: "Predicted (August)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={predictedData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                      <YAxis type="category" dataKey="category" axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent prefix="₹" />} />
                      <Legend />
                      <Bar
                        dataKey="current"
                        fill="var(--color-current)"
                        name="Current (July)"
                        barSize={20}
                        radius={[4, 4, 4, 4]}
                      />
                      <Bar
                        dataKey="predicted"
                        fill="var(--color-predicted)"
                        name="Predicted (August)"
                        barSize={20}
                        radius={[4, 4, 4, 4]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          {/* Trends content */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">{/* More detailed trend chart would go here */}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {/* Categories content */}
          <Card>
            <CardHeader>
              <CardTitle>Category Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">{/* More detailed category charts would go here */}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          {/* Predictions content */}
          <Card>
            <CardHeader>
              <CardTitle>Spending Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">{/* More detailed prediction charts would go here */}</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
