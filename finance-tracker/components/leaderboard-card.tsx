"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Medal, Users, ArrowUp, ArrowDown, Minus, ChevronRight } from "lucide-react"

// Mock leaderboard data
const leaderboardData = {
  savings: [
    {
      id: 1,
      name: "Sarah J.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      score: "32%",
      change: "up",
      position: 1,
    },
    {
      id: 2,
      name: "Michael T.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MT",
      score: "28%",
      change: "up",
      position: 2,
    },
    {
      id: 3,
      name: "John D.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      score: "25%",
      change: "down",
      position: 3,
      isCurrentUser: true,
    },
    {
      id: 4,
      name: "Priya K.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PK",
      score: "24%",
      change: "same",
      position: 4,
    },
    {
      id: 5,
      name: "Alex W.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AW",
      score: "22%",
      change: "up",
      position: 5,
    },
  ],
  streaks: [
    {
      id: 1,
      name: "David L.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DL",
      score: "45 days",
      change: "up",
      position: 1,
    },
    {
      id: 2,
      name: "Emma S.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ES",
      score: "32 days",
      change: "same",
      position: 2,
    },
    {
      id: 3,
      name: "Raj P.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RP",
      score: "28 days",
      change: "up",
      position: 3,
    },
    {
      id: 4,
      name: "John D.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      score: "16 days",
      change: "up",
      position: 4,
      isCurrentUser: true,
    },
    {
      id: 5,
      name: "Lisa M.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LM",
      score: "14 days",
      change: "down",
      position: 5,
    },
  ],
  goals: [
    {
      id: 1,
      name: "Anita R.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AR",
      score: "5 goals",
      change: "same",
      position: 1,
    },
    {
      id: 2,
      name: "John D.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      score: "3 goals",
      change: "up",
      position: 2,
      isCurrentUser: true,
    },
    {
      id: 3,
      name: "Kevin P.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "KP",
      score: "3 goals",
      change: "down",
      position: 3,
    },
    {
      id: 4,
      name: "Sophia L.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SL",
      score: "2 goals",
      change: "same",
      position: 4,
    },
    {
      id: 5,
      name: "Marcus J.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MJ",
      score: "2 goals",
      change: "up",
      position: 5,
    },
  ],
}

interface LeaderboardCardProps {
  fullView?: boolean
}

export function LeaderboardCard({ fullView = false }: LeaderboardCardProps) {
  const [activeTab, setActiveTab] = useState("savings")

  // Get the current leaderboard based on the active tab
  const currentLeaderboard = leaderboardData[activeTab as keyof typeof leaderboardData]

  // Find the current user's position
  const currentUserPosition = currentLeaderboard.find((user) => user.isCurrentUser)?.position || 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See how you compare with other users</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="savings" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="savings" className="m-0">
            <div className="space-y-4">
              {currentLeaderboard.slice(0, fullView ? undefined : 3).map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center p-3 rounded-lg ${
                    user.isCurrentUser ? "bg-muted" : "hover:bg-muted/50"
                  } transition-colors`}
                >
                  <div className="flex items-center justify-center w-8 mr-3">
                    {user.position === 1 ? (
                      <Crown className="h-5 w-5 text-amber-500" />
                    ) : user.position === 2 ? (
                      <Medal className="h-5 w-5 text-slate-400" />
                    ) : user.position === 3 ? (
                      <Medal className="h-5 w-5 text-orange-400" />
                    ) : (
                      <span className="text-sm font-medium">{user.position}</span>
                    )}
                  </div>
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="font-medium truncate">{user.name}</p>
                      {user.isCurrentUser && (
                        <Badge variant="outline" className="ml-2">
                          You
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{user.score}</span>
                    {user.change === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : user.change === "down" ? (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}

              {!fullView && (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Your position: {currentUserPosition} of 124</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span>View Full Leaderboard</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {fullView && (
                <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                  <span>Showing top performers this month</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>124 participants</span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="streaks" className="m-0">
            {/* Similar content but for streaks leaderboard */}
          </TabsContent>

          <TabsContent value="goals" className="m-0">
            {/* Similar content but for goals leaderboard */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
