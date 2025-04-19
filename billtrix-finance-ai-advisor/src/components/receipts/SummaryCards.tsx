import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Receipt } from "@/lib/supabase";

interface SummaryCardsProps {
  receipts: Receipt[];
  totalReceipts?: number;
  totalAmount?: number;
  processedCount?: number;
}

export const SummaryCards = ({ receipts, totalReceipts, totalAmount, processedCount }: SummaryCardsProps) => {
  if (!receipts || !Array.isArray(receipts)) {
    return null; // Defensive: don't render if receipts is not valid
  }

  // If summary props are provided, use them; otherwise, fallback to receipts-derived values
  const totalProcessed = typeof processedCount === 'number'
    ? processedCount
    : receipts.filter(receipt => receipt.billStatus === 'paid' || receipt.billStatus === 'unpaid').length;
  const totalReceiptsNum = typeof totalReceipts === 'number' ? totalReceipts : receipts.length;
  const totalAmountNum = typeof totalAmount === 'number'
    ? totalAmount
    : receipts.reduce((sum, receipt) => {
        if (typeof receipt.amount === 'string') {
          const num = parseFloat(receipt.amount.replace(/,/g, ''));
          return !isNaN(num) ? sum + num : sum;
        } else if (typeof receipt.amount === 'number') {
          return sum + receipt.amount;
        }
        return sum;
      }, 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReceiptsNum}</div>
          <p className="text-xs text-muted-foreground">From your Gmail account</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalAmountNum.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">From all receipts</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProcessed}/{totalReceiptsNum}</div>
          <p className="text-xs text-muted-foreground">Receipts processed</p>
        </CardContent>
      </Card>
    </div>
  );
};
