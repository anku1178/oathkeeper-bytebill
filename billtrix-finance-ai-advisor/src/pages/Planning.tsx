
import React from 'react';
import { CalendarClock, Download, HelpCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Planning = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Future Planning</h2>
          <p className="text-muted-foreground">
            Visualize your long-term financial journey
          </p>
        </div>
        <Button className="sm:self-start">
          <Download className="mr-2 h-4 w-4" /> Export Plan
        </Button>
      </div>
      
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Financial Inputs</CardTitle>
          <CardDescription>
            Provide your current financial details to generate a personalized plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="age" className="text-sm font-medium">Current Age</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your current age determines the timeline of your financial plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="age" type="number" placeholder="30" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="income" className="text-sm font-medium">Monthly Income</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your after-tax income that you can allocate to expenses and savings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="income" type="number" placeholder="5000" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="increment" className="text-sm font-medium">Expected Annual Increment (%)</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average yearly percentage increase you expect in your income</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="increment" type="number" placeholder="5" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="expenses" className="text-sm font-medium">Monthly Expenses</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your current average monthly expenses</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="expenses" type="number" placeholder="3500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="retirement-age" className="text-sm font-medium">Target Retirement Age</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>At what age do you plan to retire?</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="retirement-age" type="number" placeholder="65" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="risk" className="text-sm font-medium">Risk Appetite</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your comfort level with investment risk</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select>
                <SelectTrigger id="risk">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="mt-6 w-full sm:w-auto">Generate Financial Plan</Button>
        </CardContent>
      </Card>
      
      {/* Plan Timeline */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Your 30-Year Financial Roadmap</CardTitle>
            <CardDescription>
              Projected financial journey based on your inputs
            </CardDescription>
          </div>
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 text-left">
                  <th className="p-3 font-medium">Year</th>
                  <th className="p-3 font-medium">Age</th>
                  <th className="p-3 font-medium text-right">Income</th>
                  <th className="p-3 font-medium text-right">Expenses</th>
                  <th className="p-3 font-medium text-right">Savings</th>
                  <th className="p-3 font-medium hidden md:table-cell">Investment Focus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: 2025, age: 30, income: 60000, expenses: 42000, savings: 18000, focus: "Growth Stocks (70%), Bonds (20%), Cash (10%)" },
                  { year: 2030, age: 35, income: 76500, expenses: 51000, savings: 109500, focus: "Growth Stocks (65%), Index Funds (25%), Bonds (10%)" },
                  { year: 2035, age: 40, income: 97500, expenses: 62000, savings: 253100, focus: "Index Funds (50%), Dividend Stocks (30%), Bonds (20%)" },
                  { year: 2040, age: 45, income: 124600, expenses: 75200, savings: 436900, focus: "Dividend Stocks (40%), Index Funds (40%), Bonds (20%)" },
                  { year: 2045, age: 50, income: 159000, expenses: 91200, savings: 693500, focus: "Dividend Stocks (45%), Bonds (35%), Index Funds (20%)" },
                  { year: 2050, age: 55, income: 202800, expenses: 110400, savings: 1080300, focus: "Bonds (50%), Dividend Stocks (40%), Index Funds (10%)" },
                  { year: 2055, age: 60, income: 258700, expenses: 133800, savings: 1596000, focus: "Bonds (60%), Dividend Stocks (30%), Cash (10%)" },
                  { year: 2060, age: 65, income: 0, expenses: 162000, savings: 1933000, focus: "Bonds (70%), Dividend Stocks (20%), Cash (10%)" },
                ].map((row) => (
                  <tr key={row.year} className="border-b last:border-0">
                    <td className="p-3 font-medium">{row.year}</td>
                    <td className="p-3">{row.age}</td>
                    <td className="p-3 text-right">${row.income.toLocaleString()}</td>
                    <td className="p-3 text-right">${row.expenses.toLocaleString()}</td>
                    <td className="p-3 text-right font-medium">${row.savings.toLocaleString()}</td>
                    <td className="p-3 hidden md:table-cell text-muted-foreground">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            <h4 className="font-medium flex items-center mb-2">
              <Info className="h-4 w-4 mr-2" /> Financial Projection Notes
            </h4>
            <p className="text-sm">
              This projection assumes an average annual return of 7% on investments, 2.5% inflation rate, and your stated 5% annual income growth. Adjust your inputs for different scenarios.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Planning;
