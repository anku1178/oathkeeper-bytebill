import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Trophy, Calendar } from "lucide-react"

interface StreakCardProps {
  streak: {
    current: number
    longest: number
    lastUpdated: string
  }
}

export function StreakCard({ streak }: StreakCardProps) {
  // Generate the streak calendar (simplified version)
  const streakDays = Array.from({ length: 7 }, (_, i) => {
    // For demo purposes, we'll just show the last 7 days with the current streak
    const isActive = i >= 7 - streak.current
    return { day: ["M", "T", "W", "T", "F", "S", "S"][i], isActive }
  })

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Flame className="h-5 w-5 text-orange-500 mr-2" />
          <span>Your Streak</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold mb-1">{streak.current}</div>
          <div className="text-sm text-muted-foreground mb-4">days in a row</div>

          <div className="flex justify-between w-full mb-4">
            {streakDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    day.isActive
                      ? "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {day.isActive && <Flame className="h-4 w-4" />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between w-full text-sm">
            <div className="flex items-center">
              <Trophy className="h-4 w-4 text-amber-500 mr-1" />
              <span>Longest: {streak.longest} days</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-muted-foreground">Last: {streak.lastUpdated}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
