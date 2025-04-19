"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  CreditCard,
  Bell,
  LogOut,
  Menu,
  X,
  User,
  Flame,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Expenses", href: "/expenses", icon: CreditCard },
  { name: "Receipts & Bills", href: "/receipts", icon: Receipt },
  { name: "Analytics", href: "/analytics", icon: PieChart },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User, badge: "New" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Skip sidebar on auth pages
  if (pathname === "/login" || pathname === "/signup" || pathname === "/reset-password") {
    return null
  }

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
              <path d="m9 18 3-3-3-3" />
              <path d="m15 12-3-3-3 3" />
            </svg>
          </div>
          <span>FinanceTracker</span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={`justify-start ${pathname === item.href ? "bg-muted font-medium" : ""}`}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.name}</span>
                {item.badge && (
                  <Badge variant="outline" className="ml-auto text-xs py-0 h-5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <Separator />
      <div className="p-4">
        <div className="flex items-center gap-4 py-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <div className="flex items-center text-xs text-muted-foreground">
              <Flame className="h-3 w-3 text-orange-500 mr-1" />
              <span>16 day streak</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto" asChild>
            <Link href="/login">
              <LogOut className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )

  // Mobile sidebar toggle
  if (isMobile) {
    return (
      <>
        <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50" onClick={() => setIsOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        {isOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {sidebarContent}
        </aside>
      </>
    )
  }

  return <aside className="hidden w-64 flex-col border-r md:flex">{sidebarContent}</aside>
}
