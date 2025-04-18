"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Target,
  Calculator,
  Trash2,
  Edit,
  Trophy,
  AlertCircle,
  Gift,
  Plane,
  Smartphone,
  Home,
  Car,
  CreditCard,
  Coins,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample goals data
const goals = [
  {
    id: 1,
    title: "New Laptop",
    icon: "laptop",
    category: "gadget",
    target: 60000,
    current: 15000,
    deadline: "Dec 2023",
    frequency: "monthly",
    status: "active",
    weeklySaving: 3000,
  },
  {
    id: 2,
    title: "Trip to Goa",
    icon: "trip",
    category: "travel",
    target: 45000,
    current: 28000,
    deadline: "Mar 2024",
    frequency: "monthly",
    status: "active",
    weeklySaving: 1200,
  },
  {
    id: 3,
    title: "Emergency Fund",
    icon: "emergency",
    category: "savings",
    target: 200000,
    current: 120000,
    deadline: "Ongoing",
    frequency: "monthly",
    status: "active",
    weeklySaving: 5000,
  },
  {
    id: 4,
    title: "Pay off Credit Card",
    icon: "credit",
    category: "debt",
    target: 35000,
    current: 5000,
    deadline: "Oct 2023",
    frequency: "monthly",
    status: "active",
    weeklySaving: 2500,
  },
]

// Goal icon components map
const goalIcons: Record<string, React.ReactNode> = {
  laptop: <Smartphone className="h-5 w-5" />,
  trip: <Plane className="h-5 w-5" />,
  emergency: <Coins className="h-5 w-5" />,
  credit: <CreditCard className="h-5 w-5" />,
  home: <Home className="h-5 w-5" />,
  car: <Car className="h-5 w-5" />,
  gift: <Gift className="h-5 w-5" />,
}

export default function GoalsPage() {
  const [activeGoals, setActiveGoals] = useState(goals)
  const [searchQuery, setSearchQuery] = useState("")

  // Calculate total progress
  const totalTargets = activeGoals.reduce((acc, goal) => acc + goal.target, 0)
  const totalSaved = activeGoals.reduce((acc, goal) => acc + goal.current, 0)
  const overallProgress = Math.round((totalSaved / totalTargets) * 100)

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">Track and manage your financial goals</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Goal</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a New Goal</DialogTitle>
              <DialogDescription>Set up a new savings goal to track your progress</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input id="goal-title" placeholder="e.g., New Laptop" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="target-amount">Target Amount (₹)</Label>
                  <Input id="target-amount" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="current-amount">Current Amount (₹)</Label>
                  <Input id="current-amount" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="gadget">Gadget</SelectItem>
                      <SelectItem value="debt">Debt Repayment</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Select>
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">Laptop/Gadget</SelectItem>
                    <SelectItem value="trip">Travel</SelectItem>
                    <SelectItem value="emergency">Emergency Fund</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="gift">Gift</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Savings Frequency</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeGoals.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Active savings targets</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Amount Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSaved.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">Across all goals</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalTargets.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">Combined goal amount</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Active Goals</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeGoals.map((goal) => {
          const progress = Math.round((goal.current / goal.target) * 100)
          return (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        goal.category === "travel"
                          ? "bg-blue-100 text-blue-700"
                          : goal.category === "gadget"
                            ? "bg-purple-100 text-purple-700"
                            : goal.category === "savings"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {goalIcons[goal.icon]}
                    </div>
                    <CardTitle>{goal.title}</CardTitle>
                  </div>
                  <Badge variant="outline">{goal.deadline === "Ongoing" ? "Ongoing" : goal.deadline}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 mb-4" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Current</div>
                    <div className="font-medium">₹{goal.current.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Target</div>
                    <div className="font-medium">₹{goal.target.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted rounded-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium mb-1">Recommended savings</div>
                    <div className="flex items-center text-sm">
                      <Calculator className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>₹{goal.weeklySaving} / week</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-8">
                    Add Funds
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </CardFooter>
            </Card>
          )
        })}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center p-6 border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Create a New Goal</h3>
              <p className="text-sm text-muted-foreground text-center">
                Set up a new savings target to track your progress
              </p>
            </Card>
          </DialogTrigger>
          <DialogContent>{/* Same content as the Add Goal dialog above */}</DialogContent>
        </Dialog>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Goal Recommendations</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Emergency Fund</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Having 3-6 months of expenses as an emergency fund is essential for financial security.
                  </p>
                  <Button size="sm">Create Goal</Button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Retirement Fund</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Start a retirement fund to ensure long-term financial stability.
                  </p>
                  <Button size="sm">Create Goal</Button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Vehicle Purchase</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Save for a vehicle purchase to avoid high-interest loans.
                  </p>
                  <Button size="sm">Create Goal</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                <div className="flex items-center gap-2 font-medium text-blue-700 dark:text-blue-300 mb-1">
                  <Target className="h-5 w-5" />
                  <span>Your "Trip to Goa" goal is 62% complete</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  At your current savings rate, you'll reach this goal 2 weeks ahead of schedule. Great work!
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
                <div className="flex items-center gap-2 font-medium text-amber-700 dark:text-amber-300 mb-1">
                  <AlertCircle className="h-5 w-5" />
                  <span>Your "New Laptop" goal is behind schedule</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Increase your weekly savings by ₹500 to stay on track for your December deadline.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
                <div className="flex items-center gap-2 font-medium text-green-700 dark:text-green-300 mb-1">
                  <Trophy className="h-5 w-5" />
                  <span>Automatic savings suggestion</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set up automatic transfers of ₹2,500 per week to reach your goals faster and more consistently.
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Set Up Auto-Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
