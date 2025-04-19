
import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// Mock data - will be replaced with actual API calls
const user = {
  name: 'Alex',
  monthlyBudget: 3000,
  totalSpent: 1850,
  savingsGoal: 1000,
  currentSavings: 750,
};

const categories = [
  { name: 'Food', spent: 450, budget: 500, color: 'bg-green-500' },
  { name: 'Rent', spent: 800, budget: 800, color: 'bg-blue-500' },
  { name: 'Entertainment', spent: 200, budget: 300, color: 'bg-purple-500' },
  { name: 'Utilities', spent: 150, budget: 200, color: 'bg-yellow-500' },
  { name: 'Shopping', spent: 250, budget: 200, color: 'bg-red-500' },
];

const Dashboard = () => {
  const remainingBudget = user.monthlyBudget - user.totalSpent;
  const percentSpent = (user.totalSpent / user.monthlyBudget) * 100;
  const savingsPercentage = (user.currentSavings / user.savingsGoal) * 100;
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name}
        </h2>
        <div>
          <Button className="shadow-sm">
            <DollarSign className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Monthly Overview Card */}
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Overview
            </CardTitle>
            <Badge variant={percentSpent > 80 ? 'destructive' : 'default'}>
              {percentSpent.toFixed(0)}% Used
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${user.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of ${user.monthlyBudget.toLocaleString()} budget
            </p>
            <Progress value={percentSpent} className="h-2 mt-4" />
            <div className="mt-3 flex items-center justify-between text-sm">
              <p>Remaining: <span className="font-medium">${remainingBudget.toLocaleString()}</span></p>
              <Link to="/expenses" className="text-primary flex items-center">
                Details <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend Card */}
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Trend
            </CardTitle>
            <div className="flex items-center">
              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm">-12%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$420</div>
            <p className="text-xs text-muted-foreground">
              spent this week
            </p>
            <div className="mt-4 h-[60px] grid grid-cols-7 gap-1 items-end">
              {[30, 45, 25, 60, 75, 40, 20].map((value, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className="bg-primary/70 rounded-sm w-full" 
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-[10px] mt-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Savings Goal Card */}
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Savings Goal
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${user.currentSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of ${user.savingsGoal.toLocaleString()} goal
            </p>
            <Progress value={savingsPercentage} className="h-2 mt-4" />
            <div className="mt-3 flex items-center justify-between text-sm">
              <p>Progress: <span className="font-medium">{savingsPercentage.toFixed(0)}%</span></p>
              <Link to="/goals" className="text-primary flex items-center">
                All Goals <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Expense by Category */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Your spending breakdown this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => {
                const percentUsed = (category.spent / category.budget) * 100;
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm">
                        ${category.spent} of ${category.budget}
                        {category.spent > category.budget && (
                          <Badge variant="destructive" className="ml-2">Over</Badge>
                        )}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${category.color}`} 
                        style={{ width: `${Math.min(percentUsed, 100)}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Manage your finances</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link to="/expenses" className="flex flex-col items-center p-4 border rounded-md hover:bg-secondary transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Expenses</span>
            </Link>
            
            <Link to="/goals" className="flex flex-col items-center p-4 border rounded-md hover:bg-secondary transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Goals</span>
            </Link>
            
            <Link to="/predictions" className="flex flex-col items-center p-4 border rounded-md hover:bg-secondary transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Predictions</span>
            </Link>
            
            <Link to="/receipts" className="flex flex-col items-center p-4 border rounded-md hover:bg-secondary transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Receipts</span>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Badge variant="outline" className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
          Data updated 2 mins ago
        </Badge>
      </div>
    </div>
  );
};

export default Dashboard;
