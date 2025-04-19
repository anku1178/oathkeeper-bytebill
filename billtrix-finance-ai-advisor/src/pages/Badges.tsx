import React from 'react';
import { Award, Lock, Star, Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Mock data for badges and achievements
const earnedBadges = [
  { id: 1, name: 'Budget Master', description: 'Stay within budget for 3 consecutive months', icon: 'award', date: '2025-03-15' },
  { id: 2, name: 'Early Bird', description: 'Pay all bills before due date for 2 months', icon: 'clock', date: '2025-02-28' },
  { id: 3, name: 'Goal Setter', description: 'Create and fund 3 financial goals', icon: 'target', date: '2025-01-20' },
  { id: 4, name: 'Data Driven', description: 'Log in and check your dashboard for 14 consecutive days', icon: 'bar-chart', date: '2025-04-02' },
];

const lockedBadges = [
  { id: 5, name: 'Debt Destroyer', description: 'Pay off a loan or credit card debt completely', icon: 'scissors', progress: 85 },
  { id: 6, name: 'Savings Streak', description: 'Save money for 6 consecutive months', icon: 'trending-up', progress: 50 },
  { id: 7, name: 'Finance Guru', description: 'Read all financial education articles', icon: 'book-open', progress: 30 },
  { id: 8, name: 'Budget Ninja', description: 'Stay 15% under budget for a month', icon: 'zap', progress: 60 },
];

// Current user profile/stats
const userProfile = {
  title: 'The Saver',
  level: 3,
  streakDays: 7,
  totalBadges: earnedBadges.length,
  nextLevel: 200,
  currentPoints: 145,
};

interface BadgeIconProps {
  icon: string;
  className?: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ icon, className }) => {
  const iconProps = { className };

  switch (icon) {
    case 'award':
      return <Award {...iconProps} />;
    case 'target':
      return <Trophy {...iconProps} />;
    case 'trending-up':
      return <TrendingUp {...iconProps} />;
    case 'bar-chart':
    case 'book-open':
    case 'scissors':
    case 'clock':
    case 'zap':
    default:
      return <Star {...iconProps} />;
  }
};

const Badges = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Badges & Achievements</h2>
        <p className="text-muted-foreground">
          Track your progress and earn rewards for good financial habits
        </p>
      </div>
      
      {/* User Profile Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border-4 border-primary">
              <BadgeIcon icon="award" className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Your Title</div>
              <h3 className="text-2xl font-bold">{userProfile.title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Level {userProfile.level}</Badge>
                <Badge variant="outline" className="flex items-center">
                  <Trophy className="h-3 w-3 mr-1 text-amber-500" /> 
                  {userProfile.totalBadges} Badges
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" /> 
                  {userProfile.streakDays} Day Streak
                </Badge>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Level Progress</span>
              <span>{userProfile.currentPoints}/{userProfile.nextLevel} XP</span>
            </div>
            <Progress value={(userProfile.currentPoints/userProfile.nextLevel) * 100} className="h-2" />
          </div>
        </div>
      </Card>
      
      {/* Badges Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Your Earned Badges</CardTitle>
          <CardDescription>
            Badges you've unlocked through your financial journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center p-4 border rounded-lg text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <BadgeIcon icon={badge.icon} className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  {badge.description}
                </p>
                <Badge variant="outline" className="text-xs">
                  Earned on {new Date(badge.date).toLocaleDateString()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Locked Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges to Unlock</CardTitle>
          <CardDescription>
            Complete these financial challenges to earn more badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center p-4 border rounded-lg text-center bg-muted/20">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3 opacity-70">
                    <BadgeIcon icon={badge.icon} className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-background flex items-center justify-center">
                    <Lock className="h-2 w-2" />
                  </div>
                </div>
                <h4 className="font-medium text-muted-foreground">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  {badge.description}
                </p>
                <div className="w-full">
                  <Progress value={badge.progress} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1">{badge.progress}% completed</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Benefits Card */}
      <Card>
        <CardHeader>
          <CardTitle>Badge Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="h-3 w-3 text-primary" />
              </div>
              <div className="text-sm">
                <span className="font-medium">Level Up</span>: Each level unlocks new app features and financial tools
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="h-3 w-3 text-primary" />
              </div>
              <div className="text-sm">
                <span className="font-medium">Title Changes</span>: Your profile title evolves based on your financial habits
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="h-3 w-3 text-primary" />
              </div>
              <div className="text-sm">
                <span className="font-medium">Achievement Sharing</span>: Share your financial milestones with friends
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="h-3 w-3 text-primary" />
              </div>
              <div className="text-sm">
                <span className="font-medium">Personalized Tips</span>: Get tailored financial advice based on your achievements
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Badges;
