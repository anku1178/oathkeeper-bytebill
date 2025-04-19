import { NextResponse } from 'next/server';

export async function GET() {
  // Return static mock data for the dashboard
  return NextResponse.json({
    streak: {
      current: 16,
      lastUpdated: "Today",
    },
    points: 2450,
    level: 12,
    badges: [
      {
        id: 1,
        name: "July Saver",
        icon: "trophy",
        color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
      },
      {
        id: 2,
        name: "Streak Master",
        icon: "flame",
        color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      },
      {
        id: 3,
        name: "Budget Champion",
        icon: "award",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      },
    ],
    activeChallenge: {
      title: "Coffee Budget Challenge",
      description: "Reduce coffee spending by 50% this week",
      progress: 70,
      endDate: "Aug 7, 2023",
      reward: "150 points",
    },
  });
}

