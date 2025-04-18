"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BellRing,
  CheckCircle2,
  CreditCard,
  Calendar,
  Bell,
  Target,
  BarChart4,
  Settings,
  AlertCircle,
  Smartphone,
  Mail,
  X,
  Clock,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample notification data
const notifications = [
  {
    id: 1,
    title: "Budget alert: Entertainment",
    description: "You've spent 80% of your entertainment budget this month.",
    date: "Today, 2:30 PM",
    type: "alert",
    isRead: false,
  },
  {
    id: 2,
    title: "Bill payment reminder",
    description: "Your electricity bill of ₹1,200 is due in 3 days.",
    date: "Today, 10:15 AM",
    type: "reminder",
    isRead: false,
  },
  {
    id: 3,
    title: "Goal progress update",
    description: 'Your "Trip to Goa" savings goal is now 60% complete!',
    date: "Yesterday, 5:45 PM",
    type: "update",
    isRead: true,
  },
  {
    id: 4,
    title: "New transaction detected",
    description: "Amazon: ₹1,899 was detected from your credit card.",
    date: "Yesterday, 1:30 PM",
    type: "transaction",
    isRead: true,
  },
  {
    id: 5,
    title: "Monthly summary available",
    description: "Your June spending summary is now available.",
    date: "Jul 10, 9:00 AM",
    type: "update",
    isRead: true,
  },
  {
    id: 6,
    title: "Savings opportunity",
    description: "We found a potential ₹400 monthly saving opportunity in your subscriptions.",
    date: "Jul 8, 11:30 AM",
    type: "insight",
    isRead: true,
  },
  {
    id: 7,
    title: "Budget alert: Dining",
    description: "You've exceeded your dining budget by ₹200 this month.",
    date: "Jul 5, 3:15 PM",
    type: "alert",
    isRead: true,
  },
  {
    id: 8,
    title: "Bill paid automatically",
    description: "Your mobile bill of ₹299 was paid automatically.",
    date: "Jul 1, 10:00 AM",
    type: "transaction",
    isRead: true,
  },
]

// Notification preferences settings
const notificationSettings = [
  {
    id: "budget-alerts",
    title: "Budget Alerts",
    description: "Get notified when you reach 80% of your budget",
    enabled: true,
    icon: <BarChart4 className="h-5 w-5" />,
  },
  {
    id: "bill-reminders",
    title: "Bill Reminders",
    description: "Receive reminders for upcoming bill payments",
    enabled: true,
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: "transaction-alerts",
    title: "Transaction Alerts",
    description: "Get notified about new transactions",
    enabled: true,
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "goal-updates",
    title: "Goal Updates",
    description: "Updates on savings goal progress",
    enabled: true,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: "insights",
    title: "Savings Insights",
    description: "Personalized insights to help you save money",
    enabled: true,
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    id: "monthly-summary",
    title: "Monthly Summary",
    description: "Monthly overview of your spending and saving habits",
    enabled: true,
    icon: <BarChart4 className="h-5 w-5" />,
  },
]

// Notification channels
const notificationChannels = [
  {
    id: "app",
    title: "In-App Notifications",
    description: "Receive notifications within the app",
    enabled: true,
    icon: <Bell className="h-5 w-5" />,
  },
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive notifications via email",
    enabled: true,
    icon: <Mail className="h-5 w-5" />,
  },
  {
    id: "sms",
    title: "SMS Notifications",
    description: "Receive notifications via SMS",
    enabled: false,
    icon: <Smartphone className="h-5 w-5" />,
  },
]

// Helper function for notification icon
function getNotificationIcon(type: string) {
  switch (type) {
    case "alert":
      return <AlertCircle className="h-5 w-5 text-orange-500" />
    case "reminder":
      return <Clock className="h-5 w-5 text-blue-500" />
    case "update":
      return <Target className="h-5 w-5 text-green-500" />
    case "transaction":
      return <CreditCard className="h-5 w-5 text-purple-500" />
    case "insight":
      return <CheckCircle2 className="h-5 w-5 text-teal-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)
  const [settings, setSettings] = useState(notificationSettings)
  const [channels, setChannels] = useState(notificationChannels)

  // Filter notifications based on tab
  const filteredNotifications = notificationList.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return notification.type === activeTab
  })

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotificationList(
      notificationList.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    )
  }

  // Toggle notification setting
  const toggleSetting = (id: string) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
  }

  // Toggle notification channel
  const toggleChannel = (id: string) => {
    setChannels(channels.map((channel) => (channel.id === id ? { ...channel, enabled: !channel.enabled } : channel)))
  }

  // Count unread notifications
  const unreadCount = notificationList.filter((notification) => !notification.isRead).length

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">View and manage your notifications and preferences</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
            <CheckCircle2 className="h-4 w-4" />
            <span>Mark all as read</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs leading-5">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
            <TabsTrigger value="update">Updates</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {filteredNotifications.length > 0 ? (
                  <div className="divide-y">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-muted/50 ${!notification.isRead ? "bg-muted/30" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3
                                className={`font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {notification.title}
                              </h3>
                              {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                            <div className="mt-1 flex items-center gap-3">
                              <p className="text-xs text-muted-foreground">{notification.date}</p>
                              {notification.type === "reminder" && (
                                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <BellRing className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No notifications found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      There are no {activeTab === "all" ? "" : activeTab} notifications to display.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="m-0">
          {/* Same content but filtered for unread */}
        </TabsContent>

        <TabsContent value="alert" className="m-0">
          {/* Same content but filtered for alerts */}
        </TabsContent>

        <TabsContent value="reminder" className="m-0">
          {/* Same content but filtered for reminders */}
        </TabsContent>

        <TabsContent value="update" className="m-0">
          {/* Same content but filtered for updates */}
        </TabsContent>
      </Tabs>

      <h2 className="text-xl font-semibold mt-8 mb-4">Notification Preferences</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Notification Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {setting.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{setting.title}</p>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channels.map((channel) => (
                <div key={channel.id} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {channel.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{channel.title}</p>
                      <p className="text-sm text-muted-foreground">{channel.description}</p>
                    </div>
                  </div>
                  <Switch checked={channel.enabled} onCheckedChange={() => toggleChannel(channel.id)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
