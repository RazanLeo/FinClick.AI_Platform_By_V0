"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSwitcher } from "./language-switcher"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Search,
  Bell,
  Home,
  BarChart3,
  Building,
  TrendingUp,
  Star,
  CreditCard,
  PlayCircle,
  Phone,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase()
      if (searchTerm.includes("تحليل") || searchTerm.includes("analysis")) {
        document.getElementById("analysis-types")?.scrollIntoView({ behavior: "smooth" })
      } else if (searchTerm.includes("مميزات") || searchTerm.includes("features")) {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
      } else if (searchTerm.includes("أسعار") || searchTerm.includes("pricing")) {
        const pricingSection = document.querySelector('[data-section="pricing"]')
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: "smooth" })
        }
      } else if (searchTerm.includes("شركة") || searchTerm.includes("company")) {
        const modal = document.getElementById("company-modal")
        if (modal) modal.style.display = "flex"
      } else if (searchTerm.includes("خطوات") || searchTerm.includes("steps")) {
        document.getElementById("steps")?.scrollIntoView({ behavior: "smooth" })
      } else if (searchTerm.includes("أدوات") || searchTerm.includes("tools")) {
        const toolsSection = document.querySelector('[data-section="free-tools"]')
        if (toolsSection) {
          toolsSection.scrollIntoView({ behavior: "smooth" })
        }
      } else if (searchTerm.includes("تواصل") || searchTerm.includes("contact")) {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
      } else {
        // Default to hero section if no match
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      setSearchQuery("") // Clear search after use
    }
  }

  const goToHomePage = () => {
    if (window.location.pathname !== "/") {
      router.push("/")
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      goToHomePage()
    } else if (sectionId === "pricing") {
      const pricingSection = document.querySelector('[data-section="pricing"]')
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" })
      }
    } else if (sectionId === "free-tools") {
      const toolsSection = document.querySelector('[data-section="free-tools"]')
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="bg-black border-b border-[#B48500] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/images/finclick-logo.png"
                alt="FinClick.AI Logo"
                width={60}
                height={60}
                className="cursor-pointer animate-pulse-gold"
                onClick={goToHomePage}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#B48500] cursor-pointer" onClick={goToHomePage}>
                FinClick.AI
              </h1>
              <p className="text-sm text-[#8B6914]">منصة التحليل المالي الذكية الثورية</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B48500] w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="البحث في المنصة..."
                className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914] pr-10"
              />
            </form>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
              <Bell className="w-4 h-4" />
            </Button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[#B48500]">مرحباً، {user.name}</span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                >
                  تسجيل الخروج
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth">
                  <Button
                    variant="outline"
                    className="bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                  >
                    إنشاء حساب
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-[#B48500] text-black hover:bg-[#8B6914]">تسجيل الدخول</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="border-t border-[#B48500] py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={goToHomePage}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <Home className="w-4 h-4" />
                الصفحة الرئيسية
              </button>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors font-semibold"
              >
                <BarChart3 className="w-4 h-4" />
                لوحة التحكم
              </Link>
              <button
                onClick={() => {
                  const modal = document.getElementById("company-modal")
                  if (modal) modal.style.display = "flex"
                }}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <Building className="w-4 h-4" />
                الشركة
              </button>
              <button
                onClick={() => scrollToSection("analysis-types")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                أنواع التحليل
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <Star className="w-4 h-4" />
                مميزات المنصة
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                الاشتراكات والأسعار
              </button>
              <button
                onClick={() => scrollToSection("steps")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                خطوات المنصة
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <Phone className="w-4 h-4" />
                التواصل والدعم
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
