import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-[#B48500] mb-8 text-center">شروط الاستخدام</h1>

            <div className="space-y-6">
              {[
                {
                  title: "الاستخدام المصرح به",
                  content: "تُستخدم المنصة لأغراض التحليل المالي فقط.",
                },
                {
                  title: "الاستخدام المحظور",
                  content: "يُحظر استخدام المنصة لأي أغراض غير قانونية أو مشبوهة أو لإنشاء خدمات منافسة.",
                },
                {
                  title: "الملكية الفكرية",
                  content:
                    "جميع حقوق الفكرة، النظم، والبرمجيات، والمحتوى، والتصميم، والتحليلات مملوكة حصرياً لمنصة FinClick.AI.",
                },
                {
                  title: "إعادة التوزيع",
                  content: "لا يجوز للمستخدم إعادة توزيع أو بيع المخرجات باعتبارها محتوى آلياً.",
                },
                {
                  title: "الدقة والمسؤولية",
                  content: "تبذل المنصة أقصى درجات الدقة في التحليل المالي.",
                },
                {
                  title: "إخلاء المسؤولية",
                  content:
                    "لا تتحمل المنصة أي مسؤولية قانونية عن القرارات المالية التي يتخذها المستخدم بناءً على التحليلات الصادرة عن النظام.",
                },
                {
                  title: "الاشتراك",
                  content: "يؤدي أي تأخير في سداد الرسوم إلى إيقاف الحساب تلقائياً.",
                },
                {
                  title: "مشاركة الحساب",
                  content: "لا يُسمح بمشاركة الحساب مع أي شخص آخر، إذ أن كل اشتراك مخصص لمستخدم واحد فقط.",
                },
                {
                  title: "إنهاء الاستخدام",
                  content: "يحق لمنصة FinClick.AI إيقاف أو تعطيل أي حساب يستخدم المنصة بشكل مسيء أو غير قانوني.",
                },
                {
                  title: "تعديل الشروط",
                  content: "تحتفظ إدارة المنصة بحق تعديل هذه الشروط في أي وقت.",
                },
                {
                  title: "الإشعار بالتعديلات",
                  content: "يتم إشعار المستخدم بأي تعديلات عبر البريد الإلكتروني.",
                },
              ].map((term, index) => (
                <div key={index} className="bg-black border border-[#B48500] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#B48500] mb-3">
                    {index + 1}. {term.title}
                  </h3>
                  <p className="text-[#8B6914] leading-relaxed">{term.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
