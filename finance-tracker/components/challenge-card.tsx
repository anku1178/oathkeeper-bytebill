"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Calendar, Users, Clock, Target, Zap, CreditCard, ShoppingBag, Coffee, Gift, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock challenges data
const challenges = {
  active: [
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
      icon: <Zap className="h-5 w-5" />,
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
      icon: <Coffee className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Grocery Optimizer",
      description: "Keep grocery spending under ₹3,000 this week",
      startDate: "Aug 1, 2023",
      endDate: "Aug 7, 2023",
      reward: "100 points",
      participants: 212,
      progress: 40,
      category: "Budgeting",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
  ],
  upcoming: [
    {
      id: 4,
      title: "Dining Out Detox",
      description: "No restaurant spending for one week",
      startDate: "Aug 8, 2023",
      endDate: "Aug 14, 2023",
      reward: "250 points + Dining Detox Badge",
      participants: 78,
      category: "Saving",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: 5,
      title: "Subscription Audit",
      description: "Review and cancel at least one unused subscription",
      startDate: "Aug 10, 2023",
      endDate: "Aug 17, 2023",
      reward: "150 points",
      participants: 45,
      category: "Optimization",
      icon: <Target className="h-5 w-5" />,
    },
  ],
  completed: [
    {
      id: 6,
      title: "July Savings Sprint",
      description: "Save at least ₹5,000 in the last week of July",
      startDate: "Jul 24, 2023",
      endDate: "Jul 31, 2023",
      reward: "300 points + Savings Sprint Badge",
      participants: 134,
      progress: 100,
      category: "Saving",
      result: "Success",
      pointsEarned: 300,
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      id: 7,
      title: "Entertainment Budget",
      description: "Keep entertainment spending under ₹1,000 for the month",
      startDate: "Jul 1, 2023",
      endDate: "Jul 31, 2023",
      reward: "200 points",
      participants: 98,
      progress: 100,
      category: "Budgeting",
      result: "Success",
      pointsEarned: 200,
      icon: <Gift className="h-5 w-5" />,
    },
  ],
}

export function ChallengeCard() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Challenges</CardTitle>
            <CardDescription>Complete challenges to earn points and badges</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                <span>Join Challenge</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Available Challenges</DialogTitle>
                <DialogDescription>Join a new challenge to earn rewards</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {challenges.upcoming.map((challenge) => (
                  <Card key={challenge.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          {challenge.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{challenge.title}</h3>
                            <Badge variant="outline">{challenge.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>
                                {challenge.startDate} - {challenge.endDate}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Trophy className="h-3 w-3 mr-1" />
                              <span>{challenge.reward}</span>
                            </div>
                          </div>
                          <div className="flex items-center mt-3">
                            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{challenge.participants} participants</span>
                            <Button size="sm" className="ml-auto">
                              Join
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline">Browse All Challenges</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="m-0">
            <div className="space-y-4">
              {challenges.active.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        {challenge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{challenge.title}</h3>
                          <Badge variant="outline">{challenge.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                        <div className="flex items-center justify-between text-sm mt-2 mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2 mb-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {challenge.startDate} - {challenge.endDate}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Trophy className="h-3 w-3 mr-1" />
                            <span>{challenge.reward}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="m-0">
            <div className="space-y-4">
              {challenges.upcoming.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        {challenge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{challenge.title}</h3>
                          <Badge variant="outline">{challenge.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {challenge.startDate} - {challenge.endDate}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Trophy className="h-3 w-3 mr-1" />
                            <span>{challenge.reward}</span>
                          </div>
                        </div>
                        <div className="flex items-center mt-3">
                          <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{challenge.participants} participants</span>
                          <Button size="sm" className="ml-auto">
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="m-0">
            <div className="space-y-4">
              {challenges.completed.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          challenge.result === "Success"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                        }`}
                      >
                        {challenge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{challenge.title}</h3>
                          <Badge
                            variant={challenge.result === "Success" ? "default" : "secondary"}
                            className={challenge.result === "Success" ? "bg-green-500" : ""}
                          >
                            {challenge.result}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {challenge.startDate} - {challenge.endDate}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Trophy className="h-3 w-3 mr-1" />
                            <span>+{challenge.pointsEarned} points earned</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Browse All Challenges
        </Button>
      </CardFooter>
    </Card>
  )
}
