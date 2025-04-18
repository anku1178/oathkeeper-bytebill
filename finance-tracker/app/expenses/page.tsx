"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  SlidersHorizontal,
  Calendar,
  CreditCard,
  Tag,
  FileText,
  Trash2,
  Edit,
  Sparkles,
  Gift,
  Trophy,
  Target,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

const expenseCategories = [
  "Dining",
  "Groceries",
  "Transport",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Health",
  "Travel",
  "Education",
  "Other",
]

// Sample expenses for display
const expenses = [
  {
    id: 1,
    merchant: "Urban Cafe",
    category: "Dining",
    amount: 450,
    date: "Jul 20, 2023",
    paymentMethod: "Credit Card",
    recurring: false,
    notes: "Lunch with colleagues",
  },
  {
    id: 2,
    merchant: "Grocery Mart",
    category: "Groceries",
    amount: 1250,
    date: "Jul 19, 2023",
    paymentMethod: "Debit Card",
    recurring: false,
    notes: "Weekly groceries",
  },
  {
    id: 3,
    merchant: "Amazon",
    category: "Shopping",
    amount: 1899,
    date: "Jul 15, 2023",
    paymentMethod: "Credit Card",
    recurring: false,
    notes: "Bluetooth headphones",
  },
  {
    id: 4,
    merchant: "Electric Co.",
    category: "Utilities",
    amount: 1200,
    date: "Jul 13, 2023",
    paymentMethod: "Auto Debit",
    recurring: true,
    notes: "Monthly electricity bill",
  },
  {
    id: 5,
    merchant: "Netflix",
    category: "Entertainment",
    amount: 499,
    date: "Jul 10, 2023",
    paymentMethod: "Credit Card",
    recurring: true,
    notes: "Monthly subscription",
  },
  {
    id: 6,
    merchant: "Metro",
    category: "Transport",
    amount: 150,
    date: "Jul 10, 2023",
    paymentMethod: "UPI",
    recurring: false,
    notes: "Commute to office",
  },
  {
    id: 7,
    merchant: "Pharmacy",
    category: "Health",
    amount: 350,
    date: "Jul 8, 2023",
    paymentMethod: "Cash",
    recurring: false,
    notes: "Medications",
  },
  {
    id: 8,
    merchant: "Pizza Hut",
    category: "Dining",
    amount: 780,
    date: "Jul 5, 2023",
    paymentMethod: "Credit Card",
    recurring: false,
    notes: "Weekend dinner",
  },
]

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showRewardDialog, setShowRewardDialog] = useState(false)

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.notes.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "recurring" && expense.recurring) ||
      (activeTab === "non-recurring" && !expense.recurring)

    return matchesSearch && matchesCategory && matchesTab
  })

  // Simulated function to add an expense and show rewards
  const handleAddExpense = () => {
    // In a real app, this would add the expense to the database
    // For demo purposes, we'll just show the reward dialog
    setShowRewardDialog(true)
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">Manage and track all your expenses</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Expense</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>Enter the details of your expense below</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="merchant">Merchant</Label>
                <Input id="merchant" placeholder="Enter merchant name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="debit-card">Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="auto-debit">Auto Debit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input id="notes" placeholder="Add any additional notes" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="recurring" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="recurring">This is a recurring expense</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddExpense}>
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reward Dialog */}
        <Dialog open={showRewardDialog} onOpenChange={setShowRewardDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">Expense Added!</DialogTitle>
            </DialogHeader>
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700 mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">+25 XP Earned</h3>
              <p className="text-muted-foreground mb-4">
                You've earned points for tracking your expense. Keep it up to level up!
              </p>

              <div className="w-full bg-muted p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Streak Progress</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">16 day streak</span>
                  <span>4 days to next reward</span>
                </div>
                <Progress value={80} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Log an expense every day to maintain your streak and earn bonus rewards!
                </p>
              </div>

              <div className="flex gap-3 mb-2">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 mb-1">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="text-xs">5 more for badge</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-1">
                    <Gift className="h-5 w-5" />
                  </div>
                  <span className="text-xs">Level 13 in 550 XP</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowRewardDialog(false)} className="w-full">
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {expenseCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Advanced Filters</span>
        </Button>
      </div>

      {/* Gamification Challenge Banner */}
      <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Coffee Budget Challenge</h3>
                <p className="text-sm text-muted-foreground">Reduce coffee spending by 50% this week</p>
              </div>
            </div>
            <div className="flex flex-col sm:items-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">70% Complete</span>
                <Badge variant="outline">150 points</Badge>
              </div>
              <Progress value={70} className="h-2 w-full sm:w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
          <TabsTrigger value="non-recurring">Non-recurring</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Your Expenses</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-4 hover:bg-muted/50"
                    >
                      <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium truncate">{expense.merchant}</h3>
                          {expense.recurring && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              Recurring
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            <span>{expense.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{expense.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-3 w-3" />
                            <span>{expense.paymentMethod}</span>
                          </div>
                          {expense.notes && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span className="truncate">{expense.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-medium">₹{expense.amount}</div>
                        <div className="flex items-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="rounded-full bg-muted p-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium">No expenses found</h3>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recurring" className="m-0">
          <Card>
            <CardContent className="p-0">{/* Same content but filtered for recurring expenses */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="non-recurring" className="m-0">
          <Card>
            <CardContent className="p-0">{/* Same content but filtered for non-recurring expenses */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
