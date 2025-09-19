"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Eye,
  Printer,
  Share2,
  BarChart3,
  PieChart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileSpreadsheet,
  Presentation,
} from "lucide-react"
import { type ReportData, ReportEngine } from "@/lib/report-generator/report-engine"

interface ReportGeneratorProps {
  reportData: ReportData
  onReportGenerated?: (report: any) => void
}

export function ReportGenerator({ reportData, onReportGenerated }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedReport, setGeneratedReport] = useState<any>(null)
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "word" | "excel" | "powerpoint">("pdf")

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      // محاكاة تقدم التوليد
      const progressSteps = [
        { step: "تحليل البيانات", progress: 20 },
        { step: "إنشاء الملخص التنفيذي", progress: 40 },
        { step: "توليد الرسوم البيانية", progress: 60 },
        { step: "إنشاء التوصيات", progress: 80 },
        { step: "تنسيق التقرير النهائي", progress: 100 },
      ]

      for (const { step, progress } of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setGenerationProgress(progress)
      }

      // توليد التقرير
      const report = await ReportEngine.generateComprehensiveReport(reportData)
      setGeneratedReport(report)
      onReportGenerated?.(report)
    } catch (error) {
      console.error("خطأ في توليد التقرير:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = (format: string) => {
    // محاكاة تحميل التقرير
    const link = document.createElement("a")
    link.href = "#"
    link.download = `financial-analysis-report.${format}`
    link.click()
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "word":
        return <FileText className="h-4 w-4" />
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />
      case "powerpoint":
        return <Presentation className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const reportStats = {
    totalAnalyses:
      reportData.basicAnalysis.length + reportData.appliedAnalysis.length + reportData.advancedAnalysis.length,
    excellentResults: [
      ...reportData.basicAnalysis,
      ...reportData.appliedAnalysis,
      ...reportData.advancedAnalysis,
    ].filter((a) => a.status === "excellent").length,
    criticalResults: [
      ...reportData.basicAnalysis,
      ...reportData.appliedAnalysis,
      ...reportData.advancedAnalysis,
    ].filter((a) => a.status === "critical").length,
    averageConfidence: Math.round(
      [...reportData.basicAnalysis, ...reportData.appliedAnalysis, ...reportData.advancedAnalysis].reduce(
        (sum, a) => sum + a.confidence,
        0,
      ) /
        (reportData.basicAnalysis.length + reportData.appliedAnalysis.length + reportData.advancedAnalysis.length),
    ),
  }

  return (
    <div className="space-y-6">
      {/* إحصائيات التقرير */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي التحليلات</p>
                <p className="text-2xl font-bold">{reportStats.totalAnalyses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">نتائج ممتازة</p>
                <p className="text-2xl font-bold text-green-600">{reportStats.excellentResults}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">نتائج حرجة</p>
                <p className="text-2xl font-bold text-red-600">{reportStats.criticalResults}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">متوسط الثقة</p>
                <p className="text-2xl font-bold text-purple-600">{reportStats.averageConfidence}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* خيارات التقرير */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            توليد التقرير المالي الشامل
          </CardTitle>
          <CardDescription>
            تقرير احترافي يحتوي على {reportStats.totalAnalyses} تحليل مالي متخصص مع الرسوم البيانية والتوصيات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* تقدم التوليد */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>جاري توليد التقرير...</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="w-full" />
            </div>
          )}

          {/* خيارات التنسيق */}
          <div className="space-y-4">
            <h4 className="font-medium">اختر تنسيق التقرير:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { format: "pdf", label: "PDF", description: "تقرير PDF احترافي" },
                { format: "word", label: "Word", description: "مستند Word قابل للتعديل" },
                { format: "excel", label: "Excel", description: "جداول بيانات تفاعلية" },
                { format: "powerpoint", label: "PowerPoint", description: "عرض تقديمي" },
              ].map(({ format, label, description }) => (
                <Card
                  key={format}
                  className={`cursor-pointer transition-all ${
                    selectedFormat === format ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedFormat(format as any)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      {getFormatIcon(format)}
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">{description}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* أزرار العمل */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleGenerateReport} disabled={isGenerating} className="flex-1 min-w-[200px]">
              {isGenerating ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  توليد التقرير الشامل
                </>
              )}
            </Button>

            {generatedReport && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(selectedFormat)}
                  className="flex-1 min-w-[150px]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  تحميل {selectedFormat.toUpperCase()}
                </Button>

                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* معاينة التقرير */}
      {generatedReport && (
        <Card>
          <CardHeader>
            <CardTitle>معاينة التقرير</CardTitle>
            <CardDescription>نظرة سريعة على محتويات التقرير المولد</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">الملخص</TabsTrigger>
                <TabsTrigger value="analysis">التحليلات</TabsTrigger>
                <TabsTrigger value="charts">الرسوم البيانية</TabsTrigger>
                <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">التقييم العام</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span>النتيجة الإجمالية</span>
                        <Badge
                          variant={reportData.executiveSummary.overallStatus === "excellent" ? "default" : "secondary"}
                        >
                          {reportData.executiveSummary.overallScore}/100
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">النتائج الرئيسية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm">
                        {reportData.executiveSummary.keyFindings.slice(0, 3).map((finding, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">التحليل الأساسي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{reportData.basicAnalysis.length}</div>
                        <div className="text-sm text-muted-foreground">تحليل مالي أساسي</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">التحليل التطبيقي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{reportData.appliedAnalysis.length}</div>
                        <div className="text-sm text-muted-foreground">تحليل تطبيقي متوسط</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">التحليل المتقدم</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{reportData.advancedAnalysis.length}</div>
                        <div className="text-sm text-muted-foreground">تحليل متقدم ومتطور</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="charts" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportData.charts.slice(0, 4).map((chart, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <PieChart className="h-5 w-5" />
                          {chart.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-muted-foreground">معاينة الرسم البياني</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-3">
                  {reportData.recommendations.slice(0, 5).map((rec, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant={
                                  rec.priority === "high"
                                    ? "destructive"
                                    : rec.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {rec.priority === "high" ? "عالية" : rec.priority === "medium" ? "متوسطة" : "منخفضة"}
                              </Badge>
                              <span className="font-medium">{rec.title}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
