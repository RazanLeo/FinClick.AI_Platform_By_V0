"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "أحمد المالكي",
    role: "مدير مالي",
    company: "شركة الرياض للتطوير",
    rating: 5,
    text: "نظام شامل ومتكامل ساعدني على أن أفهم أداء شركتي بسرعة ودقة وسهولة. إنه نظام رائع يقدم كل أنواع التحليل المالي كما يقدم مقارنات على جميع المستويات ويولد تقارير وعروض تقديمية. أنصح كل الشركات به.",
  },
  {
    name: "فاطمة العتيبي",
    role: "محللة مالية",
    company: "البنك الأهلي السعودي",
    rating: 5,
    text: "أنا كمدير ومحلل مالي لم أعد بحاجة لتضييع وقتي في الحسابات الطويلة بالساعات والأسابيع وصار كل عملي أسهل واجتماعاتي أكثر احترافية.",
  },
  {
    name: "خالد الشمري",
    role: "مستثمر",
    company: "محفظة استثمارية خاصة",
    rating: 5,
    text: "أنا كمستثمر صرت أستطيع اتخاذ قرارات استثمارية لحظية وتحديد أسهم الشركات التي أود أن أستثمر فيها بثقة نشكركم على هذا النظام الذكي. نشكركم أيضاً على حاسبة السعر العادل للسهم المجانية أنها حقاً مفيدة.",
  },
  {
    name: "سارة القحطاني",
    role: "مسؤولة التمويل",
    company: "بنك الراجحي",
    rating: 5,
    text: "بحكم عملي كموظفة مسؤولة عن عمليات التمويل والإقراض لقد أفادني النظام لتقييم الشركات بشكل سريع ودقيق واتخاذ قرار التمويل والإقراض بسرعة وحكمة.",
  },
  {
    name: "محمد الدوسري",
    role: "مقيم مالي",
    company: "شركة التقييم المالي المتقدم",
    rating: 5,
    text: "كخبير في التقييم المالي، وجدت في FinClick.AI أداة لا غنى عنها. النظام يوفر تحليلات عميقة ودقيقة تساعدني في تقييم الشركات والمشاريع بكفاءة عالية.",
  },
  {
    name: "نورا الغامدي",
    role: "مديرة استثمار",
    company: "صندوق الاستثمارات العامة",
    rating: 5,
    text: "المنصة ثورية حقاً في مجال التحليل المالي. التقارير المفصلة والمقارنات المعيارية تساعدني في اتخاذ قرارات استثمارية مدروسة ومبنية على أسس علمية قوية.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 neural-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">ماذا يقول عملاؤنا</h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto">آراء وتجارب عملائنا الكرام مع منصة FinClick.AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-black border-[#B48500] hover:border-[#8B6914] transition-all duration-300">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#B48500] mb-4 opacity-50" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#B48500] fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-[#8B6914] leading-relaxed mb-6 text-sm">"{testimonial.text}"</p>

                {/* Customer Info */}
                <div className="border-t border-[#B48500] pt-4">
                  <h4 className="text-[#B48500] font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-[#8B6914] text-sm">{testimonial.role}</p>
                  <p className="text-[#8B6914] text-xs opacity-75">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="text-center mt-16">
          <div className="bg-black border border-[#B48500] rounded-lg p-8 max-w-md mx-auto">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-[#B48500] fill-current" />
              ))}
            </div>
            <div className="text-3xl font-bold text-[#B48500] mb-2">5.0/5</div>
            <p className="text-[#8B6914]">متوسط تقييم العملاء</p>
            <p className="text-[#8B6914] text-sm mt-2">بناءً على +1000 تقييم</p>
          </div>
        </div>
      </div>
    </section>
  )
}
