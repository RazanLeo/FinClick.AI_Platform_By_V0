"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Building2, TrendingUp, Banknote, Users, Globe, Target } from "lucide-react"

export function BeneficiariesSection() {
  return (
    <section id="beneficiaries" className="py-20 neural-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">المستفيدون والأغراض</h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto">
            منصة شاملة تخدم جميع احتياجات التحليل المالي لكافة الفئات والمؤسسات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-black border border-[#B48500] rounded-lg hover:border-[#8B6914] transition-colors">
            <Building2 className="w-16 h-16 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#B48500] mb-2">أصحاب الشركات</h3>
            <p className="text-[#8B6914]">فهم أداء الشركة المالي ومقارنته بالمنافسين</p>
          </div>

          <div className="text-center p-6 bg-black border border-[#B48500] rounded-lg hover:border-[#8B6914] transition-colors">
            <TrendingUp className="w-16 h-16 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#B48500] mb-2">المحللون الماليون</h3>
            <p className="text-[#8B6914]">إنجاز التحليلات المعقدة في ثوانٍ معدودة</p>
          </div>

          <div className="text-center p-6 bg-black border border-[#B48500] rounded-lg hover:border-[#8B6914] transition-colors">
            <Banknote className="w-16 h-16 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#B48500] mb-2">المستثمرون</h3>
            <p className="text-[#8B6914]">اتخاذ قرارات استثمارية مدروسة وفورية</p>
          </div>

          <div className="text-center p-6 bg-black border border-[#B48500] rounded-lg hover:border-[#8B6914] transition-colors">
            <Users className="w-16 h-16 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#B48500] mb-2">موظفو البنوك</h3>
            <p className="text-[#8B6914]">تقييم الشركات لقرارات التمويل والإقراض</p>
          </div>

          <div className="text-center p-6 bg-black border border-[#B48500] rounded-lg hover:border-[#8B6914] transition-colors">
            <Globe className="w-16 h-16 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#B48500] mb-2">المقيمون الماليون</h3>
            <p className="text-[#8B6914]">تقييم جدوى المشاريع والشركات بدقة</p>
          </div>

          <div className="text-center p-6 bg-black border border-[#B48500] rounded-lg hover:border-[#8B6914] transition-colors">
            <Target className="w-16 h-16 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#B48500] mb-2">جميع المهتمين</h3>
            <p className="text-[#8B6914]">كل من يحتاج التحليل المالي المتخصص</p>
          </div>
        </div>

        <div className="text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-[#B48500] text-black hover:bg-[#8B6914] text-xl px-8 py-4">
                اقرأ المزيد عن المستفيدين
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border-[#B48500] text-[#B48500] max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#B48500] text-center mb-4">
                  المستفيدون من منصة FinClick.AI
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 text-[#8B6914] leading-relaxed">
                <p>
                  هذه المنصة تمكن كل مستفيدي التحليل المالي أياً كانوا أفراد أو جهات أو منظمات من إجراء جميع أنواع
                  التحليل المالي الكمية المعروفة في العالم بجميع أنواعها وتصنيفاتها واستخداماتها من الكلاسيكية إلى
                  المعقدة جداً بخطوات بسيطة وثوانٍ معدودة وضغطة زر.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#B48500]">1. أصحاب الشركات والمدراء</h4>
                    <p>
                      تساعد صاحب الشركة على فهم أداء شركته المالي بسهولة وسرعة في لحظات ومقارنة أداء شركته بشركات أخرى
                      من نفس القطاع ونفس النشاط على عدة مستويات من المقارنة حسب متوسطات الصناعة.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#B48500]">2. المحللون والخبراء الماليون</h4>
                    <p>
                      تساعد المدير المالي أو المحلل المالي أو الخبير المالي أو المقيم المالي في أي شركة على إنجاز عمله
                      والقيام بجميع حسابات التحليل المالي في ثوانٍ معدودة بضغطة زر.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#B48500]">3. المستثمرون</h4>
                    <p>
                      تساعد أي مستثمر على اتخاذ قرار فوري لشراء أسهم شركة معينة أو الدخول في استثمار في شركة أياً كان نوع
                      الاستثمار.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#B48500]">4. موظفو البنوك</h4>
                    <p>تساعد موظفي البنوك على تقييم أداء الشركات لاتخاذ قرارات التمويل والإقراض.</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#B48500]">5. المقيمون الماليون</h4>
                    <p>
                      تساعد على تقييم جدوى المشاريع الجديدة أو تقييم الشركات الناشئة والكبيرة وتقييم الشركات والأعمال
                      بشكل كامل.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#B48500]">6. جميع المهتمين</h4>
                    <p>
                      تساعد جميع المهتمين بالتحليل المالي أياً كان فرد أو منظمة أو جهة. فهي منصة تقدم جميع أنواع التحليل
                      المالي في العالم بضغطة زر.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
