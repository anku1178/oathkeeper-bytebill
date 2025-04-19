
import { Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchToolbar = ({ searchTerm, onSearchChange }: SearchToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search receipts..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline">
        <FileText className="mr-2 h-4 w-4" /> Export All
      </Button>
    </div>
  );
};
