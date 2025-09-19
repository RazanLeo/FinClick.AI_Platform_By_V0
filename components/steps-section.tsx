"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Upload, Settings, Play } from "lucide-react"

const steps = [
  {
    icon: Upload,
    number: "1",
    title: "أرفق قوائمك",
    description: "ارفع القوائم المالية أو موازين المراجعة بأي صيغة (PDF, Excel, Word, صور) أو أدخل البيانات يدوياً",
  },
  {
    icon: Settings,
    number: "2",
    title: "حدد خيارات التحليل",
    description: "اختر اللغة، القطاع، النشاط، الكيان القانوني، عدد السنوات، ونوع المقارنة المطلوبة",
  },
  {
    icon: Play,
    number: "3",
    title: "اضغط زر التحليل",
    description: "احصل على تحليل شامل مفصل مع التقارير والعروض التقديمية في ثوانٍ معدودة",
  },
]

export function StepsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">خطوات المنصة</h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto">ثلاث خطوات بسيطة للحصول على تحليل مالي شامل ومتقدم</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="bg-black border-[#B48500] hover:border-[#8B6914] transition-all duration-300 relative"
            >
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-[#B48500] text-black rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="mt-6 mb-6">
                  <step.icon className="w-16 h-16 text-[#B48500] mx-auto" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#B48500] mb-4">{step.title}</h3>

                {/* Description */}
                <p className="text-[#8B6914] leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden md:block relative max-w-6xl mx-auto mt-8">
          <div className="absolute top-1/2 left-1/4 right-3/4 h-0.5 bg-[#B48500] opacity-50"></div>
          <div className="absolute top-1/2 left-3/4 right-1/4 h-0.5 bg-[#B48500] opacity-50"></div>
        </div>
      </div>
    </section>
  )
}
