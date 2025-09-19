import { Footer } from "@/components/footer"

export default function PaymentPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-[#B48500]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#B48500] mb-8 text-center">سياسة الدفع والاشتراك والاسترجاع</h1>

          <div className="space-y-8 text-[#8B6914] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٧.١ أنواع الاشتراك</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>الاشتراك الشهري: قيمة الاشتراك الشهري تبلغ خمسة آلاف (٥٬٠٠٠) ريال سعودي.</li>
                <li>
                  الاشتراك السنوي: قيمة الاشتراك السنوي ستون ألف (٦٠٬٠٠٠) ريال سعودي، مع خصم بنسبة ١٠٪ عند الدفع السنوي
                  المسبق، ليصبح المبلغ الإجمالي أربعة وخمسين ألف (٥٤٬٠٠٠) ريال سعودي.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٧.٢ وسائل الدفع المتاحة</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>مدى</li>
                <li>فيزا</li>
                <li>ماستركارد</li>
                <li>باي بال</li>
                <li>آبل باي</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٧.٣ إجراءات التفعيل والإيقاف</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>يتم تفعيل الاشتراك تلقائيًا بالكامل فور إتمام عملية الدفع بنجاح.</li>
                <li>يتم إيقاف الخدمة تلقائيًا في حال عدم سداد رسوم الاشتراك الشهري أو السنوي في الموعد المحدد.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٧.٤ سياسة الاسترجاع والإلغاء</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  لا يحق للمستخدم طلب استرجاع مالي بعد بدء تفعيل الاشتراك بأي من الخطط وإرسال بيانات الدخول الخاصة
                  بالحساب.
                </li>
                <li>
                  يمكن للمستخدم إلغاء التجديد التلقائي للاشتراك القادم بشرط تقديم إشعار كتابي قبل سبعة (٧) أيام على
                  الأقل من تاريخ انتهاء الاشتراك الحالي.
                </li>
                <li>تتم حذف جميع بيانات الحساب نهائيًا بعد مرور ثلاثين (٣٠) يومًا من تاريخ إلغاء الاشتراك.</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
