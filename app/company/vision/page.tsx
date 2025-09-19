import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-[#B48500] mb-8 text-center">الرؤية</h1>
            <div className="bg-black border border-[#B48500] rounded-lg p-8">
              <p className="text-[#8B6914] text-lg leading-relaxed">
                أن نحدث ثورة عالمية في مجال التحليل المالي من خلال منصة ذكاء اصطناعي سعودية مبتكرة ترافق صناع القرار
                بشكل لحظي، لتصبح المعيار الذهبي للتحليل المالي الذكي والشامل لجميع أنواع التحليل المالي الكمي في ثوان
                معدودة وبضغطة زر، وأن نكون المستثمر الأول في تقنية التحليل المالي المعتمدة على الذكاء الاصطناعي في
                المنطقة والعالم.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
