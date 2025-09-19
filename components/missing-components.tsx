"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Globe, Languages, TrendingUp, Users, Building, BarChart3, PieChart, LineChart } from "lucide-react"

// Language Switcher Component
export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("ar")

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setCurrentLang(currentLang === "ar" ? "en" : "ar")}
      className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
    >
      <Languages className="w-4 h-4 mr-2" />
      {currentLang === "ar" ? "EN" : "عربي"}
    </Button>
  )
}

// Stock Ticker Component
export function StockTicker() {
  const stocks = [
    { symbol: "TASI", price: "12,345.67", change: "+2.34%" },
    { symbol: "ARAMCO", price: "32.45", change: "+1.23%" },
    { symbol: "SABIC", price: "89.12", change: "-0.45%" },
    { symbol: "STC", price: "45.67", change: "+0.89%" },
    { symbol: "ALRAJHI", price: "78.90", change: "+1.56%" },
  ]

  return (
    <div className="bg-[#1a1a1a] border-b border-[#B48500] py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <div className="inline-flex items-center space-x-8 rtl:space-x-reverse">
          {stocks.map((stock, index) => (
            <div key={index} className="inline-flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-[#B48500] font-semibold">{stock.symbol}</span>
              <span className="text-white">{stock.price}</span>
              <span className={stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}>{stock.change}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Modal Component
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-black border border-[#B48500] rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#B48500]">{title}</h2>
          <Button variant="ghost" onClick={onClose} className="text-[#B48500]">
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="text-right">{children}</div>
      </div>
    </div>
  )
}

// Company Modal Component
export function CompanyModal() {
  return (
    <div id="company-modal" className="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-75">
      <div className="bg-black border border-[#B48500] rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#B48500]">معلومات الشركة</h2>
          <Button
            variant="ghost"
            onClick={() => {
              const modal = document.getElementById("company-modal")
              if (modal) modal.style.display = "none"
            }}
            className="text-[#B48500]"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="text-right text-[#8B6914] space-y-4">
          <p>منصة FinClick.AI هي منصة ثورية للتحليل المالي الذكي تقدم 180+ نوع تحليل مالي بالذكاء الاصطناعي.</p>
          <p>
            تهدف المنصة إلى تحويل عملية التحليل المالي من عملية معقدة تستغرق أسابيع إلى عملية بسيطة تتم في ثوانٍ معدودة.
          </p>
        </div>
      </div>
    </div>
  )
}

// Beneficiaries Section
export function BeneficiariesSection() {
  const beneficiaries = [
    { icon: Building, title: "الشركات والمؤسسات", description: "تحليل شامل للأداء المالي" },
    { icon: Users, title: "المستثمرون", description: "تقييم الفرص الاستثمارية" },
    { icon: TrendingUp, title: "المحللون الماليون", description: "أدوات تحليل متقدمة" },
    { icon: Globe, title: "البنوك والمؤسسات المالية", description: "تقييم المخاطر الائتمانية" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">من يستفيد من المنصة؟</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficiaries.map((item, index) => (
            <Card key={index} className="bg-black border-[#B48500] text-center p-6">
              <CardContent>
                <item.icon className="w-12 h-12 text-[#B48500] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#B48500] mb-2">{item.title}</h3>
                <p className="text-[#8B6914] text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Steps Section
export function StepsSection() {
  const steps = [
    { number: 1, title: "أرفق المستندات", description: "ارفع القوائم المالية بأي صيغة" },
    { number: 2, title: "حدد الخيارات", description: "اختر القطاع والنشاط ونوع المقارنة" },
    { number: 3, title: "احصل على النتائج", description: "تحليل شامل في ثوانٍ معدودة" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">كيف تعمل المنصة؟</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-[#B48500] text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[#B48500] mb-2">{step.title}</h3>
              <p className="text-[#8B6914]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Analysis Types Section
export function AnalysisTypesSection() {
  const analysisTypes = [
    { title: "التحليل الأساسي", count: 106, icon: BarChart3 },
    { title: "التحليل التطبيقي", count: 21, icon: PieChart },
    { title: "التحليل المتقدم", count: 53, icon: LineChart },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">أنواع التحليل المالي</h2>
          <p className="text-xl text-[#8B6914]">180+ نوع تحليل مالي شامل ومتطور</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {analysisTypes.map((type, index) => (
            <Card key={index} className="bg-black border-[#B48500] text-center p-8">
              <CardContent>
                <type.icon className="w-16 h-16 text-[#B48500] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#B48500] mb-2">{type.title}</h3>
                <div className="text-4xl font-bold text-[#8B6914] mb-2">{type.count}</div>
                <p className="text-[#8B6914]">نوع تحليل</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Free Tools Section
export function FreeToolsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">أدوات مجانية</h2>
          <p className="text-xl text-[#8B6914]">أدوات مساعدة مجانية للتحليل المالي</p>
        </div>
        <div className="text-center">
          <Badge className="bg-[#B48500] text-black text-lg px-6 py-2">قريباً</Badge>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">آراء العملاء</h2>
          <p className="text-xl text-[#8B6914]">ماذا يقول عملاؤنا عن المنصة</p>
        </div>
        <div className="text-center">
          <Badge className="bg-[#B48500] text-black text-lg px-6 py-2">قريباً</Badge>
        </div>
      </div>
    </section>
  )
}
