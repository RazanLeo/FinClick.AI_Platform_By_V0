"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Shield, Users, Zap, HeadphonesIcon } from "lucide-react"

const pricingPlans = [
  {
    name: "الخطة الشهرية",
    price: "5,000",
    period: "شهرياً",
    currency: "ريال سعودي",
    description: "مثالية للشركات الناشئة والمحللين المستقلين",
    features: [
      "جميع أنواع التحليل المالي (180+ تحليل)",
      "تقارير مفصلة وعروض تقديمية",
      "تصدير بجميع الصيغ PDF,Excel,Word, PowerPoint",
      "مقارنات معيارية ومقارنات متوسط الصناعة على جميع المستويات الجغرافية",
      "دعم فني على مدار الساعة 7/24",
      "واجهة ثنائية اللغة (عربي/إنجليزي)",
      "تحديثات مستمرة للبيانات والميزات وأنواع التحليلات",
      "مستخدم واحد فقط",
    ],
    popular: false,
    icon: <Users className="w-6 h-6" />,
  },
  {
    name: "الخطة السنوية",
    price: "54,000",
    originalPrice: "60,000",
    period: "سنوياً",
    currency: "ريال سعودي",
    discount: "وفر 6,000 ريال سعودي",
    discountPercent: "خصم 10%",
    description: "الأكثر قيمة - الأفضل للشركات المتوسطة والكبيرة",
    features: [
      "جميع أنواع التحليل المالي (180+ تحليل)",
      "تقارير مفصلة وعروض تقديمية",
      "تصدير بجميع الصيغ PDF,Excel,Word, PowerPoint",
      "مقارنات معيارية ومقارنات متوسط الصناعة على جميع المستويات الجغرافية",
      "دعم فني على مدار الساعة 7/24",
      "واجهة ثنائية اللغة (عربي/إنجليزي)",
      "تحديثات مستمرة للبيانات والميزات وأنواع التحليلات",
      "مستخدم واحد فقط",
    ],
    popular: true,
    icon: <Star className="w-6 h-6" />,
  },
]

const guarantees = [
  {
    icon: <Shield className="w-8 h-8 text-[#B48500]" />,
    title: "ضمان الأمان",
    description: "تشفير عالي المستوى وحماية كاملة للبيانات",
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8 text-[#B48500]" />,
    title: "دعم مستمر",
    description: "فريق دعم متخصص متاح 24/7",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#B48500]" />,
    title: "تحديثات مجانية",
    description: "جميع التحديثات والميزات الجديدة مجاناً",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" data-section="pricing" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">الأسعار والاشتراكات</h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto mb-8">
            اختر الخطة المناسبة لك واحصل على أقوى منصة تحليل مالي ذكية في المنطقة
          </p>
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#B48500] rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-[#B48500]" />
            <span className="text-[#B48500] font-semibold">وفر حتى 10% مع الاشتراك السنوي</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="relative">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-[#B48500] text-black text-lg px-6 py-2 font-bold whitespace-nowrap shadow-lg">
                    الأكثر شعبية ⭐
                  </Badge>
                </div>
              )}

              <Card
                className={`bg-black border-[#B48500] hover:border-[#8B6914] transition-all duration-300 h-full ${
                  plan.popular ? "border-2 shadow-lg shadow-[#B48500]/20 scale-105" : ""
                }`}
              >
                <CardHeader className="text-center pb-4 pt-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {plan.icon}
                    <CardTitle className="text-2xl text-[#B48500]">{plan.name}</CardTitle>
                  </div>

                  <p className="text-[#8B6914] text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    {plan.originalPrice && (
                      <div className="text-lg text-[#8B6914] line-through mb-2">
                        {plan.originalPrice} {plan.currency}
                      </div>
                    )}
                    <div className="text-5xl font-bold text-[#B48500] mb-2">
                      {plan.price}
                      <span className="text-lg text-[#8B6914] mr-2">ر.س</span>
                    </div>
                    <div className="text-[#8B6914]">{plan.period}</div>
                  </div>

                  {plan.discount && (
                    <div className="space-y-2 mb-6">
                      <Badge className="bg-green-500 text-white text-sm px-4 py-1">{plan.discountPercent}</Badge>
                      <div className="text-green-400 font-semibold text-sm">{plan.discount}</div>
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#B48500] flex-shrink-0 mt-0.5" />
                        <span className="text-[#8B6914] text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full text-lg py-6 font-bold transition-all duration-300 ${
                      plan.popular
                        ? "bg-[#B48500] text-black hover:bg-[#8B6914] shadow-lg hover:shadow-xl"
                        : "bg-transparent border-2 border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular ? "ابدأ الآن - الأكثر شعبية" : "اشترك الآن"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#B48500] text-center mb-12">ضماناتنا لك</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[#1a1a1a] border border-[#B48500] rounded-lg hover:border-[#8B6914] transition-colors"
              >
                <div className="flex justify-center mb-4">{guarantee.icon}</div>
                <h4 className="text-[#B48500] font-bold mb-2">{guarantee.title}</h4>
                <p className="text-[#8B6914] text-sm">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
