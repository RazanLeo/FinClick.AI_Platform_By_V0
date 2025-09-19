"use client"

import { X, Building, Target, Star, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CompanyModal() {
  const closeModal = () => {
    const modal = document.getElementById("company-modal")
    if (modal) modal.style.display = "none"
  }

  return (
    <div
      id="company-modal"
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      style={{ display: "none" }}
      onClick={closeModal}
    >
      <div
        className="bg-black border border-[#B48500] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#B48500]">
          <h2 className="text-3xl font-bold text-[#B48500]">عن الشركة</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeModal}
            className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* الرؤية */}
          <div className="bg-gradient-to-r from-[#0a0a0a] to-black border border-[#B48500] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-[#B48500]" />
              <h3 className="text-2xl font-bold text-[#B48500]">الرؤية</h3>
            </div>
            <p className="text-[#8B6914] text-lg leading-relaxed">
              أن نحدث ثورة عالمية في مجال التحليل المالي من خلال تطوير منصة ذكية متقدمة تعتمد على الذكاء الاصطناعي،
              لتصبح الخيار الأول والأكثر موثوقية للمستثمرين والمحللين الماليين حول العالم، مما يساهم في تحسين جودة
              القرارات الاستثمارية وزيادة الكفاءة في الأسواق المالية.
            </p>
          </div>

          {/* الرسالة */}
          <div className="bg-gradient-to-r from-[#0a0a0a] to-black border border-[#B48500] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-[#B48500]" />
              <h3 className="text-2xl font-bold text-[#B48500]">الرسالة</h3>
            </div>
            <p className="text-[#8B6914] text-lg leading-relaxed">
              تسخير قوة الذكاء الاصطناعي المتقدم لتقديم تحليلات مالية دقيقة وشاملة في ثوانٍ معدودة، مما يمكن المستخدمين
              من اتخاذ قرارات استثمارية مدروسة ومبنية على بيانات موثوقة. نسعى لجعل التحليل المالي المتقدم متاحاً للجميع،
              من المستثمرين المبتدئين إلى المحترفين، من خلال واجهة سهلة الاستخدام وتقنيات متطورة.
            </p>
          </div>

          {/* الأهداف */}
          <div className="bg-gradient-to-r from-[#0a0a0a] to-black border border-[#B48500] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-[#B48500]" />
              <h3 className="text-2xl font-bold text-[#B48500]">الأهداف</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B48500] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#8B6914]">تطوير أكثر من 180 نوع تحليل مالي متقدم باستخدام الذكاء الاصطناعي</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B48500] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#8B6914]">تحقيق دقة تحليل تصل إلى 99% في التنبؤات والتوصيات المالية</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B48500] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#8B6914]">خدمة أكثر من مليون مستخدم حول العالم خلال السنوات الخمس القادمة</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B48500] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#8B6914]">تقليل وقت التحليل المالي من ساعات إلى ثوانٍ معدودة</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B48500] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#8B6914]">إنشاء نظام بيئي متكامل للتحليل المالي والاستثماري</p>
              </div>
            </div>
          </div>

          {/* القيم */}
          <div className="bg-gradient-to-r from-[#0a0a0a] to-black border border-[#B48500] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#B48500]" />
              <h3 className="text-2xl font-bold text-[#B48500]">القيم الأساسية</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black border border-[#8B6914] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-[#B48500] mb-2">الابتكار</h4>
                <p className="text-[#8B6914] text-sm">نسعى دائماً لتطوير حلول مبتكرة تواكب أحدث التطورات التكنولوجية</p>
              </div>
              <div className="bg-black border border-[#8B6914] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-[#B48500] mb-2">الدقة</h4>
                <p className="text-[#8B6914] text-sm">نلتزم بتقديم تحليلات مالية دقيقة وموثوقة بأعلى المعايير</p>
              </div>
              <div className="bg-black border border-[#8B6914] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-[#B48500] mb-2">السرعة</h4>
                <p className="text-[#8B6914] text-sm">نوفر نتائج فورية في ثوانٍ معدودة لتلبية احتياجات السوق السريعة</p>
              </div>
              <div className="bg-black border border-[#8B6914] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-[#B48500] mb-2">الأمان</h4>
                <p className="text-[#8B6914] text-sm">نضمن أعلى مستويات الأمان والخصوصية لبيانات عملائنا</p>
              </div>
              <div className="bg-black border border-[#8B6914] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-[#B48500] mb-2">الشفافية</h4>
                <p className="text-[#8B6914] text-sm">نؤمن بالشفافية الكاملة في جميع عملياتنا وتحليلاتنا</p>
              </div>
              <div className="bg-black border border-[#8B6914] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-[#B48500] mb-2">التميز</h4>
                <p className="text-[#8B6914] text-sm">نسعى للتميز في كل ما نقدمه من خدمات ومنتجات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
