"use client"

import { useState } from "react"
import { DocumentUpload } from "./document-upload"
import { AnalysisOptions } from "./analysis-options"
import { AnalysisResults } from "./analysis-results"
import { AIAgentsPanel } from "./ai-agents-panel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, FileText, Settings, BarChart3, Clock, Users, Shield, Zap } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  file: File
}

interface AnalysisConfig {
  sector: string
  activity: string
  legalEntity: string
  comparisonType: string
  yearsCount: number
  analysisTypes: string[]
}

export function AnalysisInterface() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [analysisConfig, setAnalysisConfig] = useState<AnalysisConfig>({
    sector: "",
    activity: "",
    legalEntity: "",
    comparisonType: "",
    yearsCount: 1,
    analysisTypes: [],
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(files)
  }

  const handleAnalysisConfigChange = (config: AnalysisConfig) => {
    setAnalysisConfig(config)
  }

  const handleStartAnalysis = async () => {
    if (uploadedFiles.length === 0) {
      alert("يرجى رفع المستندات المالية أولاً")
      return
    }

    setIsAnalyzing(true)
    setCurrentStep(4)

    // محاكاة عملية التحليل
    setTimeout(() => {
      setAnalysisResults({
        summary: "تم إجراء 180 نوع تحليل مالي بنجاح",
        basicAnalysis: 106,
        appliedAnalysis: 21,
        advancedAnalysis: 53,
      })
      setIsAnalyzing(false)
    }, 5000)
  }

  const steps = [
    {
      number: 1,
      title: "أرفق المستندات",
      icon: FileText,
      description: "ارفع المستندات المالية (PDF, Excel, Word, صور)",
    },
    { number: 2, title: "حدد الخيارات", icon: Settings, description: "اختر القطاع والنشاط ونوع المقارنة" },
    { number: 3, title: "ابدأ التحليل", icon: Brain, description: "اضغط زر التحليل للحصول على النتائج" },
    { number: 4, title: "النتائج", icon: BarChart3, description: "استعرض التحليل الشامل والتقارير" },
  ]

  const platformStats = [
    { icon: Brain, label: "تحليل ذكي", value: "180", description: "نوع تحليل مالي" },
    { icon: Clock, label: "سرعة فائقة", value: "< 3", description: "دقائق للتحليل" },
    { icon: Users, label: "ثقة العملاء", value: "99%", description: "معدل الرضا" },
    { icon: Shield, label: "أمان تام", value: "100%", description: "حماية البيانات" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* عنوان الصفحة المحسن */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Brain className="w-20 h-20 text-[#B48500] animate-pulse" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-[#B48500] mb-4 animate-glow">منصة التحليل المالي الذكية</h1>
        <p className="text-2xl text-gray-300 mb-6">180 نوع تحليل مالي مؤتمت بالذكاء الاصطناعي</p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          تحليل شامل ودقيق لبياناتك المالية في دقائق معدودة مع تقارير احترافية وتوصيات استراتيجية
        </p>
      </div>

      {/* إحصائيات المنصة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {platformStats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-center hover:border-[#B48500] transition-colors"
          >
            <stat.icon className="w-8 h-8 text-[#B48500] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#B48500] mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-200 mb-1">{stat.label}</div>
            <div className="text-xs text-gray-400">{stat.description}</div>
          </Card>
        ))}
      </div>

      {/* مؤشر الخطوات المحسن */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4 rtl:space-x-reverse max-w-4xl">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full border-3 transition-all duration-300 ${
                    currentStep >= step.number
                      ? "bg-[#B48500] border-[#B48500] text-black shadow-lg shadow-[#B48500]/30"
                      : currentStep === step.number - 1
                        ? "border-[#B48500]/50 text-[#B48500] animate-pulse"
                        : "border-gray-600 text-gray-400"
                  }`}
                >
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="mt-3 text-center max-w-32">
                  <div
                    className={`text-sm font-bold mb-1 ${
                      currentStep >= step.number ? "text-[#B48500]" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 leading-tight">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-6 rounded-full transition-all duration-300 ${
                    currentStep > step.number ? "bg-[#B48500] shadow-sm shadow-[#B48500]/50" : "bg-gray-600"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* شريط التقدم العام */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>التقدم العام</span>
          <span>{Math.round((currentStep / 4) * 100)}%</span>
        </div>
        <Progress value={(currentStep / 4) * 100} className="h-3" />
      </div>

      {/* محتوى الخطوات */}
      <div className="max-w-5xl mx-auto">
        {currentStep === 1 && (
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
            <DocumentUpload onFilesUploaded={handleFilesUploaded} uploadedFiles={uploadedFiles} />
            {uploadedFiles.length > 0 && (
              <div className="mt-8 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center px-4 py-2 bg-green-900/30 border border-green-700 rounded-full text-green-400 text-sm">
                    <FileText className="w-4 h-4 mr-2 rtl:ml-2" />
                    تم رفع {uploadedFiles.length} مستند بنجاح
                  </div>
                </div>
                <Button
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#B48500] hover:bg-[#8B6914] text-black px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  التالي: حدد خيارات التحليل
                </Button>
              </div>
            )}
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
            <AnalysisOptions config={analysisConfig} onChange={handleAnalysisConfigChange} />
            <div className="mt-8 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3"
              >
                السابق
              </Button>
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">
                  {analysisConfig.sector && analysisConfig.activity
                    ? "جميع الخيارات المطلوبة محددة ✓"
                    : "يرجى تحديد القطاع والنشاط"}
                </div>
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#B48500] hover:bg-[#8B6914] text-black px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                  disabled={!analysisConfig.sector || !analysisConfig.activity}
                >
                  التالي: ابدأ التحليل
                </Button>
              </div>
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="p-10 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl text-center">
            <div className="mb-8">
              <div className="relative inline-block mb-6">
                <Brain className="w-24 h-24 text-[#B48500] mx-auto animate-pulse" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-[#B48500] mb-4">جاهز للتحليل الذكي</h2>
              <p className="text-xl text-gray-300 mb-6">
                سيتم إجراء {analysisConfig.analysisTypes.length || 180} نوع تحليل مالي متطور
              </p>

              {/* ملخص الإعدادات */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-[#B48500] font-semibold mb-3">المستندات والبيانات</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• المستندات المرفوعة: {uploadedFiles.length}</p>
                    <p>• عدد السنوات: {analysisConfig.yearsCount}</p>
                    <p>• نوع المقارنة: {analysisConfig.comparisonType || "غير محدد"}</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-[#B48500] font-semibold mb-3">معلومات الشركة</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• القطاع: {analysisConfig.sector}</p>
                    <p>• النشاط: {analysisConfig.activity}</p>
                    <p>• الكيان القانوني: {analysisConfig.legalEntity || "غير محدد"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3"
              >
                السابق
              </Button>
              <Button
                onClick={handleStartAnalysis}
                className="bg-gradient-to-r from-[#B48500] to-[#8B6914] hover:from-[#8B6914] hover:to-[#B48500] text-black px-16 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "جاري التحليل..." : "🚀 ابدأ التحليل الآن"}
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <AnalysisResults
              results={analysisResults}
              isAnalyzing={isAnalyzing}
              onStartNew={() => {
                setCurrentStep(1)
                setUploadedFiles([])
                setAnalysisResults(null)
                setAnalysisConfig({
                  sector: "",
                  activity: "",
                  legalEntity: "",
                  comparisonType: "",
                  yearsCount: 1,
                  analysisTypes: [],
                })
              }}
            />

            {analysisResults && !isAnalyzing && (
              <AIAgentsPanel
                financialData={uploadedFiles}
                analysisResults={analysisResults}
                onAnalysisComplete={(result) => {
                  console.log("تم إكمال التحليل بالذكاء الاصطناعي:", result)
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
