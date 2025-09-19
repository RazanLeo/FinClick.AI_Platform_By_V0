import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth/auth-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "FinClick.AI - منصة التحليل المالي الذكية الثورية",
  description: "Revolutionary Intelligent Financial Analysis Platform - منصة التحليل المالي الذكية الثورية",
  generator: "FinClick.AI",
  keywords: "financial analysis, AI, artificial intelligence, تحليل مالي, ذكاء اصطناعي",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-[#B48500]`}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
            <Analytics />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
