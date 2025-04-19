
import { RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface HeaderProps {
  syncing: boolean;
  onSync: () => void;
}

export const Header = ({ syncing, onSync }: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gmail Receipts</h2>
        <p className="text-muted-foreground">
          Automatically import and process email receipts
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          className="sm:self-start" 
          onClick={onSync}
          disabled={syncing}
        >
          {syncing ? <Spinner size="sm" className="mr-2" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Sync Now
        </Button>
        <Button variant="outline" className="sm:self-start">
          <Mail className="mr-2 h-4 w-4" /> Connect Gmail
        </Button>
      </div>
    </div>
  );
};
