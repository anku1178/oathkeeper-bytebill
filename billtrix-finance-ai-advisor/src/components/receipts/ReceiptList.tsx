import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { Receipt } from "@/lib/supabase";

interface ReceiptListProps {
  loading: boolean;
  receipts: Receipt[];
  filteredReceipts: Receipt[];
}

export const ReceiptList = ({ loading, receipts, filteredReceipts }: ReceiptListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Receipts</CardTitle>
        <CardDescription>
          Automatically detected from your Gmail inbox
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-8">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/40 p-3 text-sm font-medium">
              <div className="col-span-5">Email Subject</div>
              <div className="col-span-2">Vendor</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2 hidden sm:block text-right">Date</div>
              <div className="col-span-1 sm:col-span-1 text-right">Actions</div>
            </div>
            {filteredReceipts.length > 0 ? (
              filteredReceipts.map((receipt) => (
                <div 
                  key={receipt.id} 
                  className="grid grid-cols-12 items-center border-b p-3 text-sm last:border-0"
                >
                  <div className="col-span-5 font-medium">
                    {receipt.subject}
                    <div className="mt-1">
                      {receipt.status === 'pending' ? (
                        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Processed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">
                    {receipt.vendor}
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    {
                      typeof receipt.amount === 'number'
                        ? `₹${receipt.amount.toFixed(2)}`
                        : `₹${(parseFloat(receipt.amount.replace(/,/g, '')) || 0).toFixed(2)}`
                    }
                  </div>
                  <div className="col-span-2 hidden sm:block text-right text-muted-foreground">
                    {new Date(receipt.date).toLocaleDateString()}
                  </div>
                  <div className="col-span-1 sm:col-span-1 flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View Receipt">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                {receipts.length === 0 ? 'No receipts found. Click "Sync Now" to fetch from Gmail.' : 'No matching receipts found.'}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
