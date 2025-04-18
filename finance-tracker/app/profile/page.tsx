"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Flame, Calendar, Users, Share2, Settings, ChevronRight, Zap, Target, Clock } from "lucide-react"
import { StreakCard } from "@/components/streak-card"
import { BadgeCard } from "@/components/badge-card"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { ChallengeCard } from "@/components/challenge-card"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "May 2023",
    level: 12,
    points: 2450,
    pointsToNextLevel: 550,
    streak: {
      current: 16,
      longest: 32,
      lastUpdated: "Today",
    },
    stats: {
      expensesLogged: 248,
      goalsCompleted: 3,
      badgesEarned: 14,
      challengesWon: 5,
    },
    achievements: [
      {
        id: 1,
        name: "Savings Master",
        description: "Save 20% of income for 3 consecutive months",
        icon: <Trophy className="h-5 w-5" />,
        progress: 100,
        completed: true,
        date: "Jul 15, 2023",
      },
      {
        id: 2,
        name: "Budget Guru",
        description: "Stay under budget in all categories for a month",
        icon: <Medal className="h-5 w-5" />,
        progress: 100,
        completed: true,
        date: "Jun 30, 2023",
      },
      {
        id: 3,
        name: "Goal Crusher",
        description: "Complete 3 savings goals",
        icon: <Target className="h-5 w-5" />,
        progress: 100,
        completed: true,
        date: "Jun 12, 2023",
      },
      {
        id: 4,
        name: "Expense Tracker",
        description: "Log expenses for 30 consecutive days",
        icon: <Calendar className="h-5 w-5" />,
        progress: 80,
        completed: false,
        date: null,
      },
      {
        id: 5,
        name: "Debt Destroyer",
        description: "Pay off a debt completely",
        icon: <Zap className="h-5 w-5" />,
        progress: 65,
        completed: false,
        date: null,
      },
    ],
    recentBadges: [
      {
        id: 1,
        name: "July Saver",
        description: "Saved 25% of income in July",
        icon: "trophy",
        date: "Jul 31, 2023",
        rarity: "gold",
      },
      {
        id: 2,
        name: "Streak Master",
        description: "Maintained a 15-day streak",
        icon: "flame",
        date: "Jul 25, 2023",
        rarity: "silver",
      },
      {
        id: 3,
        name: "Budget Champion",
        description: "Stayed under budget in all categories",
        icon: "medal",
        date: "Jul 20, 2023",
        rarity: "gold",
      },
      {
        id: 4,
        name: "Goal Achiever",
        description: "Completed a savings goal",
        icon: "target",
        date: "Jul 10, 2023",
        rarity: "bronze",
      },
    ],
    activeChallenges: [
      {
        id: 1,
        title: "No-Spend Weekend",
        description: "Don't spend any money this weekend",
        startDate: "Aug 5, 2023",
        endDate: "Aug 6, 2023",
        reward: "200 points",
        participants: 156,
        progress: 0,
        category: "Saving",
      },
      {
        id: 2,
        title: "Coffee Budget Challenge",
        description: "Reduce coffee spending by 50% this week",
        startDate: "Aug 1, 2023",
        endDate: "Aug 7, 2023",
        reward: "150 points + Coffee Connoisseur Badge",
        participants: 89,
        progress: 70,
        category: "Budgeting",
      },
    ],
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">View your achievements and progress</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span>Share Profile</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-start">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{userData.name}</CardTitle>
                    <CardDescription>{userData.email}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    Level {userData.level}
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>
                      {userData.points} / {userData.points + userData.pointsToNextLevel} XP
                    </span>
                    <span>Level {userData.level + 1}</span>
                  </div>
                  <Progress
                    value={(userData.points / (userData.points + userData.pointsToNextLevel)) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{userData.stats.expensesLogged}</div>
                <div className="text-xs text-muted-foreground">Expenses Logged</div>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{userData.stats.goalsCompleted}</div>
                <div className="text-xs text-muted-foreground">Goals Completed</div>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{userData.stats.badgesEarned}</div>
                <div className="text-xs text-muted-foreground">Badges Earned</div>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{userData.stats.challengesWon}</div>
                <div className="text-xs text-muted-foreground">Challenges Won</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Flame className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-sm">
                  <span className="font-medium">{userData.streak.current} day streak!</span> Last updated:{" "}
                  {userData.streak.lastUpdated}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <span>View Stats</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <StreakCard streak={userData.streak} />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-start space-x-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          achievement.completed ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center">
                          <p className="font-medium leading-none">{achievement.name}</p>
                          {achievement.completed && (
                            <Badge variant="outline" className="ml-2">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {!achievement.completed && <Progress value={achievement.progress} className="h-1 mt-2" />}
                        {achievement.completed && (
                          <p className="text-xs text-muted-foreground">Completed on {achievement.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("achievements")}>
                  View All Achievements
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {userData.recentBadges.slice(0, 4).map((badge) => (
                    <div
                      key={badge.id}
                      className="flex flex-col items-center justify-center p-3 border rounded-lg text-center"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full mb-2 ${
                          badge.rarity === "gold"
                            ? "bg-amber-100 text-amber-700"
                            : badge.rarity === "silver"
                              ? "bg-slate-100 text-slate-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {badge.icon === "trophy" ? (
                          <Trophy className="h-6 w-6" />
                        ) : badge.icon === "flame" ? (
                          <Flame className="h-6 w-6" />
                        ) : badge.icon === "medal" ? (
                          <Medal className="h-6 w-6" />
                        ) : (
                          <Target className="h-6 w-6" />
                        )}
                      </div>
                      <h3 className="text-sm font-medium">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("badges")}>
                  View All Badges
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.activeChallenges.map((challenge) => (
                    <div key={challenge.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{challenge.title}</h3>
                        <Badge variant="outline">{challenge.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2 mb-3" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {challenge.startDate} - {challenge.endDate}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{challenge.participants} participants</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("challenges")}>
                  View All Challenges
                </Button>
              </CardFooter>
            </Card>

            <LeaderboardCard />
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Achievements</CardTitle>
              <CardDescription>Track your progress towards financial milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        achievement.completed ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        <p className="font-medium leading-none">{achievement.name}</p>
                        {achievement.completed && (
                          <Badge variant="outline" className="ml-2">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {!achievement.completed && (
                        <>
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-1 mt-1" />
                        </>
                      )}
                      {achievement.completed && (
                        <p className="text-xs text-muted-foreground">Completed on {achievement.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <BadgeCard />
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <ChallengeCard />
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <LeaderboardCard fullView={true} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
