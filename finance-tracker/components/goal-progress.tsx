import { Progress } from "@/components/ui/progress"
import { Target, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface GoalProgressProps {
  title: string
  current: number
  target: number
  deadline: string
}

export function GoalProgress({ title, current, target, deadline }: GoalProgressProps) {
  const percentage = Math.round((current / target) * 100)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{title}</h3>
          <div className="text-sm font-medium">{percentage}%</div>
        </div>
        <Progress value={percentage} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            <span>
              ₹{current.toLocaleString()} / ₹{target.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{deadline}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
