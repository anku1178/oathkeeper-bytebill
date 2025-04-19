import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({
    transactions: [
      {
        id: 1,
        merchant: "Urban Cafe",
        category: "Dining",
        amount: 450,
        date: "Jul 20, 2023",
        paymentMethod: "Credit Card",
        notes: "Lunch with colleagues"
      },
      {
        id: 2,
        merchant: "Grocery Mart",
        category: "Groceries",
        amount: 1250,
        date: "Jul 19, 2023",
        paymentMethod: "Debit Card",
        notes: "Weekly groceries"
      },
      {
        id: 3,
        merchant: "Amazon",
        category: "Shopping",
        amount: 1899,
        date: "Jul 15, 2023",
        paymentMethod: "Credit Card",
        notes: "Online purchase"
      }
    ]
  });
}
