import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-[#B48500] mb-8 text-center">الرسالة</h1>
            <div className="bg-black border border-[#B48500] rounded-lg p-8">
              <p className="text-[#8B6914] text-lg leading-relaxed">
                تسخير قوة الذكاء الاصطناعي المتقدم لتوفير منصة تحليل مالي شاملة وذكية وفورية تمكن جميع الشركات والمؤسسات
                والمنظمات من فهم أدائها المالي، واكتشاف المخاطر والتنبؤات وتحديد الفرص ونقاط القوة وتحديد التهديدات
                ونقاط الضعف، واتخاذ قرارات دقيقة بسرعة وسهولة فائقة، دون الحاجة إلى خبرات مالية متعمقة.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
