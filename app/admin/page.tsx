"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { Header } from "@/components/header"
import { StockTicker } from "@/components/stock-ticker"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.type !== "admin")) {
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

  if (!user || user.type !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <StockTicker />
      <AdminDashboard />
    </div>
  )
}
