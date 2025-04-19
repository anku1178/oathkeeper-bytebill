import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { useEffect, useState } from "react"

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/transactions/recent")
      .then(res => res.json())
      .then(json => {
        setTransactions(json.transactions || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load recent transactions.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-32">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-32 text-red-500">{error}</div>;

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
