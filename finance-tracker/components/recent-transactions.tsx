import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample transaction data
const transactions = [
  {
    id: 1,
    merchant: "Urban Cafe",
    category: "Dining",
    amount: 450,
    date: "Today, 2:30 PM",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "UC",
    type: "debit",
  },
  {
    id: 2,
    merchant: "Grocery Mart",
    category: "Groceries",
    amount: 1250,
    date: "Yesterday, 6:15 PM",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "GM",
    type: "debit",
  },
  {
    id: 3,
    merchant: "Amazon",
    category: "Shopping",
    amount: 1899,
    date: "Jul 15, 11:30 AM",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "AZ",
    type: "debit",
  },
  {
    id: 4,
    merchant: "Electric Co.",
    category: "Utilities",
    amount: 1200,
    date: "Jul 13, 9:00 AM",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "EC",
    type: "debit",
  },
  {
    id: 5,
    merchant: "Monthly Salary",
    category: "Income",
    amount: 45000,
    date: "Jul 1, 10:00 AM",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "MS",
    type: "credit",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="rounded-lg overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-md">
                <AvatarImage src={transaction.logo || "/placeholder.svg"} alt={transaction.merchant} />
                <AvatarFallback>{transaction.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">{transaction.merchant}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    {transaction.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${transaction.type === "credit" ? "text-green-600" : ""}`}>
                  {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
