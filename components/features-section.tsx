"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Zap,
  Users,
  Brain,
  BarChart3,
  Cloud,
  Eye,
  Clock,
  MousePointer,
  Target,
  Shield,
  TrendingUp,
  FileText,
  Globe,
  Award,
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "ثورة ونقلة نوعية في عالم التحليل المالي",
    description:
      "نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين. ثورة يعجز أمامها جميع متخصصين وخبراء التحليل المالي العالميين. تقديم موقع إلكتروني يعمل كمنصة ونظام كامل شامل يغنيك عن أي مدير أو محلل أو خبير مالي.",
  },
  {
    icon: Users,
    title: "يخدم كل مستفيدي التحليل المالي",
    description: "يخدم كل مستفيدي التحليل المالي وكل أغراض التحليل المالي (أفراد، مؤسسات شركات، منظمات)",
  },
  {
    icon: Brain,
    title: "يقوم على الذكاء الاصطناعي",
    description: "منصة متطورة تعتمد على أحدث تقنيات الذكاء الاصطناعي والتعلم الآلي",
  },
  {
    icon: BarChart3,
    title: "جميع أنواع التحليل المالي الكمي",
    description: "يقدم جميع أنواع التحليل المالي الكمي المعروفة في العالم. ١٨٠+ تحليل مالي.",
  },
  {
    icon: Cloud,
    title: "بيئة سحابية",
    description: "بيئة سحابية تستطيع فتحه من أي مكان وفي أي وقت ومن أي متصفح وعلى أي جهاز.",
  },
  {
    icon: Eye,
    title: "واجهة واضحة واحترافية",
    description: "واجهة واضحة واحترافية وطريقة عرض للتحليلات تناسب الجميع حتى لو لم تكن لديك معرفة أو خلفية مالية.",
  },
  {
    icon: Clock,
    title: "السرعة",
    description: "أحصل على التحليل في ثوانٍ معدودة بضغطة زر.",
  },
  {
    icon: MousePointer,
    title: "السهولة",
    description: "٣ خطوات (أرفق قوائمك – حدد خيارات التحليل – اضغط زر التحليل)",
  },
  {
    icon: Target,
    title: "الدقة والكفاءة المتناهية",
    description: "دقة بنسبة ٩٩٪",
  },
  {
    icon: Shield,
    title: "أمان عالي",
    description: "حماية متقدمة لبياناتك المالية مع أعلى معايير الأمان",
  },
  {
    icon: TrendingUp,
    title: "محلل مالي خارق",
    description: "محلل مالي خارق يساعد كل شخص يتخذ القرارات المالية اللحظية.",
  },
  {
    icon: FileText,
    title: "تقارير تفصيلية وعروض تقديمية",
    description: "تقارير تفصيلة وعروض تقديمية جاهزة للعرض والمناقشة والتسليم.",
  },
  {
    icon: Globe,
    title: "مقارنات معيارية",
    description: "مقارنات معيارية ومقارنات متوسط الصناعة علي جميع المستويات الجغرافية.",
  },
  {
    icon: Award,
    title: "جودة عالمية",
    description: "معايير جودة عالمية في التحليل المالي",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">لماذا FinClick.AI؟</h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto">
            اكتشف المميزات الثورية التي تجعل منصتنا الخيار الأول للتحليل المالي الذكي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black border-[#B48500] hover:border-[#8B6914] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-[#B48500]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#B48500] mb-3 leading-tight">{feature.title}</h3>
                    <p className="text-[#8B6914] leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
