import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-[#B48500] mb-8 text-center">سياسة الخصوصية</h1>

            <div className="space-y-8">
              <div className="bg-black border border-[#B48500] rounded-lg p-6">
                <p className="text-[#8B6914] text-lg leading-relaxed mb-6">
                  مرحبًا بك في منصة FinClick.AI، حيث نولي أهمية قصوى لخصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه
                  السياسة آلية جمع واستخدام وحماية ومشاركة معلوماتك عند استخدامك منصتنا الذكية للتحليل المالي.
                </p>
              </div>

              <div className="bg-black border border-[#B48500] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#B48500] mb-4">المعلومات التي يتم جمعها</h2>
                <div className="space-y-4 text-[#8B6914]">
                  <div>
                    <h3 className="text-lg font-semibold text-[#B48500] mb-2">1. بيانات التسجيل:</h3>
                    <p>
                      تشمل الاسم، البريد الإلكتروني، رقم الهاتف، اسم الشركة، القطاع، النشاط، الكيان القانوني، والمعلومات
                      العامة عن الشركة.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#B48500] mb-2">2. بيانات الدفع:</h3>
                    <p>لا يتم تخزين بيانات البطاقة كاملة على خوادمنا.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#B48500] mb-2">3. الملفات المالية المرفوعة:</h3>
                    <p>مثل القوائم المالية، موازين المراجعة، والجداول المالية والموازنات التقديرية.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#B48500] mb-2">4. بيانات الاستخدام:</h3>
                    <p>والتفاعل داخل المنصة.</p>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-[#B48500] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#B48500] mb-4">طرق استخدام المعلومات</h2>
                <div className="space-y-3 text-[#8B6914]">
                  <p>1. تنفيذ التحليلات المالية وإصدار التقارير والعروض التقديمية المطلوبة.</p>
                  <p>2. تحسين جودة الخدمة وتطوير نماذج الذكاء الاصطناعي.</p>
                  <p>3. التواصل معك بشأن التحديثات، الإشعارات، والدعم الفني.</p>
                  <p>4. التحقق من الهوية ومنع الاستخدام غير المصرح به.</p>
                </div>
              </div>

              <div className="bg-black border border-[#B48500] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#B48500] mb-4">حماية البيانات</h2>
                <div className="space-y-3 text-[#8B6914]">
                  <p>1. تشفير كامل للبيانات أثناء النقل باستخدام بروتوكول الحماية (SSL) وأيضًا داخل الخوادم.</p>
                  <p>2. سياسات وصول صارمة، مع نسخ احتياطي دوري ورصد مستمر لمحاولات الاختراق.</p>
                  <p>3. لا تتم مشاركة بياناتك مع أي طرف ثالث إلا بموافقتك أو وفقًا للقوانين المعمول بها.</p>
                </div>
              </div>

              <div className="bg-black border border-[#B48500] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#B48500] mb-4">الاحتفاظ بالبيانات</h2>
                <div className="space-y-3 text-[#8B6914]">
                  <p>1. نحتفظ ببيانات المستخدم طوال فترة الاشتراك الفعّال.</p>
                  <p>2. يتم حذف البيانات خلال ثلاثين يومًا من إلغاء الاشتراك أو بناءً على طلب الحذف.</p>
                </div>
              </div>

              <div className="bg-black border border-[#B48500] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#B48500] mb-4">حقوق المستخدم</h2>
                <div className="space-y-3 text-[#8B6914]">
                  <p>1. الحق في الوصول إلى بياناتك الشخصية.</p>
                  <p>2. الحق في تعديل أو تحديث بياناتك.</p>
                  <p>3. الحق في طلب حذف البيانات.</p>
                  <p>4. الحق في إلغاء الاشتراك في الرسائل التسويقية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
