"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Mail,
  Upload,
  ScanLine,
  Search,
  Calendar,
  Tag,
  Check,
  CreditCard,
  FileText,
  AlertCircle,
  X,
  Camera,
  Filter,
  Edit,
  ExternalLink,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock receipts data
const receipts = [
  {
    id: 1,
    merchant: "Amazon",
    amount: 1899,
    date: "Jul 15, 2023",
    category: "Shopping",
    status: "Auto-parsed",
    source: "gmail",
    items: [{ name: "Bluetooth Headphones", price: 1899 }],
  },
  {
    id: 2,
    merchant: "Urban Cafe",
    amount: 450,
    date: "Jul 12, 2023",
    category: "Dining",
    status: "User-confirmed",
    source: "ocr",
    items: [
      { name: "Sandwich", price: 250 },
      { name: "Coffee", price: 150 },
      { name: "Pastry", price: 50 },
    ],
  },
  {
    id: 3,
    merchant: "Grocery Mart",
    amount: 1250,
    date: "Jul 10, 2023",
    category: "Groceries",
    status: "Auto-parsed",
    source: "gmail",
    items: [
      { name: "Vegetables", price: 350 },
      { name: "Bread", price: 40 },
      { name: "Milk", price: 60 },
      { name: "Eggs", price: 80 },
      { name: "Fruits", price: 220 },
      { name: "Chicken", price: 320 },
      { name: "Rice", price: 180 },
    ],
  },
  {
    id: 4,
    merchant: "Netflix",
    amount: 499,
    date: "Jul 5, 2023",
    category: "Entertainment",
    status: "Auto-parsed",
    source: "gmail",
    items: [{ name: "Monthly Subscription", price: 499 }],
  },
  {
    id: 5,
    merchant: "Electric Co.",
    amount: 1200,
    date: "Jul 3, 2023",
    category: "Utilities",
    status: "User-confirmed",
    source: "ocr",
    items: [{ name: "Monthly Electricity Bill", price: 1200 }],
  },
  {
    id: 6,
    merchant: "Mobile Recharge",
    amount: 299,
    date: "Jul 1, 2023",
    category: "Utilities",
    status: "Auto-parsed",
    source: "gmail",
    items: [{ name: "Monthly Recharge", price: 299 }],
  },
]

