
import React, { useState } from 'react';
import { 
  Calendar, 
  Filter, 
  Plus, 
  Download, 
  Trash2, 
  Edit 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for expenses
const expenseData = [
  { id: 1, name: 'Grocery Shopping', category: 'Food', amount: 85.32, date: '2025-04-15', source: 'manual' },
  { id: 2, name: 'Netflix Subscription', category: 'Entertainment', amount: 15.99, date: '2025-04-14', source: 'email' },
  { id: 3, name: 'Electric Bill', category: 'Utilities', amount: 124.79, date: '2025-04-12', source: 'manual' },
  { id: 4, name: 'Uber Ride', category: 'Transportation', amount: 24.50, date: '2025-04-10', source: 'email' },
  { id: 5, name: 'Amazon Purchase', category: 'Shopping', amount: 67.99, date: '2025-04-08', source: 'email' },
  { id: 6, name: 'Dinner with Friends', category: 'Food', amount: 52.40, date: '2025-04-05', source: 'manual' },
];

// Categories with colors for visualization
const categories = [
  { name: 'Food', color: 'bg-green-500' },
  { name: 'Entertainment', color: 'bg-purple-500' },
  { name: 'Utilities', color: 'bg-blue-500' },
  { name: 'Transportation', color: 'bg-yellow-500' },
  { name: 'Shopping', color: 'bg-red-500' },
  { name: 'Other', color: 'bg-gray-500' },
];

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all-categories");
  const [selectedSource, setSelectedSource] = useState<string>("all-sources");
  
  // Filter expenses based on search term and filters
  const filteredExpenses = expenseData.filter(expense => {
    const matchesSearch = expense.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all-categories" ? true : expense.category === selectedCategory;
    const matchesSource = selectedSource === "all-sources" ? true : expense.source === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });
  
  // Calculate totals
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Get category color
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : 'bg-gray-500';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            Track and manage your spending
          </p>
        </div>
        <Button className="sm:self-start">
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select 
                onValueChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Select 
                onValueChange={(value) => setSelectedSource(value)}
                value={selectedSource}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sources">All Sources</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                This Month
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Expenses Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-6">
          <div>
            <CardTitle>Expense List</CardTitle>
            <CardDescription>
              {filteredExpenses.length} expenses totaling ${totalAmount.toFixed(2)}
            </CardDescription>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/40 p-3 text-sm font-medium">
              <div className="col-span-4 sm:col-span-5">Name</div>
              <div className="col-span-2 text-center hidden sm:block">Category</div>
              <div className="col-span-3 text-center sm:text-right">Amount</div>
              <div className="col-span-3 text-right hidden sm:block">Date</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <div 
                  key={expense.id} 
                  className="grid grid-cols-12 items-center border-b p-3 text-sm last:border-0"
                >
                  <div className="col-span-4 sm:col-span-5 font-medium">
                    {expense.name}
                    {expense.source === 'email' && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
                        Email
                      </Badge>
                    )}
                  </div>
                  <div className="col-span-2 text-center hidden sm:block">
                    <div className="inline-flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-1.5 ${getCategoryColor(expense.category)}`}></div>
                      <span>{expense.category}</span>
                    </div>
                  </div>
                  <div className="col-span-3 text-center sm:text-right font-medium">
                    ${expense.amount.toFixed(2)}
                  </div>
                  <div className="col-span-3 text-right text-muted-foreground hidden sm:block">
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No expenses found. Try adjusting your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
