
import React from 'react';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for predictions
const predictionsData = {
  totalExpected: 2850,
  previousMonth: 2600,
  categories: [
    { name: 'Food', predicted: 550, previous: 450, trend: 'up', warning: true },
    { name: 'Rent', predicted: 800, previous: 800, trend: 'neutral' },
    { name: 'Entertainment', predicted: 280, previous: 200, trend: 'up', warning: true },
    { name: 'Utilities', predicted: 150, previous: 160, trend: 'down' },
    { name: 'Shopping', predicted: 200, previous: 250, trend: 'down' },
    { name: 'Transportation', predicted: 120, previous: 110, trend: 'up' },
    { name: 'Healthcare', predicted: 100, previous: 80, trend: 'up', warning: false },
    { name: 'Others', predicted: 650, previous: 550, trend: 'up', warning: true },
  ]
};

const Predictions = () => {
  const percentChange = Math.round(((predictionsData.totalExpected - predictionsData.previousMonth) / predictionsData.previousMonth) * 100);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Spending Predictions</h2>
        <p className="text-muted-foreground">
          AI-powered forecasting for your next month's expenses
        </p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Predicted Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${predictionsData.totalExpected}</div>
            <div className="flex items-center mt-1 text-xs">
              {percentChange > 0 ? (
                <div className="flex items-center text-red-500">
                  <TrendingUp className="h-3 w-3 mr-1" /> {percentChange}% increase
                </div>
              ) : (
                <div className="flex items-center text-green-500">
                  <TrendingDown className="h-3 w-3 mr-1" /> {Math.abs(percentChange)}% decrease
                </div>
              )}
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Spending Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {predictionsData.categories.filter(cat => cat.warning).length}
            </div>
            <p className="text-xs text-muted-foreground">Categories with spending warnings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Based on 3 months of data</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Category Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Category Forecast</CardTitle>
          <CardDescription>Your predicted spending by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/40 p-3 text-sm font-medium">
              <div className="col-span-3">Category</div>
              <div className="col-span-3 text-right">Predicted</div>
              <div className="col-span-3 text-right">Previous</div>
              <div className="col-span-3 text-right">Change</div>
            </div>
            {predictionsData.categories.map((category) => (
              <div key={category.name} className="grid grid-cols-12 items-center border-b p-3 text-sm last:border-0">
                <div className="col-span-3 font-medium">
                  {category.name}
                  {category.warning && (
                    <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-600 border-amber-200">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Warning
                    </Badge>
                  )}
                </div>
                <div className="col-span-3 text-right font-medium">
                  ${category.predicted}
                </div>
                <div className="col-span-3 text-right text-muted-foreground">
                  ${category.previous}
                </div>
                <div className="col-span-3 text-right">
                  {category.trend === 'up' && (
                    <div className="inline-flex items-center text-red-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+${category.predicted - category.previous}</span>
                    </div>
                  )}
                  {category.trend === 'down' && (
                    <div className="inline-flex items-center text-green-500">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span>-${category.previous - category.predicted}</span>
                    </div>
                  )}
                  {category.trend === 'neutral' && (
                    <div className="inline-flex items-center text-muted-foreground">
                      <span>No change</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>AI Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
            <h4 className="font-medium flex items-center mb-2">
              <AlertTriangle className="h-4 w-4 mr-2" /> Spending Warning
            </h4>
            <p className="text-sm">
              Your food expenses are projected to increase by 22%. Consider cooking at home more often to stay within your budget.
            </p>
          </div>
          
          <div className="p-4 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            <h4 className="font-medium flex items-center mb-2">
              <TrendingDown className="h-4 w-4 mr-2" /> Opportunity
            </h4>
            <p className="text-sm">
              Your shopping expenses are trending down, which could free up $50 to allocate to your "Hawaii Vacation" goal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Predictions;
