"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "./file-upload"
import { AnalysisOptions } from "./analysis-options"
import { AnalysisEngine } from "../analysis/analysis-engine"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Play,
  FileText,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Sparkles,
} from "lucide-react"

interface AnalysisHistory {
  id: string
  companyName: string
  date: string
  status: "completed" | "processing" | "failed"
  analysisTypes: string[]
  filesCount: number
}

export function UserDashboard() {
  const { user } = useAuth()
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [analysisOptions, setAnalysisOptions] = useState<any>({})
  const [showAnalysisEngine, setShowAnalysisEngine] = useState(false)
  const [analysisHistory] = useState<AnalysisHistory[]>([
    {
      id: "1",
      companyName: "شركة التقنية المتقدمة",
      date: "2024-01-15",
      status: "completed",
      analysisTypes: ["التحليل الشامل"],
      filesCount: 5,
    },
    {
      id: "2",
      companyName: "مؤسسة الاستثمار الذكي",
      date: "2024-01-10",
      status: "completed",
      analysisTypes: ["التحليل الأساسي الكلاسيكي"],
      filesCount: 3,
    },
    {
      id: "3",
      companyName: "شركة التجارة الإلكترونية",
      date: "2024-01-08",
      status: "processing",
      analysisTypes: ["التحليل المتقدم والمتطور"],
      filesCount: 7,
    },
  ])

  const handleStartAnalysis = async () => {
    if (uploadedFiles.length === 0) {
      alert("يرجى رفع الملفات المالية أولاً")
      return
    }

    if (!analysisOptions.sector || !analysisOptions.legalEntity) {
      alert("يرجى إكمال جميع الخيارات المطلوبة")
      return
    }

    setShowAnalysisEngine(true)
  }

  const handleAnalysisComplete = (results: any[]) => {
    console.log("Analysis completed:", results)
    // Here you would typically save the results to a database
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "مكتمل"
      case "processing":
        return "قيد المعالجة"
      case "failed":
        return "فشل"
      default:
        return "غير معروف"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#B48500] animate-glow">مرحباً، {user?.name}</h1>
              <p className="text-[#8B6914]">لوحة التحكم - منصة التحليل المالي الذكية</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                className={`${user?.subscriptionStatus === "active" ? "bg-green-500" : "bg-yellow-500"} text-white`}
              >
                {user?.subscriptionStatus === "active" ? "اشتراك نشط" : "فترة تجريبية"}
              </Badge>
              {user?.type === "guest" && <Badge className="bg-blue-500 text-white">حساب ضيف</Badge>}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black border-[#B48500] hover-glow">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-[#B48500] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#B48500]">{analysisHistory.length}</div>
              <div className="text-[#8B6914] text-sm">إجمالي التحليلات</div>
            </CardContent>
          </Card>
          <Card className="bg-black border-[#B48500] hover-glow">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#B48500]">
                {analysisHistory.filter((a) => a.status === "completed").length}
              </div>
              <div className="text-[#8B6914] text-sm">تحليلات مكتملة</div>
            </CardContent>
          </Card>
          <Card className="bg-black border-[#B48500] hover-glow">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#B48500]">
                {analysisHistory.filter((a) => a.status === "processing").length}
              </div>
              <div className="text-[#8B6914] text-sm">قيد المعالجة</div>
            </CardContent>
          </Card>
          <Card className="bg-black border-[#B48500] hover-glow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-[#B48500] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#B48500]">180+</div>
              <div className="text-[#8B6914] text-sm">أنواع التحليل المتاحة</div>
            </CardContent>
          </Card>
        </div>

        {!showAnalysisEngine ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - File Upload and Options */}
            <div className="space-y-6">
              <FileUpload onFilesUploaded={setUploadedFiles} />
              <AnalysisOptions onOptionsChange={setAnalysisOptions} />

              {/* Start Analysis Button */}
              <Card className="bg-black border-[#B48500]">
                <CardContent className="p-6">
                  <Button
                    onClick={handleStartAnalysis}
                    disabled={uploadedFiles.length === 0}
                    className="w-full bg-[#B48500] text-black hover:bg-[#8B6914] text-xl py-6 font-bold hover-glow"
                  >
                    <Sparkles className="w-6 h-6 ml-2" />
                    بدء التحليل المالي الذكي
                  </Button>
                  {uploadedFiles.length === 0 && (
                    <p className="text-[#8B6914] text-sm text-center mt-2">يرجى رفع الملفات المالية أولاً</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Analysis History */}
            <div className="space-y-6">
              <Card className="bg-black border-[#B48500]">
                <CardHeader>
                  <CardTitle className="text-[#B48500] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    سجل التحليلات السابقة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisHistory.map((analysis) => (
                      <div
                        key={analysis.id}
                        className="p-4 bg-[#1a1a1a] border border-[#8B6914] rounded-lg hover:border-[#B48500] transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-[#B48500] font-semibold">{analysis.companyName}</h4>
                            <p className="text-[#8B6914] text-sm">{analysis.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(analysis.status)}
                            <Badge className={`${getStatusColor(analysis.status)} text-white text-xs`}>
                              {getStatusText(analysis.status)}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {analysis.analysisTypes.map((type, index) => (
                            <Badge key={index} variant="outline" className="border-[#B48500] text-[#B48500] text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#8B6914] text-sm">{analysis.filesCount} ملفات</span>
                          <div className="flex gap-2">
                            {analysis.status === "completed" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black border-[#B48500]">
                <CardHeader>
                  <CardTitle className="text-[#B48500]">إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent"
                  >
                    <FileText className="w-4 h-4 ml-2" />
                    تحميل قالب القوائم المالية
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent"
                  >
                    <Play className="w-4 h-4 ml-2" />
                    مشاهدة فيديو تعليمي
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent"
                  >
                    <TrendingUp className="w-4 h-4 ml-2" />
                    عرض أمثلة التحليلات
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <AnalysisEngine files={uploadedFiles} options={analysisOptions} onAnalysisComplete={handleAnalysisComplete} />
        )}
      </div>
    </div>
  )
}
