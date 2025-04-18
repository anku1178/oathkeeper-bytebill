"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Plus,
  Calendar,
  CreditCard,
  Receipt,
  ArrowRight,
  Flame,
  Trophy,
  Award,
  Target,
  Gift,
  Sparkles,
} from "lucide-react"
import { ExpensesChart } from "@/components/expenses-chart"
import { CategoryChart } from "@/components/category-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { GoalProgress } from "@/components/goal-progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState("monthly")

  // Mock streak data
  const streakData = {
    current: 16,
    lastUpdated: "Today",
  }

  // Mock points data
  const pointsData = {
    total: 2450,
    level: 12,
    nextLevel: 3000,
    recentlyEarned: 75,
  }

  // Mock badges data
  const recentBadges = [
    {
      id: 1,
      name: "July Saver",
      icon: <Trophy className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    },
    {
      id: 2,
      name: "Streak Master",
      icon: <Flame className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    },
    {
      id: 3,
      name: "Budget Champion",
      icon: <Award className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
  ]

  // Mock active challenge
  const activeChallenge = {
    title: "Coffee Budget Challenge",
    description: "Reduce coffee spending by 50% this week",
    progress: 70,
    endDate: "Aug 7, 2023",
    reward: "150 points",
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's an overview of your finances for July</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Expense</span>
        </Button>
      </div>

      {/* Gamification Status Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Level {pointsData.level}</span>
                  <Badge variant="outline" className="text-xs">
                    Finance Explorer
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{pointsData.total} XP</span>
                  <span className="mx-1">•</span>
                  <span className="text-green-600">+{pointsData.recentlyEarned} today</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-3 py-1.5 rounded-md">
                <Flame className="h-5 w-5" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{streakData.current} day streak!</span>
                  <span className="text-xs">Last updated: {streakData.lastUpdated}</span>
                </div>
              </div>

              <div className="flex flex-col flex-1 md:w-48">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Next Level</span>
                  <span>{Math.round((pointsData.total / pointsData.nextLevel) * 100)}%</span>
                </div>
                <Progress value={(pointsData.total / pointsData.nextLevel) * 100} className="h-2" />
              </div>

              <Button variant="outline" size="sm" className="hidden md:flex gap-1" asChild>
                <a href="/profile">
                  <span>View Profile</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses (July)</CardDescription>
            <CardTitle className="text-2xl">₹15,200</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">vs. last month</p>
              <div className="flex items-center gap-1 text-green-500">
                <TrendingDown className="h-3 w-3" />
                <span>4.3%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full gap-1">
              <span>View Details</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Weekly Trend</CardDescription>
            <CardTitle className="text-2xl">₹3,450</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">vs. last week</p>
              <div className="flex items-center gap-1 text-red-500">
                <TrendingUp className="h-3 w-3" />
                <span>2.7%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full gap-1">
              <span>Weekly Analysis</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Savings Progress</CardDescription>
            <CardTitle className="text-2xl">₹4,800</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">Goal: ₹8,000</p>
                <p className="font-medium">60%</p>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full gap-1">
              <span>View Goals</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Savings Rate</CardDescription>
            <CardTitle className="text-2xl">24%</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">vs. your goal</p>
              <div className="flex items-center gap-1 text-green-500">
                <ArrowUpRight className="h-3 w-3" />
                <span>+4%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full gap-1">
              <span>Optimize Savings</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 mt-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Expense Trends</CardTitle>
              <Tabs
                defaultValue="monthly"
                className="space-y-0"
                value={activeTimeframe}
                onValueChange={setActiveTimeframe}
              >
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="h-[300px]">
              <ExpensesChart timeframe={activeTimeframe} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>July 2023</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[300px]">
              <CategoryChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <GoalProgress title="New Laptop" current={15000} target={60000} deadline="Dec 2023" />
              <GoalProgress title="Vacation" current={28000} target={45000} deadline="Mar 2024" />
              <GoalProgress title="Emergency Fund" current={120000} target={200000} deadline="Ongoing" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Manage Goals
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* Gamification Elements */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              {recentBadges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center text-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full mb-2 ${badge.color}`}>
                    {badge.icon}
                  </div>
                  <span className="text-xs font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/profile?tab=badges">
                View All Badges
                <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{activeChallenge.title}</h3>
                  <p className="text-xs text-muted-foreground">{activeChallenge.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span>{activeChallenge.progress}%</span>
              </div>
              <Progress value={activeChallenge.progress} className="h-2 mb-2" />
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Ends: {activeChallenge.endDate}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Gift className="h-3 w-3 mr-1" />
                  <span>Reward: {activeChallenge.reward}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                <a href="/profile?tab=challenges">
                  View All Challenges
                  <ArrowRight className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="flex h-24 w-full flex-col items-center justify-center gap-1 p-2">
                <Plus className="h-6 w-6" />
                <span className="text-xs">Add Expense</span>
              </Button>
              <Button variant="outline" className="flex h-24 w-full flex-col items-center justify-center gap-1 p-2">
                <Calendar className="h-6 w-6" />
                <span className="text-xs">Schedule</span>
              </Button>
              <Button variant="outline" className="flex h-24 w-full flex-col items-center justify-center gap-1 p-2">
                <Receipt className="h-6 w-6" />
                <span className="text-xs">Scan Bill</span>
              </Button>
              <Button variant="outline" className="flex h-24 w-full flex-col items-center justify-center gap-1 p-2">
                <CreditCard className="h-6 w-6" />
                <span className="text-xs">Recurring</span>
              </Button>
              <Button variant="outline" className="flex h-24 w-full flex-col items-center justify-center gap-1 p-2">
                <CircleDollarSign className="h-6 w-6" />
                <span className="text-xs">Budget</span>
              </Button>
              <Button variant="outline" className="flex h-24 w-full flex-col items-center justify-center gap-1 p-2">
                <Sparkles className="h-6 w-6" />
                <span className="text-xs">Challenges</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
