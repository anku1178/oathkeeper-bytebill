"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Medal,
  Star,
  Flame,
  Award,
  Gift,
  TrendingUp,
  Calendar,
  Target,
  Search,
  Filter,
  CreditCard,
  Sparkles,
  Zap,
} from "lucide-react"

// Mock badges data
const badges = [
  // Monthly badges
  {
    id: 1,
    name: "July Saver",
    description: "Saved 25% of income in July",
    icon: <Trophy className="h-6 w-6" />,
    date: "Jul 31, 2023",
    rarity: "gold",
    category: "monthly",
  },
  {
    id: 2,
    name: "June Budget Master",
    description: "Stayed under budget in all categories in June",
    icon: <Medal className="h-6 w-6" />,
    date: "Jun 30, 2023",
    rarity: "silver",
    category: "monthly",
  },
  {
    id: 3,
    name: "May Goal Achiever",
    description: "Completed a savings goal in May",
    icon: <Target className="h-6 w-6" />,
    date: "May 31, 2023",
    rarity: "bronze",
    category: "monthly",
  },

  // Achievement badges
  {
    id: 4,
    name: "Streak Master",
    description: "Maintained a 15-day streak",
    icon: <Flame className="h-6 w-6" />,
    date: "Jul 25, 2023",
    rarity: "silver",
    category: "achievement",
  },
  {
    id: 5,
    name: "Budget Champion",
    description: "Stayed under budget in all categories for 3 consecutive months",
    icon: <Award className="h-6 w-6" />,
    date: "Jul 20, 2023",
    rarity: "gold",
    category: "achievement",
  },
  {
    id: 6,
    name: "Expense Tracker",
    description: "Logged expenses for 30 consecutive days",
    icon: <Calendar className="h-6 w-6" />,
    date: "Jul 15, 2023",
    rarity: "silver",
    category: "achievement",
  },
  {
    id: 7,
    name: "Savings Milestone",
    description: "Saved ₹50,000 in total",
    icon: <TrendingUp className="h-6 w-6" />,
    date: "Jul 10, 2023",
    rarity: "gold",
    category: "achievement",
  },

  // Special badges
  {
    id: 8,
    name: "Early Adopter",
    description: "One of the first 1000 users of FinanceTracker",
    icon: <Star className="h-6 w-6" />,
    date: "May 15, 2023",
    rarity: "gold",
    category: "special",
  },
  {
    id: 9,
    name: "Feedback Provider",
    description: "Provided valuable feedback to improve the app",
    icon: <Gift className="h-6 w-6" />,
    date: "Jun 5, 2023",
    rarity: "silver",
    category: "special",
  },

  // Category badges
  {
    id: 10,
    name: "Dining Optimizer",
    description: "Reduced dining expenses by 20% in a month",
    icon: <CreditCard className="h-6 w-6" />,
    date: "Jul 5, 2023",
    rarity: "bronze",
    category: "category",
  },
  {
    id: 11,
    name: "Entertainment Saver",
    description: "Kept entertainment expenses under budget for 2 months",
    icon: <Sparkles className="h-6 w-6" />,
    date: "Jun 20, 2023",
    rarity: "silver",
    category: "category",
  },
  {
    id: 12,
    name: "Transport Economizer",
    description: "Reduced transport expenses by 15% in a month",
    icon: <Zap className="h-6 w-6" />,
    date: "May 25, 2023",
    rarity: "bronze",
    category: "category",
  },
]

// Locked badges (not yet earned)
const lockedBadges = [
  {
    id: 101,
    name: "Super Saver",
    description: "Save 30% of income for 6 consecutive months",
    icon: <Trophy className="h-6 w-6" />,
    rarity: "gold",
    category: "achievement",
    requirements: "Save 30% of your monthly income for 6 months in a row",
  },
  {
    id: 102,
    name: "Debt Free",
    description: "Pay off all your debts",
    icon: <Award className="h-6 w-6" />,
    rarity: "gold",
    category: "achievement",
    requirements: "Pay off all tracked debts in the app",
  },
  {
    id: 103,
    name: "Investment Guru",
    description: "Start tracking investments and reach ₹1,00,000",
    icon: <TrendingUp className="h-6 w-6" />,
    rarity: "silver",
    category: "achievement",
    requirements: "Track investments totaling ₹1,00,000 or more",
  },
]

export function BadgeCard() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter badges based on tab and search
  const filteredBadges = badges.filter((badge) => {
    const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || badge.category === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Badges</CardTitle>
        <CardDescription>Collect badges by achieving financial milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search badges..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="achievement">Achievements</TabsTrigger>
            <TabsTrigger value="category">Categories</TabsTrigger>
            <TabsTrigger value="special">Special</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center justify-center p-4 border rounded-lg text-center hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full mb-3 ${
                      badge.rarity === "gold"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                        : badge.rarity === "silver"
                          ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <h3 className="text-sm font-medium">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  <Badge variant="outline" className="mt-2">
                    {badge.date}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Badges to Unlock</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center justify-center p-4 border border-dashed rounded-lg text-center hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full mb-3 bg-muted text-muted-foreground">
                      {badge.icon}
                    </div>
                    <h3 className="text-sm font-medium">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    <Badge variant="outline" className="mt-2">
                      {badge.rarity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="m-0">
            {/* Similar content but filtered for monthly badges */}
          </TabsContent>

          <TabsContent value="achievement" className="m-0">
            {/* Similar content but filtered for achievement badges */}
          </TabsContent>

          <TabsContent value="category" className="m-0">
            {/* Similar content but filtered for category badges */}
          </TabsContent>

          <TabsContent value="special" className="m-0">
            {/* Similar content but filtered for special badges */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
