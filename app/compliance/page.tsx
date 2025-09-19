import { Footer } from "@/components/footer"

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-black text-[#B48500]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#B48500] mb-8 text-center">سياسة الامتثال</h1>

          <div className="space-y-8 text-[#8B6914] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٥.١ نظام حماية البيانات الشخصية السعودي</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>لا تُجمع أي بيانات شخصية إلا لغرض تقديم الخدمة فقط.</li>
                <li>يجب الحصول على موافقة صريحة من المستخدم قبل معالجة بياناته.</li>
                <li>يحق للمستخدم الوصول إلى بياناته أو تعديلها أو حذفها في أي وقت يشاء.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">
                ٥.٢ ضوابط البنك المركزي السعودي للأمن السيبراني
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  تُطبق جميع ضوابط الأمن السيبراني الصادرة عن البنك المركزي السعودي بما يتناسب مع خدمات المنصات السحابية
                  المالية.
                </li>
                <li>يتم إجراء تقييم دوري للمخاطر ورفع تقارير الامتثال عند الطلب للجهات المختصة.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">
                ٥.٣ التزامات هيئة الاتصالات والفضاء والتقنية
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>تُستضاف البيانات وتُعالج داخل المملكة العربية السعودية، التزامًا بسياسات سيادة البيانات الوطنية.</li>
                <li>تلتزم المنصة بكافة متطلبات إطار تنظيم الحوسبة السحابية الصادر عن الهيئة.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٥.٤ الإفصاح وإدارة الحوادث الأمنية</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>يتم إخطار الجهات المتضررة والجهات المختصة خلال مدة لا تتجاوز ٧٢ ساعة في حال وقوع أي حادث أمني.</li>
                <li>يوجد فريق مختص للاستجابة لحوادث الأمن السيبراني لضمان سرعة المعالجة والحد من الآثار.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٥.٥ خصوصية البيانات المالية</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  لا تتم مشاركة البيانات المالية أو التحليلات مع أي طرف خارجي إلا بعد الحصول على إذن صريح من المستخدم.
                </li>
                <li>تُستخدم البيانات المالية فقط لأغراض التحليل والتطوير الداخلي للمنصة.</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
