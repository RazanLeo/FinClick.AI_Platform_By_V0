"use client"
import { useAuth } from "@/components/auth/auth-provider"
import { Header } from "@/components/header"
import { StockTicker } from "@/components/stock-ticker"
import { ReportsView } from "@/components/reports/reports-view"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ReportsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#B48500] text-xl">جاري التحميل...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <StockTicker />
      <ReportsView />
    </div>
  )
}
