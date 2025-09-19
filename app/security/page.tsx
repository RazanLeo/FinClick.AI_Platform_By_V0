import { Footer } from "@/components/footer"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-[#B48500]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#B48500] mb-8 text-center">سياسة الأمان</h1>

          <div className="space-y-8 text-[#8B6914] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٤.١ حماية البنية التحتية</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  تُستضاف بيانات المنصة حصريًا داخل مراكز بيانات سعودية آمنة ومتوافقة مع معايير البنك المركزي السعودي
                  وهيئة الاتصالات والفضاء والتقنية.
                </li>
                <li>
                  يتم تطبيق جدر حماية متعددة الطبقات وأنظمة كشف ومنع التسلل لضمان التصدي لأي محاولة اختراق أو وصول غير
                  مصرح به.
                </li>
                <li>تُشفّر جميع الاتصالات بين المستخدم والمنصة باستخدام أحدث بروتوكولات التشفير لضمان سرية البيانات.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٤.٢ حماية البيانات</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  تُشفّر جميع الملفات والبيانات داخل قواعد البيانات باستخدام تقنيات تشفير متقدمة لضمان حماية المعلومات من
                  أي اختراق.
                </li>
                <li>
                  يتم تقسيم الصلاحيات بحيث لا يُسمح لأي موظف بالوصول إلى بيانات المستخدمين إلا عند الضرورة وبموافقة
                  رسمية، لتحقيق أعلى درجات الخصوصية.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٤.٣ المراقبة والرصد</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>تُنفذ مراقبة مستمرة للنشاطات على مدار الساعة لرصد أي نشاط مشبوه أو محاولة اختراق.</li>
                <li>
                  توثّق جميع المعاملات داخل المنصة في سجل تدقيق شامل، ما يتيح كشف أي محاولة تلاعب أو وصول غير مصرح به.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٤.٤ النسخ الاحتياطي</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  تُجرى عمليات نسخ احتياطي يومية للبيانات داخل مراكز بيانات منفصلة في المملكة العربية السعودية لضمان
                  سلامة المعلومات.
                </li>
                <li>
                  توفر المنصة إمكانية استرجاع البيانات خلال دقائق في حالات الطوارئ، مما يضمن استمرارية الخدمة واستعادة
                  المعلومات بسرعة.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٤.٥ حماية الحسابات</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  تتم عملية الدخول إلى المنصة عبر كلمات مرور قوية، مع تحديد عدد المحاولات المسموح بها لتقليل مخاطر
                  الاختراق.
                </li>
                <li>تتوفر خاصية التحقق الثنائي للحسابات الحساسة، ما يعزز مستوى الأمان بشكل فعال.</li>
                <li>يخصص لكل مستخدم حساب منفرد، ويُمنع منعًا باتًا مشاركة الحسابات بين أكثر من شخص.</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
