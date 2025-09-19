"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Download, FileText, BarChart3, TrendingUp, AlertTriangle } from "lucide-react"

interface AnalysisResultsProps {
  results: any
  isAnalyzing: boolean
  onStartNew: () => void
}

export function AnalysisResults({ results, isAnalyzing, onStartNew }: AnalysisResultsProps) {
  if (isAnalyzing) {
    return (
      <Card className="p-8 bg-gray-900 border-gray-700 text-center">
        <div className="space-y-6">
          <Brain className="w-16 h-16 text-[#B48500] mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-[#B48500]">جاري التحليل بالذكاء الاصطناعي</h2>
          <p className="text-gray-300">يتم الآن معالجة المستندات وإجراء 180 نوع تحليل مالي...</p>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">استخراج البيانات</span>
              <span className="text-[#B48500]">مكتمل</span>
            </div>
            <Progress value={100} className="h-2" />

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">التحليل الأساسي</span>
              <span className="text-[#B48500]">جاري...</span>
            </div>
            <Progress value={65} className="h-2" />

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">التحليل المتقدم</span>
              <span className="text-gray-400">في الانتظار</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>

          <p className="text-sm text-gray-500">الوقت المتوقع: 2-3 دقائق</p>
        </div>
      </Card>
    )
  }

  if (!results) return null

  return (
    <div className="space-y-6">
      {/* ملخص النتائج */}
      <Card className="p-8 bg-gradient-to-r from-green-900/20 to-[#B48500]/20 border-green-700/50">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">تم إكمال التحليل بنجاح!</h2>
          <p className="text-gray-300 mb-4">{results.summary}</p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B48500]">{results.basicAnalysis}</div>
              <div className="text-sm text-gray-400">تحليل أساسي</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B48500]">{results.appliedAnalysis}</div>
              <div className="text-sm text-gray-400">تحليل تطبيقي</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B48500]">{results.advancedAnalysis}</div>
              <div className="text-sm text-gray-400">تحليل متقدم</div>
            </div>
          </div>
        </div>
      </Card>

      {/* أقسام النتائج */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-400 mr-3 rtl:ml-3" />
            <h3 className="text-lg font-semibold text-green-400">النقاط الإيجابية</h3>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li>• نمو مستقر في الإيرادات بنسبة 15% سنوياً</li>
            <li>• تحسن في هوامش الربح الإجمالي</li>
            <li>• قوة في المركز المالي والسيولة</li>
            <li>• كفاءة في إدارة المخزون</li>
          </ul>
        </Card>

        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3 rtl:ml-3" />
            <h3 className="text-lg font-semibold text-yellow-400">نقاط التحسين</h3>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li>• ارتفاع في نسبة المديونية</li>
            <li>• تراجع في معدل دوران الأصول</li>
            <li>• الحاجة لتحسين إدارة رأس المال العامل</li>
            <li>• مراجعة استراتيجية التوسع</li>
          </ul>
        </Card>
      </div>

      {/* أزرار التحميل */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-lg font-semibold text-[#B48500] mb-4">تحميل التقارير</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <FileText className="w-4 h-4 mr-2 rtl:ml-2" />
            PDF
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <Download className="w-4 h-4 mr-2 rtl:ml-2" />
            Excel
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <FileText className="w-4 h-4 mr-2 rtl:ml-2" />
            Word
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <BarChart3 className="w-4 h-4 mr-2 rtl:ml-2" />
            PowerPoint
          </Button>
        </div>
      </Card>

      {/* زر تحليل جديد */}
      <div className="text-center">
        <Button onClick={onStartNew} className="bg-[#B48500] hover:bg-[#8B6914] text-black px-8 py-3">
          إجراء تحليل جديد
        </Button>
      </div>
    </div>
  )
}
