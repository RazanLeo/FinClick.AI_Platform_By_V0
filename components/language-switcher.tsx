"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useRouter } from "next/navigation"

interface LanguageContent {
  ar: {
    [key: string]: string
  }
  en: {
    [key: string]: string
  }
}

const content: LanguageContent = {
  ar: {
    platformName: "FinClick.AI",
    platformSubtitle: "منصة التحليل المالي الذكية الثورية",
    heroTitle: "FinClick.AI",
    heroSubtitle: "منصة التحليل المالي الذكية الثورية",
    heroDescription: "Revolutionary Intelligent Financial Analysis Platform",
    heroText1: "ثورة ونقلة نوعية في عالم التحليل المالي - نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين",
    heroText2: "تقديم 180+ نوع تحليل مالي كمي بالذكاء الاصطناعي في ثوانٍ معدودة",
    startAnalysis: "ابدأ التحليل الآن",
    subscribe: "اشترك الآن",
    analysisTypes: "نوع تحليل مالي",
    accuracy: "دقة التحليل",
    steps: "خطوات بسيطة",
    whyFinClick: "لماذا FinClick.AI",
    beneficiaries: "المستفيدون والأغراض",
    platformSteps: "خطوات المنصة",
    analysisTypesSection: "أنواع التحليل",
    freeTools: "الأدوات المجانية",
    testimonials: "ماذا يقول عملاؤنا",
    pricing: "الاشتراكات والأسعار",
    contact: "التواصل والدعم",
    home: "الصفحة الرئيسية",
    dashboard: "لوحة التحكم",
    company: "الشركة",
    features: "مميزات المنصة",
    searchPlaceholder: "البحث في المنصة...",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    welcome: "مرحباً",
  },
  en: {
    platformName: "FinClick.AI",
    platformSubtitle: "Revolutionary Intelligent Financial Analysis Platform",
    heroTitle: "FinClick.AI",
    heroSubtitle: "Revolutionary Intelligent Financial Analysis Platform",
    heroDescription: "منصة التحليل المالي الذكية الثورية",
    heroText1:
      "A revolution and qualitative leap in the world of financial analysis - a system that turns the world upside down",
    heroText2: "Providing 180+ types of quantitative financial analysis with artificial intelligence in seconds",
    startAnalysis: "Start Analysis Now",
    subscribe: "Subscribe Now",
    analysisTypes: "Financial Analysis Types",
    accuracy: "Analysis Accuracy",
    steps: "Simple Steps",
    whyFinClick: "Why FinClick.AI",
    beneficiaries: "Beneficiaries and Purposes",
    platformSteps: "Platform Steps",
    analysisTypesSection: "Analysis Types",
    freeTools: "Free Tools",
    testimonials: "What Our Clients Say",
    pricing: "Subscriptions and Pricing",
    contact: "Contact and Support",
    home: "Home",
    dashboard: "Dashboard",
    company: "Company",
    features: "Platform Features",
    searchPlaceholder: "Search the platform...",
    login: "Login",
    register: "Sign Up",
    logout: "Logout",
    welcome: "Welcome",
  },
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const router = useRouter()

  const updateContent = (lang: "ar" | "en") => {
    const elements = document.querySelectorAll("[data-translate]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate")
      if (key && content[lang][key]) {
        element.textContent = content[lang][key]
      }
    })

    // Update placeholders
    const inputs = document.querySelectorAll("input[placeholder]")
    inputs.forEach((input) => {
      const htmlInput = input as HTMLInputElement
      if (htmlInput.placeholder.includes("البحث") || htmlInput.placeholder.includes("Search")) {
        htmlInput.placeholder = content[lang].searchPlaceholder
      }
    })

    // Update page title
    document.title =
      lang === "ar"
        ? "FinClick.AI - منصة التحليل المالي الذكية"
        : "FinClick.AI - Intelligent Financial Analysis Platform"

    // Update all text content based on language
    const heroText2 = document.querySelector("[data-hero-text2]")
    if (heroText2) {
      heroText2.textContent = content[lang].heroText2
    }
  }

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar"
    setLanguage(newLang)

    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"

    // Store language preference
    localStorage.setItem("preferred-language", newLang)

    // Update body class for styling
    document.body.className = document.body.className.replace(/lang-\w+/g, "")
    document.body.className += ` lang-${newLang}`

    // Update content
    updateContent(newLang)

    // Show language change notification
    const notification = document.createElement("div")
    notification.className = "fixed top-4 right-4 bg-[#B48500] text-black px-4 py-2 rounded-lg z-50 font-semibold"
    notification.textContent = newLang === "ar" ? "تم تغيير اللغة إلى العربية" : "Language changed to English"
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 2000)

    // Reload page to apply all changes properly
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem("preferred-language") as "ar" | "en" | null
    if (savedLang && savedLang !== language) {
      setLanguage(savedLang)
      document.documentElement.lang = savedLang
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr"
      document.body.className += ` lang-${savedLang}`
      updateContent(savedLang)
    }
  }, [language])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black transition-all duration-300"
    >
      <Globe className="w-4 h-4" />
      {language === "ar" ? (
        <span className="flex items-center gap-1">🇸🇦 العربية</span>
      ) : (
        <span className="flex items-center gap-1">🇺🇸 English</span>
      )}
    </Button>
  )
}
