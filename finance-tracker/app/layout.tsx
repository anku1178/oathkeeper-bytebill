import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { AIAssistant } from "@/components/ai-assistant"
import { AuthProvider } from "@/components/AuthContext"
import AuthGate from "@/components/AuthGate"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FinanceTracker",
  description: "Personal Finance Tracking and Analytics",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthGate>
              <div className="flex h-screen overflow-hidden">
                <AppSidebar />
                <div className="flex-1 overflow-auto">{children}</div>
                <AIAssistant />
              </div>
            </AuthGate>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
