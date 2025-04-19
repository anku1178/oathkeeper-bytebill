import { NextResponse } from 'next/server';

// This is a mock implementation. Replace with your real DB logic.
export async function GET(request: Request) {
  // For demo, return static data for now
  return NextResponse.json({
    trends: [
      { month: "Apr", expenses: 14500 },
      { month: "May", expenses: 13900 },
      { month: "Jun", expenses: 12700 },
      { month: "Jul", expenses: 15200 }
    ]
  });
}
