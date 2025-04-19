import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({
    categories: [
      { name: "Dining", value: 4200, color: "var(--chart-1)" },
      { name: "Groceries", value: 3200, color: "var(--chart-2)" },
      { name: "Transport", value: 2500, color: "var(--chart-3)" },
      { name: "Entertainment", value: 1800, color: "var(--chart-4)" },
      { name: "Utilities", value: 2100, color: "var(--chart-5)" },
      { name: "Other", value: 1400, color: "var(--chart-6)" }
    ]
  });
}
