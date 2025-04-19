
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const QuickHelp = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Help</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">🔍 How it works:</span> BillTrix connects to your Gmail account and automatically detects receipts based on keywords like "receipt", "invoice", "order confirmation", etc.
        </p>
        <p className="text-sm">
          <span className="font-medium">🤖 Processing:</span> Our AI extracts vendor names, amounts, and dates, then categorizes each expense.
        </p>
        <p className="text-sm">
          <span className="font-medium">🔄 Regular Sync:</span> Connect your Gmail to automatically import new receipts every day.
        </p>
      </CardContent>
    </Card>
  );
};
