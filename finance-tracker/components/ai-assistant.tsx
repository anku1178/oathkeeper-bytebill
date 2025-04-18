"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, ArrowUpRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const suggestedPrompts = [
  "Can I afford a new phone this month?",
  "What's my biggest spending category?",
  "Give me tips to save ₹1,000",
  "How much did I spend on groceries?",
]

const mockResponses: Record<string, string> = {
  "Can I afford a new phone this month?":
    "Based on your current spending and budget, you have ₹8,500 left in your discretionary budget this month. If the phone costs less than that, you should be able to afford it without impacting your savings goals.",
  "What's my biggest spending category?":
    "Your biggest spending category this month is Dining Out at ₹4,200, which is 28% of your total expenses. This is about ₹700 more than your monthly average for this category.",
  "Give me tips to save ₹1,000":
    "Here are 3 ways to save ₹1,000 this month:\n1. Reduce dining out by 2 meals (approx. ₹600)\n2. Pause one subscription service (approx. ₹250)\n3. Use public transport instead of cabs twice a week (approx. ₹400)",
  "How much did I spend on groceries?":
    "You've spent ₹3,200 on groceries this month, which is within your budget of ₹3,500. This is 15% less than what you spent last month on groceries.",
}

function getRandomReply(message: string): string {
  // Return specific replies for suggested prompts
  if (mockResponses[message]) {
    return mockResponses[message]
  }

  // Generic responses for other queries
  const genericReplies = [
    "Based on your recent transactions, you're doing well in keeping expenses under control. Keep it up!",
    "I've analyzed your spending pattern and noticed you might be able to save more by cutting down on subscription services.",
    "Looking at your financial goals, you're on track to reach your savings target by the end of the quarter.",
    "Your spending in entertainment has decreased by 15% compared to last month. Great progress!",
  ]

  return genericReplies[Math.floor(Math.random() * genericReplies.length)]
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your FinanceTracker AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = (content?: string) => {
    const messageToSend = content || newMessage
    if (!messageToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomReply(messageToSend),
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-[360px] max-w-[95vw] shadow-xl md:w-96">
      <CardHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <MessageCircle className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">Finance Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="h-[400px]">
        <CardContent className="p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[85%] ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                  <div className="flex space-x-1">
                    <div className="animate-bounce h-2 w-2 rounded-full bg-gray-500 delay-100"></div>
                    <div className="animate-bounce h-2 w-2 rounded-full bg-gray-500 delay-200"></div>
                    <div className="animate-bounce h-2 w-2 rounded-full bg-gray-500 delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
              <div className="flex flex-col gap-2">
                {suggestedPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    className="justify-start text-left h-auto py-2"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                    <ArrowUpRight className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