export default function ReceiptsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isGmailConnected, setIsGmailConnected] = useState(false)
  const [ocrDemo, setOcrDemo] = useState<"idle" | "scanning" | "parsed">("idle")
  const [parsedData, setParsedData] = useState({
    merchant: "",
    date: "",
    amount: "",
    items: [] as { name: string; price: number }[],
  })
  const [scanProgress, setScanProgress] = useState(0)

  // Filter receipts based on tab and search
  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch = receipt.merchant.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "gmail" && receipt.source === "gmail") ||
      (activeTab === "ocr" && receipt.source === "ocr")

    return matchesSearch && matchesTab
  })

  // Handle Gmail connection
  const handleConnectGmail = () => {
    // Simulate Gmail connection
    setTimeout(() => {
      setIsGmailConnected(true)
    }, 1500)
  }

  // Handle OCR bill scanning demo
  const handleScanDemo = () => {
    setOcrDemo("scanning")
    setScanProgress(0)

    // Simulate progress updates
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setOcrDemo("parsed")
          // Set mock parsed data
          setParsedData({
            merchant: "Grocery Mart",
            date: "2023-07-25",
            amount: "750",
            items: [
              { name: "Fruits", price: 250 },
              { name: "Vegetables", price: 300 },
              { name: "Eggs", price: 200 },
            ],
          })
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Receipts & Bills</h1>
          <p className="text-muted-foreground">Track and manage your receipts and bills</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ScanLine className="h-4 w-4" />
                <span>Scan Bill</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Scan Bill or Receipt</DialogTitle>
                <DialogDescription>Upload or take a photo of your bill for automatic parsing</DialogDescription>
              </DialogHeader>

              {ocrDemo === "idle" && (
                <div className="grid gap-6 py-4">
                  <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-lg">
                    <div className="flex flex-col items-center text-center">
                      <ScanLine className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your receipt here, or use one of the options below
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload File</span>
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Camera className="h-4 w-4" />
                        <span>Take Photo</span>
                      </Button>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <Button onClick={handleScanDemo} className="w-full">
                      Try Demo Scan
                    </Button>
                  </div>
                </div>
              )}

              {ocrDemo === "scanning" && (
                <div className="grid gap-6 py-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-pulse mb-4">
                      <ScanLine className="h-16 w-16 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Scanning Receipt...</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We're analyzing your receipt to extract details
                    </p>
                    <Progress value={scanProgress} className="w-full max-w-md h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {scanProgress < 100 ? "Processing..." : "Complete!"}
                    </p>
                  </div>
                </div>
              )}

              {ocrDemo === "parsed" && (
                <div className="grid gap-4 py-4">
                  <div className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg flex items-center gap-2 mb-2">
                    <Check className="h-5 w-5" />
                    <span>Receipt parsed successfully!</span>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="merchant">Merchant</Label>
                        <Input
                          id="merchant"
                          value={parsedData.merchant}
                          onChange={(e) => setParsedData({ ...parsedData, merchant: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={parsedData.date}
                          onChange={(e) => setParsedData({ ...parsedData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Total Amount (₹)</Label>
                      <Input
                        id="amount"
                        value={parsedData.amount}
                        onChange={(e) => setParsedData({ ...parsedData, amount: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label>Items</Label>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                          + Add Item
                        </Button>
                      </div>
                      <Card>
                        <CardContent className="p-2">
                          {parsedData.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                              <div className="flex-1 min-w-0 pr-2">
                                <Input
                                  value={item.name}
                                  placeholder="Item name"
                                  className="h-8"
                                  onChange={(e) => {
                                    const newItems = [...parsedData.items]
                                    newItems[index].name = e.target.value
                                    setParsedData({ ...parsedData, items: newItems })
                                  }}
                                />
                              </div>
                              <div className="w-24">
                                <Input
                                  value={item.price}
                                  placeholder="Price"
                                  className="h-8"
                                  onChange={(e) => {
                                    const newItems = [...parsedData.items]
                                    newItems[index].price = Number(e.target.value)
                                    setParsedData({ ...parsedData, items: newItems })
                                  }}
                                />
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="groceries">
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="groceries">Groceries</SelectItem>
                          <SelectItem value="dining">Dining</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="mt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOcrDemo("idle")
                        setParsedData({ merchant: "", date: "", amount: "", items: [] })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Receipt</Button>
                  </DialogFooter>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                <span>{isGmailConnected ? "Sync Gmail" : "Connect Gmail"}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{isGmailConnected ? "Sync Gmail Receipts" : "Connect Gmail"}</DialogTitle>
                <DialogDescription>
                  {isGmailConnected
                    ? "Sync your receipts from Gmail to automatically parse and organize them"
                    : "Connect your Gmail account to automatically import receipts and bills"}
                </DialogDescription>
              </DialogHeader>

              {isGmailConnected ? (
                <div className="py-6">
                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">Gmail Connected</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    Your Gmail account is connected. We'll automatically scan for new receipts and bills.
                  </p>

                  <div className="flex flex-col gap-4">
                    <Button className="w-full">Sync Now</Button>
                    <Button variant="outline" onClick={() => setIsGmailConnected(false)}>
                      Disconnect Gmail
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Automatic Receipt Import</h4>
                        <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                          Connect your Gmail to automatically import receipts from merchants like Amazon, food delivery
                          services, and utility companies.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              fill="#ea4335"
                            >
                              <path d="M22.501 5.566a1.5 1.5 0 0 0-1.5-1.5h-18a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h18a1.5 1.5 0 0 0 1.5-1.5v-12Zm-19.5 0h18v1.75l-9 5.25-9-5.25V5.566Zm0 3.75 9 5.25 9-5.25v8.25h-18v-8.25Z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">Google Mail</div>
                            <div className="text-sm text-muted-foreground">Connect to automatically parse receipts</div>
                          </div>
                          <Button className="ml-auto" onClick={handleConnectGmail}>
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>
                        We only process emails identified as receipts or bills and do not access other content
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search receipts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden md:inline">Filters</span>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Receipts</TabsTrigger>
          <TabsTrigger value="gmail">Gmail</TabsTrigger>
          <TabsTrigger value="ocr">Scanned</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Your Receipts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                {filteredReceipts.length > 0 ? (
                  filteredReceipts.map((receipt) => (
                    <div
                      key={receipt.id}
                      className="flex flex-col md:flex-row md:items-center justify-between border-b p-4 hover:bg-muted/50"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            receipt.source === "gmail" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {receipt.source === "gmail" ? <Mail className="h-5 w-5" /> : <ScanLine className="h-5 w-5" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{receipt.merchant}</h3>
                            <Badge
                              variant={receipt.status === "Auto-parsed" ? "outline" : "secondary"}
                              className="ml-1 text-xs"
                            >
                              {receipt.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              <span>{receipt.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{receipt.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              <span>₹{receipt.amount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <Badge variant="outline" className="mr-2 px-1.5 py-0.5 text-xs">
                          {receipt.items.length} {receipt.items.length === 1 ? "item" : "items"}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="rounded-full bg-muted p-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium">No receipts found</h3>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or connecting Gmail</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gmail" className="m-0">
          <Card>
            <CardContent className="p-0">{/* Same content but filtered for Gmail receipts */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ocr" className="m-0">
          <Card>
            <CardContent className="p-0">{/* Same content but filtered for OCR scanned receipts */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
