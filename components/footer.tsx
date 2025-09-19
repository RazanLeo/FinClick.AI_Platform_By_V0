"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/modal"
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  FileText,
  Users,
  Building,
  Star,
  CreditCard,
  PlayCircle,
  HelpCircle,
  Target,
  Calendar,
  Newspaper,
  Briefcase,
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null)

  const modalContents = {
    privacy: {
      title: "سياسة الخصوصية",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right">
          <p class="text-base leading-relaxed">مرحبًا بك في منصة FinClick.AI، حيث نولي أهمية قصوى لخصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة آلية جمع واستخدام وحماية ومشاركة معلوماتك عند استخدامك منصتنا الذكية للتحليل المالي.</p>
          
          <h3 class="text-lg font-semibold text-[#B48500]">المعلومات التي يتم جمعها</h3>
          <div class="space-y-3">
            <p><strong>1. بيانات التسجيل:</strong> تشمل الاسم، البريد الإلكتروني، رقم الهاتف، اسم الشركة، القطاع، النشاط، الكيان القانوني، والمعلومات العامة عن الشركة.</p>
            <p><strong>2. بيانات الدفع:</strong> لا يتم تخزين بيانات البطاقة كاملة على خوادمنا.</p>
            <p><strong>3. الملفات المالية المرفوعة:</strong> مثل القوائم المالية، موازين المراجعة، والجداول المالية والموازنات التقديرية.</p>
            <p><strong>4. بيانات الاستخدام والتفاعل داخل المنصة.</strong></p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">طرق استخدام المعلومات</h3>
          <div class="space-y-2">
            <p>1. تنفيذ التحليلات المالية وإصدار التقارير والعروض التقديمية المطلوبة.</p>
            <p>2. تحسين جودة الخدمة وتطوير نماذج الذكاء الاصطناعي.</p>
            <p>3. التواصل معك بشأن التحديثات، الإشعارات، والدعم الفني.</p>
            <p>4. التحقق من الهوية ومنع الاستخدام غير المصرح به.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">حماية البيانات</h3>
          <div class="space-y-2">
            <p>1. تشفير كامل للبيانات أثناء النقل باستخدام بروتوكول الحماية (SSL) وأيضًا داخل الخوادم.</p>
            <p>2. سياسات وصول صارمة، مع نسخ احتياطي دوري ورصد مستمر لمحاولات الاختراق.</p>
            <p>3. لا تتم مشاركة بياناتك مع أي طرف ثالث إلا بموافقتك أو وفقًا للقوانين المعمول بها.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">الاحتفاظ بالبيانات</h3>
          <div class="space-y-2">
            <p>1. نحتفظ ببيانات المستخدم طوال فترة الاشتراك الفعّال.</p>
            <p>2. يتم حذف البيانات خلال ثلاثين يومًا من إلغاء الاشتراك أو بناءً على طلب الحذف.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">حقوق المستخدم</h3>
          <div class="space-y-2">
            <p>1. الحق في الوصول إلى بياناتك الشخصية.</p>
            <p>2. الحق في تعديل أو تحديث بياناتك.</p>
            <p>3. الحق في طلب حذف البيانات.</p>
            <p>4. الحق في إلغاء الاشتراك في الرسائل التسويقية.</p>
          </div>
        </div>
      `,
    },
    terms: {
      title: "شروط الاستخدام",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right">
          <div class="space-y-3">
            <p><strong>1. الاستخدام المصرح به:</strong> تُستخدم المنصة لأغراض التحليل المالي فقط.</p>
            <p><strong>2.</strong> يُحظر استخدام المنصة لأي أغراض غير قانونية أو مشبوهة أو لإنشاء خدمات منافسة.</p>
            <p><strong>3. الملكية الفكرية:</strong> جميع حقوق الفكرة، النظم، والبرمجيات، والمحتوى، والتصميم، والتحليلات مملوكة حصرياً لمنصة FinClick.AI.</p>
            <p><strong>4.</strong> لا يجوز للمستخدم إعادة توزيع أو بيع المخرجات باعتبارها محتوى آلياً.</p>
            <p><strong>5. الدقة والمسؤولية:</strong> تبذل المنصة أقصى درجات الدقة في التحليل المالي.</p>
            <p><strong>6.</strong> لا تتحمل المنصة أي مسؤولية قانونية عن القرارات المالية التي يتخذها المستخدم بناءً على التحليلات الصادرة عن النظام.</p>
            <p><strong>7. الاشتراك:</strong> يؤدي أي تأخير في سداد الرسوم إلى إيقاف الحساب تلقائياً.</p>
            <p><strong>8.</strong> لا يُسمح بمشاركة الحساب مع أي شخص آخر، إذ أن كل اشتراك مخصص لمستخدم واحد فقط.</p>
            <p><strong>9. إنهاء الاستخدام:</strong> يحق لمنصة FinClick.AI إيقاف أو تعطيل أي حساب يستخدم المنصة بشكل مسيء أو غير قانوني.</p>
            <p><strong>10. تعديل الشروط:</strong> تحتفظ إدارة المنصة بحق تعديل هذه الشروط في أي وقت.</p>
            <p><strong>11.</strong> يتم إشعار المستخدم بأي تعديلات عبر البريد الإلكتروني.</p>
          </div>
        </div>
      `,
    },
    security: {
      title: "سياسة الأمان",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right">
          <h3 class="text-lg font-semibold text-[#B48500]">حماية البنية التحتية</h3>
          <div class="space-y-2">
            <p>1. تُستضاف بيانات المنصة حصريًا داخل مراكز بيانات سعودية آمنة ومتوافقة مع معايير البنك المركزي السعودي وهيئة الاتصالات والفضاء والتقنية.</p>
            <p>2. يتم تطبيق جدر حماية متعددة الطبقات وأنظمة كشف ومنع التسلل لضمان التصدي لأي محاولة اختراق أو وصول غير مصرح به.</p>
            <p>3. تُشفّر جميع الاتصالات بين المستخدم والمنصة باستخدام أحدث بروتوكولات التشفير لضمان سرية البيانات.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">حماية البيانات</h3>
          <div class="space-y-2">
            <p>1. تُشفّر جميع الملفات والبيانات داخل قواعد البيانات باستخدام تقنيات تشفير متقدمة لضمان حماية المعلومات من أي اختراق.</p>
            <p>2. يتم تقسيم الصلاحيات بحيث لا يُسمح لأي موظف بالوصول إلى بيانات المستخدمين إلا عند الضرورة وبموافقة رسمية، لتحقيق أعلى درجات الخصوصية.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">المراقبة والرصد</h3>
          <div class="space-y-2">
            <p>1. تُنفذ مراقبة مستمرة للنشاطات على مدار الساعة لرصد أي نشاط مشبوه أو محاولة اختراق.</p>
            <p>2. توثّق جميع المعاملات داخل المنصة في سجل تدقيق شامل، ما يتيح كشف أي محاولة تلاعب أو وصول غير مصرح به.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">النسخ الاحتياطي</h3>
          <div class="space-y-2">
            <p>1. تُجرى عمليات نسخ احتياطي يومية للبيانات داخل مراكز بيانات منفصلة في المملكة العربية السعودية لضمان سلامة المعلومات.</p>
            <p>2. توفر المنصة إمكانية استرجاع البيانات خلال دقائق في حالات الطوارئ، مما يضمن استمرارية الخدمة واستعادة المعلومات بسرعة.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">حماية الحسابات</h3>
          <div class="space-y-2">
            <p>1. تتم عملية الدخول إلى المنصة عبر كلمات مرور قوية، مع تحديد عدد المحاولات المسموح بها لتقليل مخاطر الاختراق.</p>
            <p>2. تتوفر خاصية التحقق الثنائي للحسابات الحساسة، ما يعزز مستوى الأمان بشكل فعال.</p>
            <p>3. يخصص لكل مستخدم حساب منفرد، ويُمنع منعًا باتًا مشاركة الحسابات بين أكثر من شخص.</p>
          </div>
        </div>
      `,
    },
    compliance: {
      title: "سياسة الامتثال",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right">
          <h3 class="text-lg font-semibold text-[#B48500]">نظام حماية البيانات الشخصية السعودي</h3>
          <div class="space-y-2">
            <p>1. لا تُجمع أي بيانات شخصية إلا لغرض تقديم الخدمة فقط.</p>
            <p>2. يجب الحصول على موافقة صريحة من المستخدم قبل معالجة بياناته.</p>
            <p>3. يحق للمستخدم الوصول إلى بياناته أو تعديلها أو حذفها في أي وقت يشاء.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">ضوابط البنك المركزي السعودي للأمن السيبراني</h3>
          <div class="space-y-2">
            <p>1. تُطبق جميع ضوابط الأمن السيبراني الصادرة عن البنك المركزي السعودي بما يتناسب مع خدمات المنصات السحابية المالية.</p>
            <p>2. يتم إجراء تقييم دوري للمخاطر ورفع تقارير الامتثال عند الطلب للجهات المختصة.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">التزامات هيئة الاتصالات والفضاء والتقنية</h3>
          <div class="space-y-2">
            <p>1. تُستضاف البيانات وتُعالج داخل المملكة العربية السعودية، التزامًا بسياسات سيادة البيانات الوطنية.</p>
            <p>2. تلتزم المنصة بكافة متطلبات إطار تنظيم الحوسبة السحابية الصادر عن الهيئة.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">الإفصاح وإدارة الحوادث الأمنية</h3>
          <div class="space-y-2">
            <p>1. يتم إخطار الجهات المتضررة والجهات المختصة خلال مدة لا تتجاوز ٢٤ ساعة في حال وقوع أي حادث أمني.</p>
            <p>2. يوجد فريق مختص للاستجابة لحوادث الأمن السيبراني لضمان سرعة المعالجة والحد من الآثار.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">خصوصية البيانات المالية</h3>
          <div class="space-y-2">
            <p>1. لا تتم مشاركة البيانات المالية أو التحليلات مع أي طرف خارجي إلا بعد الحصول على إذن صريح من المستخدم.</p>
            <p>2. تُستخدم البيانات المالية فقط لأغراض التحليل والتطوير الداخلي للمنصة.</p>
          </div>
        </div>
      `,
    },
    intellectualProperty: {
      title: "سياسة حقوق الملكية الفكرية",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right">
          <h3 class="text-lg font-semibold text-[#B48500]">الملكية الفكرية للمنصة</h3>
          <div class="space-y-3">
            <p>1. تُعد جميع مكونات منصة FinClick.AI، بما في ذلك البرمجيات، فكرة المنصة، آلية سير العمل، هيكل المنصة، أساليب التحليل المالي، طرق التشغيل، خوارزميات الذكاء الاصطناعي، التقنيات المستخدمة، نماذج التقارير، واجهات الاستخدام، قاعدة البيانات، وأسلوب العرض والتقديم، ملكية فكرية حصرية لمالك ومطور المنصة (السيدة: رزان أحمد توفيق)، ومحمية بموجب أنظمة حماية الملكية الفكرية في المملكة العربية السعودية.</p>
            <p>2. يُحظر نسخ أو تقليد أو بيع أو إعادة توزيع أي جزء من المنصة أو التقنيات أو مخرجاتها أو استغلالها تجاريًا دون موافقة خطية مسبقة من المالك الحصري.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">العلامة التجارية</h3>
          <div class="space-y-2">
            <p>1. شعار FinClick.AI واسم المنصة والهوية البصرية وجميع العناصر المرتبطة بها علامات تجارية مسجّلة وملك لصاحبة المنصة.</p>
            <p>2. يُمنع استخدام الشعار أو الاسم أو الألوان أو أي جزء من العلامة التجارية في أي منتج أو خدمة أخرى دون إذن مكتوب من المالك.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">حماية حقوق الفكرة والتطوير</h3>
          <div class="space-y-3">
            <p>1. تُعتبر أي محاولة للهندسة العكسية، أو تحليل الكود، أو تفكيك المنصة، أو مسح الواجهة بهدف إعادة الاستخدام أو التقليد، انتهاكًا صريحًا لحقوق الملكية الفكرية، ويخضع المخالف للمساءلة الجنائية والمدنية بموجب أنظمة المملكة العربية السعودية وهيئة الملكية الفكرية.</p>
            <p>2. جميع الأفكار والتطويرات والابتكارات المستقبلية التي تضاف للمنصة تظل ملكًا حصريًا للمالك الأصلي، ولا تمنح أي حقوق ترخيص أو مشاركة ملكية لأي مستخدم أو طرف ثالث.</p>
            <p>3. تحتفظ FinClick.AI بالحق الكامل في اتخاذ الإجراءات القانونية داخل المملكة وخارجها ضد أي استخدام غير مصرح به، بما في ذلك المطالبة بالتعويض المالي، توقيع الغرامات، أو الحجب أو الإغلاق القضائي للخدمات المخالفة.</p>
            <p>4. تُحال جميع النزاعات المتعلقة بالملكية الفكرية إلى الجهات المختصة في المملكة (الهيئة السعودية للملكية الفكرية والمحاكم التجارية).</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">اتفاقية السرية وحماية الملكية الفكرية</h3>
          <div class="space-y-3">
            <p>1. بتسجيلك في المنصة، فإنك توافق ضمنيًا على اتفاقية السرية وحماية الملكية الفكرية، وتقر بأن جميع المعلومات التقنية والبرمجية، الأسرار التجارية، خوارزميات النظام، تصميم الواجهة، أساليب التحليل، وطرق العرض، تُعد معلومات سرية وملكية فكرية محفوظة لصاحب النظام.</p>
            <p>2. يلتزم المستخدم التزامًا تامًا بعدم:</p>
            <ul class="list-disc list-inside space-y-1 mr-4">
              <li>كشف أو نشر أو مشاركة أي معلومات سرية أو تقنية تخص عمل المنصة لأي طرف ثالث.</li>
              <li>محاولة نسخ أو إعادة إنتاج أو بيع أو ترخيص المنصة أو أي جزء منها.</li>
              <li>استخدام نتائج التحليل أو التقارير أو فكرة المنصة في إنتاج منصة منافسة أو مشابهة.</li>
            </ul>
            <p>أي خرق لالتزام السرية أو محاولة تقليد أو إعادة إنتاج المنصة يُعد انتهاكًا جسيمًا للملكية الفكرية، ويمنح للمالك الحق في: إلغاء الاشتراك فورًا، اتخاذ جميع الإجراءات القانونية اللازمة، المطالبة بالتعويضات المالية والأضرار وفق الأنظمة المعمول بها في المملكة.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">استخدام المنصة للأغراض التجارية</h3>
          <div class="space-y-3">
            <p>1. يُحظر على المستخدم استخدام المنصة بغرض إعادة بيع التحليلات أو التقارير أو أي من مخرجات النظام لأي طرف ثالث (أفراد، شركات، جهات استشارية) باعتبارها خدمة ذاتية.</p>
            <p>2. لا يجوز للمستخدم:</p>
            <ul class="list-disc list-inside space-y-1 mr-4">
              <li>تقديم خدمات تحليل مالي عبر النظام لصالح مؤسسات أو شركات أخرى مقابل عائد مالي أو تجاري.</li>
              <li>بيع أو تسويق نتائج التحليل كمنتج مستقل أو كجزء من خدمة مالية استشارية.</li>
              <li>دمج مخرجات المنصة في تطبيقات أو منصات أخرى لتقديمها للغير.</li>
            </ul>
            <p>يُسمح باستخدام المنصة فقط لأغراض التحليل الداخلي الخاص بالشركة المالكة للحساب أو الفرد المالك للحساب، وأي استخدام تجاري خارجي يُعتبر انتهاكًا للملكية الفكرية ويمنح للمنصة الحق في إلغاء الاشتراك واتخاذ الإجراءات القانونية اللازمة.</p>
            <p>بإتمام عملية التسجيل والاشتراك، يُعتبر المستخدم قد وافق ضمنيًا على جميع بنود هذه السياسة.</p>
          </div>
        </div>
      `,
    },
    paymentPolicy: {
      title: "سياسة الدفع والاشتراك والاسترجاع",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right">
          <h3 class="text-lg font-semibold text-[#B48500]">أنواع الاشتراك</h3>
          <div class="space-y-2">
            <p>1. <strong>الاشتراك الشهري:</strong> قيمة الاشتراك الشهري تبلغ خمسة آلاف (٥٬٠٠٠) ريال سعودي.</p>
            <p>2. <strong>الاشتراك السنوي:</strong> قيمة الاشتراك السنوي ستون ألف (٥٠٬٠٠٠) ريال سعودي، مع خصم بنسبة ١٠٪ عند الدفع السنوي المسبق، ليصبح المبلغ الإجمالي أربعة وخمسون ألف (٢٤٬٠٠٠) ريال سعودي.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">وسائل الدفع المتاحة</h3>
          <ul class="list-disc list-inside space-y-1 mr-4">
            <li>مدى</li>
            <li>فيزا</li>
            <li>ماستركارد</li>
            <li>باي بال</li>
            <li>آبل باي</li>
          </ul>
          
          <h3 class="text-lg font-semibold text-[#B48500]">إجراءات التفعيل والإيقاف</h3>
          <div class="space-y-2">
            <p>1. يتم تفعيل الاشتراك تلقائيًا بالكامل فور إتمام عملية الدفع بنجاح.</p>
            <p>2. يتم إيقاف الخدمة تلقائيًا في حال عدم سداد رسوم الاشتراك الشهري أو السنوي في الموعد المحدد.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">سياسة الاسترجاع والإلغاء</h3>
          <div class="space-y-2">
            <p>1. لا يحق للمستخدم طلب استرجاع مالي بعد بدء تفعيل الاشتراك بأي من الخطط وإرسال بيانات الدخول الخاصة بالحساب.</p>
            <p>2. يمكن للمستخدم إلغاء التجديد التلقائي للاشتراك القادم بشرط تقديم إشعار كتابي قبل سبعة (٢٤) أيام على الأقل من تاريخ انتهاء الاشتراك الحالي.</p>
            <p>3. تتم حذف جميع بيانات الحساب نهائيًا بعد مرور ثلاثين (٢٤) يومًا من تاريخ إلغاء الاشتراك.</p>
          </div>
        </div>
      `,
    },
    userGuide: {
      title: "كتيب استخدام منصة FinClick.AI",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right">
          <p class="text-base leading-relaxed font-semibold">دليل إرشادي متكامل للاستفادة المثلى من النظام</p>
          <p class="text-base leading-relaxed">مرحبًا بك في منصة FinClick.AI، المنصة الرائدة في الذكاء الاصطناعي للتحليل المالي المتقدم. يُرشدك هذا الدليل خطوة بخطوة لتحقيق أقصى استفادة من المنصة والحصول على تحليلات مالية دقيقة وذكية خلال ثوانٍ معدودة.</p>
          
          <h3 class="text-lg font-semibold text-[#B48500]">إنشاء حساب وتفعيل الاشتراك</h3>
          <div class="space-y-2">
            <p>1. الدخول إلى صفحة الاشتراك عبر الموقع الرسمي للمنصة.</p>
            <p>2. اختيار الخطة المناسبة (شهرية أو سنوية).</p>
            <p>3. إدخال البيانات المطلوبة: الاسم، البريد الإلكتروني، رقم الجوال، واسم الشركة.</p>
            <p>4. إتمام عملية الدفع عبر إحدى وسائل الدفع المتاحة (مدى، بطاقة ائتمان، الدفع الإلكتروني، أو آبل باي).</p>
            <p>5. ستصلك رسالة تفعيل على بريدك الإلكتروني تتضمن: اسم المستخدم، كلمة المرور، رابط الدخول للمنصة.</p>
            <p>يتم تفعيل الحساب فورًا بعد إتمام الدفع. إذا لم تصلك بيانات الدخول خلال ثلاث دقائق، يرجى التواصل مع الدعم الفني.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">تسجيل الدخول لأول مرة</h3>
          <div class="space-y-2">
            <p>1. فتح الرابط المرسل عبر البريد الإلكتروني.</p>
            <p>2. إدخال اسم المستخدم وكلمة المرور.</p>
            <p>3. اختيار لغة الواجهة (العربية أو الإنجليزية).</p>
            <p>4. الضغط على لوحة المستخدم الرئيسية للدخول إلى النظام.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">بدء عملية التحليل</h3>
          <div class="space-y-3">
            <p><strong>1. إرفاق المستندات المالية المطلوبة، وتتوفر ثلاث طرق:</strong></p>
            <ul class="list-disc list-inside space-y-1 mr-4">
              <li>تحميل القوائم المالية والموازنات التقديرية بأي صيغة (ملف نصي، جداول بيانات، مستندات ممسوحة ضوئيًا أو صور).</li>
              <li>تحميل ميزان المراجعة بأي صيغة مماثلة.</li>
              <li>إدخال البيانات يدويًا عبر القوالب الجاهزة المتوفرة داخل النظام.</li>
            </ul>
            <p>2. يدعم النظام رفع مستندات حتى عشر سنوات مالية (عشرة ملفات بأي صيغة أو حجم).</p>
            <p><strong>3. تحديد خيارات التحليل:</strong></p>
            <ul class="list-disc list-inside space-y-1 mr-4">
              <li>اسم الشركة (يظهر في التقرير).</li>
              <li>القطاع (للمقارنة بمتوسط الصناعة).</li>
              <li>النشاط (لتحديد الشركات المشابهة وإجراء المقارنة بناء عليها).</li>
              <li>الكيان القانوني (لتخصيص المقارنة بدقة أعلى).</li>
              <li>نوع المقارنة (محلي سعودي، خليجي، عربي، آسيوي، أفريقي، أوروبي، أمريكي شمالي أو جنوبي، أو عالمي).</li>
              <li>عدد سنوات التحليل (من سنة حتى عشر سنوات).</li>
              <li>لغة التقرير والعرض التقديمي.</li>
            </ul>
            <p>4. الضغط على زر "ابدأ التحليل" لبدء معالجة البيانات بواسطة الذكاء الاصطناعي.</p>
            <p>5. تظهر شاشة التحليل اللحظي، وخلال ثوانٍ يتم عرض النتائج المفصلة.</p>
            <p>6. يتضمن التقرير أكثر من ١٢٠ نوعًا من التحليلات مع شرح مبسط لكل مؤشر ونتيجته، مقارنة بمتوسطات الصناعة والشركات المماثلة، مع التنبؤات، المخاطر، نقاط القوة والضعف، الفرص والتهديدات، التقييم النهائي، التوصيات والحلول الاستراتيجية، بالإضافة إلى رسوم بيانية ومخططات توضيحية.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">استعراض وتحميل التقارير</h3>
          <div class="space-y-2">
            <p>1. مشاهدة لوحة التحليل على الشاشة.</p>
            <p>2. تحميل تقرير شامل بصيغة مستند نصي أو ملف رقمي (أكثر من ٢٤ صفحة).</p>
            <p>3. تحميل عرض تقديمي تلقائي بصيغة العروض التقديمية. (أكثر من ٢٤ صفحة).</p>
            <p>4. إمكانية طباعة التقارير والعروض التقديمية مباشرة.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">الوصول إلى التحليلات السابقة</h3>
          <div class="space-y-2">
            <p>1. من قائمة التنقل، اختيار "الشركات".</p>
            <p>2. تحديد اسم الشركة المراد استعراض تحليلاتها.</p>
            <p>3. استعراض آخر التحليلات المحفوظة، مع إمكانية إعادة التحليل أو إنشاء تحليل جديد.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">إدارة الحساب والاشتراك</h3>
          <div class="space-y-2">
            <p>1. تغيير كلمة المرور.</p>
            <p>2. تغيير الخطة (من شهرية إلى سنوية أو العكس).</p>
            <p>3. إيقاف أو تجديد الاشتراك.</p>
            <p>4. تحديث بيانات الشركة عند الحاجة.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">الدعم والمساعدة</h3>
          <div class="space-y-2">
            <p>1. الاطلاع على قاعدة المعرفة والأسئلة الشائعة داخل النظام.</p>
            <p>2. التواصل مع فريق الدعم الفني عبر:</p>
            <ul class="list-disc list-inside space-y-1 mr-4">
              <li>البريد الإلكتروني: finclick.ai@gmail.com</li>
              <li>الهاتف/واتساب/تلغرام: 00966544827213</li>
            </ul>
            <p>الدعم الفني متوفر يوميًا من الساعة ١٠ صباحًا حتى ٢٤ مساءً بتوقيت المملكة العربية السعودية.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">نصائح مهمة لرفع جودة التحليل</h3>
          <div class="space-y-2">
            <p>1. كلما كانت القوائم المالية واضحة ومنظمة، زادت دقة النتائج بشكل ملحوظ.</p>
            <p>2. يفضل إدخال بيانات لخمسة أعوام أو أكثر للحصول على تحليلات زمنية دقيقة وشاملة.</p>
            <p>3. يمكنك تغيير لغة التقرير والعرض التقديمي إلى العربية أو الإنجليزية في أي وقت.</p>
          </div>
        </div>
      `,
    },
    company: {
      title: "معلومات الشركة",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right">
          <h3 class="text-lg font-semibold text-[#B48500]">الرؤية</h3>
          <p class="leading-relaxed">أن نحدث ثورة عالمية في مجال التحليل المالي من خلال منصة ذكاء اصطناعي سعودية مبتكرة ترافق صناع القرار بشكل لحظي، لتصبح المعيار الذهبي للتحليل المالي الذكي والشامل لجميع أنواع التحليل المالي الكمي في ثوان معدودة وبضغطة زر، وأن نكون المستثمر الأول في تقنية التحليل المالي المعتمدة على الذكاء الاصطناعي في المنطقة والعالم.</p>
          
          <h3 class="text-lg font-semibold text-[#B48500]">الرسالة</h3>
          <p class="leading-relaxed">تسخير قوة الذكاء الاصطناعي المتقدم لتوفير منصة تحليل مالي شاملة وذكية وفورية تمكن جميع الشركات والمؤسسات والمنظمات من فهم أدائها المالي، واكتشاف المخاطر والتنبؤات وتحديد الفرص ونقاط القوة وتحديد التهديدات ونقاط الضعف، واتخاذ قرارات دقيقة بسرعة وسهولة فائقة، دون الحاجة إلى خبرات مالية متعمقة.</p>
          
          <h3 class="text-lg font-semibold text-[#B48500]">الأهداف</h3>
          <div class="space-y-3">
            <p>1. قيادة التحول الرقمي في التحليل المالي من خلال بناء منصة سعودية متطورة قادرة على المنافسة العالمية في مجالي التقنية المالية والذكاء الاصطناعي، لتكون في طليعة التطوير الرقمي في قطاع التحليل المالي على مستوى المملكة والعالم، وتقديم أدوات ذكية متقدمة تعتمد على الذكاء الاصطناعي.</p>
            <p>2. إتاحة التحليل المالي العميق بضغطة زر، من خلال تمكين الشركات والمستثمرين والجهات التمويلية من الوصول إلى تحليلات مالية شاملة وسريعة دون الحاجة إلى خبرات تقنية أو مالية متخصصة، مما يساعد أصحاب القرار على توقع المخاطر وزيادة العائد واتخاذ قرارات مبنية على بيانات حية.</p>
            <p>3. تحقيق الأتمتة الكاملة لمراحل العملية التحليلية، بدءًا من جمع البيانات وصولًا إلى إعداد التقارير الاحترافية، لضمان الدقة والسرعة في النتائج.</p>
            <p>4. تحقيق الشمولية والعمق في التحليل، حيث تغطي المنصة جميع أنواع التحليل المالي الكمي من التقليدي إلى المتقدم المعتمد على الذكاء الاصطناعي، لتقديم رؤى دقيقة وموثوقة للمستخدمين.</p>
            <p>5. تسهيل عملية إعداد التقارير والتحليلات المالية، مما يقلل الوقت والتكلفة والجهد للمستخدمين.</p>
            <p>6. رفع مستوى الدقة والموثوقية بالاعتماد على تقنيات الذكاء الاصطناعي لجلب بيانات محدثة وفورية (بيانات السوق، بيانات اقتصادية، بيانات مالية، متوسطات الصناعة) وضمان دقة الحسابات والتحليلات.</p>
            <p>7. تحقيق قيمة تجارية مستدامة للشركات والمؤسسات عبر دعم اتخاذ قرارات استراتيجية مبنية على بيانات دقيقة وموثوقة في الوقت الحقيقي.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">الخدمات الرئيسية للمنصة</h3>
          <div class="space-y-2">
            <p>1. تحليل مالي كمي ذكي وفوري وتفصيلي لأكثر من ٢٤٠ نوعًا من التحليل المالي باستخدام الذكاء الاصطناعي.</p>
            <p>2. إصدار تقارير تفصيلية وعروض تقديمية تلقائية جاهزة للعرض والمناقشة والتسليم، تزيد عن ٢٤٠ صفحة، باللغتين العربية والإنجليزية.</p>
            <p>3. مقارنة أداء الشركة بمتوسط أداء القطاع ومقارنة أدائها مع شركات مشابهة محليًا وإقليميًا وعالميًا (على جميع المستويات الجغرافية)</p>
            <p>4. لوحة تحكم تفاعلية تعرض مؤشرات الأداء الفورية مثل نقاط القوة والضعف والفرص والتهديدات، والمخاطر والتنبؤات.</p>
            <p>5. إمكانية رفع الملفات بأنواع متعددة من الصيغ ودعم الإدخال اليدوي حتى ٢٤ سنوات مالية.</p>
            <p>6. نظام اشتراكات وحسابات للمستخدمين والمديرين مع حماية كاملة واشتراك مباشر.</p>
          </div>
          
          <h3 class="text-lg font-semibold text-[#B48500]">القيم الأساسية لمنصة FinClick.AI</h3>
          <div class="space-y-2">
            <p>1. <strong>الابتكار:</strong> تقديم حلول مالية ثورية تستند لأحدث تقنيات الذكاء الاصطناعي المعتمد على الوكلاء المتعددين.</p>
            <p>2. <strong>الدقة:</strong> تقديم تحليلات دقيقة للغاية تعتمد على بيانات مالية وتنبؤية واختبارات مقارنات عالمية.</p>
            <p>3. <strong>السرعة:</strong> إنجاز ما يتطلب أسابيع من التحليل المالي التقليدي خلال ثوانٍ معدودة.</p>
            <p>4. <strong>الخصوصية والأمان:</strong> حماية صارمة لبيانات الشركات وفق أعلى المعايير السعودية والعالمية.</p>
            <p>5. <strong>الاحترافية:</strong> تقارير وعروض تقديمية بأعلى مستويات الجودة والإخراج والتفسير المالي التنفيذي.</p>
            <p>6. <strong>التمكين:</strong> تمكين أصحاب القرار من رؤية الصورة المالية الشاملة واتخاذ قرارات آنية وذكية بثقة.</p>
          </div>
        </div>
      `,
    },
    comingSoon: {
      title: "قيد الإنشاء",
      content: `
        <div class="space-y-6 text-[#8B6914] text-right text-center">
          <div class="text-6xl mb-4">🚧</div>
          <h3 class="text-xl font-semibold text-[#B48500]">هذا القسم قيد الإنشاء</h3>
          <p class="text-base leading-relaxed">نعمل حاليًا على تطوير هذا القسم ليقدم لك أفضل تجربة ممكنة.</p>
          <p class="text-sm text-[#8B6914]">سيتم إطلاقه قريبًا، ترقبوا التحديثات!</p>
        </div>
      `,
    },
  }

  const openModal = (type: string) => {
    setModalContent(modalContents[type as keyof typeof modalContents])
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const closeModal = () => {
    setModalContent(null)
  }

  const openCompanyModal = () => {
    setModalContent(modalContents.company)
  }

  return (
    <>
      <footer id="contact" className="bg-black border-t border-[#B48500] pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/finclick-logo.png"
                  alt="FinClick.AI Logo"
                  width={120}
                  height={120}
                  className="animate-pulse-gold"
                />
                <div>
                  <h3 className="text-2xl font-bold text-[#B48500]">FinClick.AI</h3>
                  <p className="text-sm text-[#8B6914]">منصة التحليل المالي الذكية الثورية</p>
                </div>
              </div>
              <p className="text-[#8B6914] text-sm leading-relaxed">
                منصة ثورية للتحليل المالي الذكي تقدم 180+ نوع تحليل مالي بالذكاء الاصطناعي
              </p>
            </div>

            {/* Contact & Support */}
            <div>
              <h4 className="text-lg font-semibold text-[#B48500] mb-4">التواصل والدعم</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#8B6914]">
                  <MapPin className="w-4 h-4 text-[#B48500]" />
                  <span className="text-sm">جدة، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-3 text-[#8B6914]">
                  <Mail className="w-4 h-4 text-[#B48500]" />
                  <span className="text-sm">finclick.ai@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-[#8B6914]">
                  <Phone className="w-4 h-4 text-[#B48500]" />
                  <span className="text-sm">+966544827213</span>
                </div>
                <div className="flex items-center gap-3 text-[#8B6914]">
                  <MessageCircle className="w-4 h-4 text-[#B48500]" />
                  <span className="text-sm">واتساب: +966544827213</span>
                </div>
                <div className="flex items-center gap-3 text-[#8B6914]">
                  <MessageCircle className="w-4 h-4 text-[#B48500]" />
                  <span className="text-sm">تلغرام: +966544827214</span>
                </div>
              </div>
            </div>

            {/* Legal Policies */}
            <div>
              <h4 className="text-lg font-semibold text-[#B48500] mb-4">السياسات القانونية</h4>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("privacy")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <Shield className="w-4 h-4 text-[#B48500]" />
                  سياسة الخصوصية
                </button>
                <button
                  onClick={() => openModal("terms")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <FileText className="w-4 h-4 text-[#B48500]" />
                  شروط الاستخدام
                </button>
                <button
                  onClick={() => openModal("security")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <Shield className="w-4 h-4 text-[#B48500]" />
                  سياسة الأمان
                </button>
                <button
                  onClick={() => openModal("compliance")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <Users className="w-4 h-4 text-[#B48500]" />
                  سياسة الامتثال
                </button>
                <button
                  onClick={() => openModal("intellectualProperty")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <Building className="w-4 h-4 text-[#B48500]" />
                  سياسة حقوق الملكية الفكرية
                </button>
                <button
                  onClick={() => openModal("paymentPolicy")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <CreditCard className="w-4 h-4 text-[#B48500]" />
                  سياسة الدفع والاشتراك والاسترجاع
                </button>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-lg font-semibold text-[#B48500] mb-4">المنصة</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("features")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <Star className="w-4 h-4" />
                  المميزات
                </button>
                <button
                  onClick={() => scrollToSection("analysis-types")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <Target className="w-4 h-4" />
                  أنواع التحليل
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <CreditCard className="w-4 h-4" />
                  الاشتراكات والأسعار
                </button>
                <button
                  onClick={() => openModal("userGuide")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <PlayCircle className="w-4 h-4" />
                  كتيب استخدام FinClick.AI
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm w-full text-right"
                >
                  <HelpCircle className="w-4 h-4" />
                  الأسئلة الشائعة
                </button>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pt-8 border-t border-[#B48500]">
            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-[#B48500] mb-4">الشركة</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={openCompanyModal}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm text-right"
                >
                  <Building className="w-4 h-4" />
                  عن الشركة
                </button>
                <button
                  onClick={() => openModal("comingSoon")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm text-right"
                >
                  <Calendar className="w-4 h-4" />
                  الفعاليات
                </button>
                <button
                  onClick={() => openModal("comingSoon")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm text-right"
                >
                  <Newspaper className="w-4 h-4" />
                  المدونة
                </button>
                <button
                  onClick={() => openModal("comingSoon")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm text-right"
                >
                  <Users className="w-4 h-4" />
                  الإعلام
                </button>
                <button
                  onClick={() => openModal("comingSoon")}
                  className="flex items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors text-sm text-right"
                >
                  <Briefcase className="w-4 h-4" />
                  الوظائف
                </button>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-[#B48500] mb-4">اشترك في النشرة الإخبارية</h4>
              <p className="text-[#8B6914] text-sm mb-4">احصل على آخر التحديثات والأخبار المالية</p>
              <div className="flex gap-2">
                <Input
                  placeholder="البريد الإلكتروني"
                  className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914]"
                />
                <Button className="bg-[#B48500] text-black hover:bg-[#8B6914]">اشترك</Button>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-[#B48500] mb-4">تابعنا على</h4>
            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
                📱 سناب شات
              </Button>
              <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
                📷 إنستغرام
              </Button>
              <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
                🎵 تيك توك
              </Button>
              <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
                📱 تلغرام
              </Button>
              <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
                🐦 تويتر
              </Button>
              <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
                💼 لينكدن
              </Button>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-[#B48500]">
            <p className="text-[#8B6914] text-sm mb-2">FinClick.AI {currentYear} جميع الحقوق محفوظة</p>
            <p className="text-[#8B6914] text-sm flex items-center justify-center gap-2">
              صُنع بـ ❤️ في المملكة العربية السعودية 🇸🇦
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalContent && (
        <Modal isOpen={!!modalContent} onClose={closeModal} title={modalContent.title}>
          <div dangerouslySetInnerHTML={{ __html: modalContent.content }} />
        </Modal>
      )}
    </>
  )
}
