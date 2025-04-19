
import React, { useState } from 'react';
import { Plus, Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Mock data for goals
const goalsData = [
  { id: 1, name: 'Emergency Fund', target: 5000, current: 3250, deadline: '2025-12-31' },
  { id: 2, name: 'Vacation to Hawaii', target: 3000, current: 1200, deadline: '2025-07-15' },
  { id: 3, name: 'New Laptop', target: 1500, current: 800, deadline: '2025-06-01' },
];

const Goals = () => {
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Goals</h2>
          <p className="text-muted-foreground">
            Set, track, and achieve your savings targets
          </p>
        </div>
        <Button className="sm:self-start" onClick={() => setShowAddGoalForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Goal
        </Button>
      </div>
      
      {/* Goals Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalsData.length}</div>
            <p className="text-xs text-muted-foreground">Active savings targets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${goalsData.reduce((sum, goal) => sum + goal.target, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Combined goal amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${goalsData.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((goalsData.reduce((sum, goal) => sum + goal.current, 0) / 
                goalsData.reduce((sum, goal) => sum + goal.target, 0)) * 100)}% of target
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Goals List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Financial Goals</CardTitle>
          <CardDescription>Track progress towards your savings targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goalsData.map((goal) => {
              const progressPercentage = Math.round((goal.current / goal.target) * 100);
              const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <Trophy className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">${goal.current}</span> of ${goal.target}
                    </div>
                    <div className="text-muted-foreground">
                      {daysLeft} days left
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <div className="px-2 py-1 rounded-full bg-green-100 text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>On Track</span>
                    </div>
                    <span className="text-muted-foreground">
                      Need to save ${Math.ceil((goal.target - goal.current) / (daysLeft / 30))} monthly
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Goal-Setting Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>🎯 Set <strong>specific</strong> and <strong>measurable</strong> goals</p>
          <p>⏰ Create <strong>deadlines</strong> to stay motivated</p>
          <p>🔍 Break large goals into <strong>smaller milestones</strong></p>
          <p>📊 <strong>Track progress</strong> regularly for better success rates</p>
          <p>💰 Consider setting up <strong>automatic transfers</strong> to your savings</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Goals;
