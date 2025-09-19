import { Footer } from "@/components/footer"

export default function UserGuidePage() {
  return (
    <div className="min-h-screen bg-black text-[#B48500]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#B48500] mb-8 text-center">كتيب استخدام منصة FinClick.AI</h1>
          <p className="text-center text-[#8B6914] mb-12">دليل إرشادي متكامل للاستفادة المثلى من المنصة</p>

          <div className="space-y-8 text-[#8B6914] leading-relaxed">
            <div className="bg-[#1a1a1a] border border-[#B48500] p-6 rounded-lg">
              <p className="text-[#B48500] font-semibold">
                مرحبًا بك في منصة FinClick.AI، المنصة الرائدة في الذكاء الاصطناعي للتحليل المالي المتقدم. يُرشدك هذا
                الدليل خطوة بخطوة لتحقيق أقصى استفادة من المنصة والحصول على تحليلات مالية دقيقة وذكية خلال ثوانٍ معدودة.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٩.١ إنشاء حساب وتفعيل الاشتراك</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>الدخول إلى صفحة الاشتراك عبر الموقع الرسمي للمنصة.</li>
                <li>اختيار الخطة المناسبة (شهرية أو سنوية).</li>
                <li>إدخال البيانات المطلوبة: الاسم، البريد الإلكتروني، رقم الجوال، واسم الشركة.</li>
                <li>
                  إتمام عملية الدفع عبر إحدى وسائل الدفع المتاحة (مدى، بطاقة ائتمان، الدفع الإلكتروني، أو آبل باي).
                </li>
                <li>
                  ستصلك رسالة تفعيل على بريدك الإلكتروني تتضمن:
                  <ul className="list-disc list-inside mr-6 mt-2 space-y-1">
                    <li>اسم المستخدم</li>
                    <li>كلمة المرور</li>
                    <li>رابط الدخول للمنصة</li>
                  </ul>
                </li>
              </ol>
              <div className="bg-[#1a1a1a] border border-[#B48500] p-4 rounded-lg mt-4">
                <p className="text-[#B48500]">
                  يتم تفعيل الحساب فورًا بعد إتمام الدفع. إذا لم تصلك بيانات الدخول خلال ثلاث دقائق، يرجى التواصل مع
                  الدعم الفني.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٩.٢ تسجيل الدخول لأول مرة</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>فتح الرابط المرسل عبر البريد الإلكتروني.</li>
                <li>إدخال اسم المستخدم وكلمة المرور.</li>
                <li>اختيار لغة الواجهة (العربية أو الإنجليزية).</li>
                <li>الضغط على لوحة المستخدم الرئيسية للدخول إلى المنصة.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٩.٣ بدء عملية التحليل</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#B48500] mb-2">
                    إرفاق المستندات المالية المطلوبة (ثلاث طرق متاحة):
                  </h3>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    <li>
                      تحميل القوائم المالية والموازنات التقديرية بأي صيغة (ملف نصي، جداول بيانات، مستندات ممسوحة ضوئيًا
                      أو صور).
                    </li>
                    <li>تحميل ميزان المراجعة بأي صيغة مماثلة.</li>
                    <li>إدخال البيانات يدويًا عبر القوالب الجاهزة المتوفرة داخل المنصة.</li>
                  </ul>
                </div>

                <p>يدعم المنصة رفع مستندات حتى عشر سنوات مالية (عشرة ملفات بأي صيغة أو حجم).</p>

                <div>
                  <h3 className="text-lg font-semibold text-[#B48500] mb-2">تحديد خيارات التحليل:</h3>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    <li>اسم الشركة (يظهر في التقرير)</li>
                    <li>القطاع (للمقارنة بمتوسط الصناعة)</li>
                    <li>النشاط (لتحديد الشركات المشابهة وإجراء المقارنة بناء عليها)</li>
                    <li>الكيان القانوني (لتخصيص المقارنة بدقة أعلى)</li>
                    <li>
                      نوع المقارنة (محلي سعودي، خليجي، عربي، آسيوي، أفريقي، أوروبي، أمريكي شمالي أو جنوبي، أو عالمي)
                    </li>
                    <li>عدد سنوات التحليل (من سنة حتى عشر سنوات)</li>
                    <li>لغة التقرير والعرض التقديمي</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] border border-[#B48500] p-4 rounded-lg">
                  <p className="text-[#B48500] font-semibold mb-2">عملية التحليل:</p>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    <li>الضغط على زر "ابدأ التحليل" لبدء معالجة البيانات بواسطة الذكاء الاصطناعي</li>
                    <li>تظهر شاشة التحليل اللحظي، وخلال ثوانٍ يتم عرض النتائج المفصلة</li>
                    <li>
                      يتضمن التقرير أكثر من ١٨٠ نوعًا من التحليلات مع شرح مبسط لكل مؤشر ونتيجته، مقارنة بمتوسطات الصناعة
                      والشركات المماثلة، مع التنبؤات، المخاطر، نقاط القوة والضعف، الفرص والتهديدات، التقييم النهائي،
                      التوصيات والحلول الاستراتيجية، بالإضافة إلى رسوم بيانية ومخططات توضيحية
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٩.٤ استعراض وتحميل التقارير</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>مشاهدة لوحة التحليل على الشاشة.</li>
                <li>تحميل تقرير شامل بصيغة مستند نصي أو ملف رقمي (أكثر من ٥٠ صفحة).</li>
                <li>تحميل عرض تقديمي تلقائي بصيغة العروض التقديمية. (أكثر من ٥٠ صفحة).</li>
                <li>إمكانية طباعة التقارير والعروض التقديمية مباشرة.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٩.٥ الوصول إلى التحليلات السابقة</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>من قائمة التنقل، اختيار "الشركات".</li>
                <li>تحديد اسم الشركة المراد استعراض تحليلاتها.</li>
                <li>استعراض آخر التحليلات المحفوظة، مع إمكانية إعادة التحليل أو إنشاء تحليل جديد.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٩.٦ إدارة الحساب والاشتراك</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>تغيير كلمة المرور.</li>
                <li>تغيير الخطة (من شهرية إلى سنوية أو العكس).</li>
                <li>إيقاف أو تجديد الاشتراك.</li>
                <li>تحديث بيانات الشركة عند الحاجة.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٩.٧ الدعم والمساعدة</h2>
              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>الاطلاع على قاعدة المعرفة والأسئلة الشائعة داخل المنصة.</li>
                  <li>التواصل مع فريق الدعم الفني عبر:</li>
                </ol>

                <div className="bg-[#1a1a1a] border border-[#B48500] p-4 rounded-lg mr-6">
                  <ul className="space-y-2">
                    <li>
                      <strong>البريد الإلكتروني:</strong> finclick.ai@gmail.com
                    </li>
                    <li>
                      <strong>الهاتف/واتساب/تلغرام:</strong> 00966544827213
                    </li>
                  </ul>
                  <p className="text-[#B48500] mt-4">
                    الدعم الفني متوفر يوميًا من الساعة ١٠ صباحًا حتى ٥ مساءً بتوقيت المملكة العربية السعودية.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B48500] mb-4">٩.٨ نصائح مهمة لرفع جودة التحليل</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>كلما كانت القوائم المالية واضحة ومنظمة، زادت دقة النتائج بشكل ملحوظ.</li>
                <li>يفضل إدخال بيانات لخمسة أعوام أو أكثر للحصول على تحليلات زمنية دقيقة وشاملة.</li>
                <li>يمكنك تغيير لغة التقرير والعرض التقديمي إلى العربية أو الإنجليزية في أي وقت.</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
