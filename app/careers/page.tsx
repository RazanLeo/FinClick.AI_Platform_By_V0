import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#B48500] mb-8">الوظائف</h1>
          <div className="bg-gradient-to-r from-[#0a0a0a] to-black border border-[#B48500] rounded-lg p-12">
            <h2 className="text-2xl font-semibold text-[#B48500] mb-4">قيد الإنشاء</h2>
            <p className="text-[#8B6914] text-lg">
              نعمل حالياً على إعداد قسم الوظائف. سيتم إطلاقه قريباً مع فرص عمل مميزة في مجال التكنولوجيا المالية.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
