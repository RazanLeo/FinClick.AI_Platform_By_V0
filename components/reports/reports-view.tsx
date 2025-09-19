"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"
import {
  FileText,
  Download,
  Eye,
  Search,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  Share2,
  Printer,
  Mail,
  Star,
} from "lucide-react"

interface Report {
  id: string
  companyName: string
  analysisType: string
  createdDate: string
  status: "completed" | "processing" | "failed"
  filesCount: number
  analysisCount: number
  language: "ar" | "en"
  sector: string
  size: string
  rating: number
  isFavorite: boolean
}

export function ReportsView() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const [reports] = useState<Report[]>([
    {
      id: "1",
      companyName: "شركة التقنية المتقدمة",
      analysisType: "التحليل الشامل",
      createdDate: "2024-01-15",
      status: "completed",
      filesCount: 5,
      analysisCount: 180,
      language: "ar",
      sector: "التكنولوجيا",
      size: "2.4 MB",
      rating: 4.8,
      isFavorite: true,
    },
    {
      id: "2",
      companyName: "مؤسسة الاستثمار الذكي",
      analysisType: "التحليل الأساسي الكلاسيكي",
      createdDate: "2024-01-10",
      status: "completed",
      filesCount: 3,
      analysisCount: 106,
      language: "ar",
      sector: "الاستثمار",
      size: "1.8 MB",
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: "3",
      companyName: "شركة التجارة الإلكترونية",
      analysisType: "التحليل المتقدم والمتطور",
      createdDate: "2024-01-08",
      status: "processing",
      filesCount: 7,
      analysisCount: 53,
      language: "ar",
      sector: "التجارة الإلكترونية",
      size: "3.1 MB",
      rating: 0,
      isFavorite: false,
    },
    {
      id: "4",
      companyName: "البنك الأهلي التجاري",
      analysisType: "التحليل الشامل",
      createdDate: "2024-01-05",
      status: "completed",
      filesCount: 12,
      analysisCount: 180,
      language: "ar",
      sector: "المصرفي",
      size: "4.7 MB",
      rating: 4.9,
      isFavorite: true,
    },
    {
      id: "5",
      companyName: "شركة الطاقة المتجددة",
      analysisType: "التحليل التطبيقي المتوسط",
      createdDate: "2024-01-03",
      status: "completed",
      filesCount: 4,
      analysisCount: 21,
      language: "ar",
      sector: "الطاقة",
      size: "1.2 MB",
      rating: 4.2,
      isFavorite: false,
    },
    {
      id: "6",
      companyName: "مجموعة الاتصالات السعودية",
      analysisType: "التحليل الشامل",
      createdDate: "2024-01-01",
      status: "failed",
      filesCount: 8,
      analysisCount: 0,
      language: "ar",
      sector: "الاتصالات",
      size: "0 MB",
      rating: 0,
      isFavorite: false,
    },
  ])

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

  const filteredReports = reports
    .filter((report) => {
      const matchesSearch =
        report.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.analysisType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.sector.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "all" || report.status === filterStatus
      const matchesType = filterType === "all" || report.analysisType.includes(filterType)

      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        case "name":
          return a.companyName.localeCompare(b.companyName)
        case "rating":
          return b.rating - a.rating
        case "size":
          return Number.parseFloat(b.size) - Number.parseFloat(a.size)
        default:
          return 0
      }
    })

  const completedReports = reports.filter((r) => r.status === "completed")
  const processingReports = reports.filter((r) => r.status === "processing")
  const failedReports = reports.filter((r) => r.status === "failed")

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#B48500] animate-glow flex items-center gap-2">
                <FileText className="w-8 h-8" />
                التقارير والنتائج
              </h1>
              <p className="text-[#8B6914]">عرض وإدارة جميع التقارير المالية والتحليلات</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-[#B48500] text-black">{completedReports.length} تقرير مكتمل</Badge>
              {user?.type === "guest" && <Badge className="bg-blue-500 text-white">حساب ضيف</Badge>}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black border-[#B48500] hover-glow">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-[#B48500] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#B48500]">{reports.length}</div>
              <div className="text-[#8B6914] text-sm">إجمالي التقارير</div>
            </CardContent>
          </Card>
          <Card className="bg-black border-[#B48500] hover-glow">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#B48500]">{completedReports.length}</div>
              <div className="text-[#8B6914] text-sm">تقارير مكتملة</div>
            </CardContent>
          </Card>
          <Card className="bg-black border-[#B48500] hover-glow">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#B48500]">{processingReports.length}</div>
              <div className="text-[#8B6914] text-sm">قيد المعالجة</div>
            </CardContent>
          </Card>
          <Card className="bg-black border-[#B48500] hover-glow">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-[#B48500] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#B48500]">{reports.filter((r) => r.isFavorite).length}</div>
              <div className="text-[#8B6914] text-sm">تقارير مفضلة</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#1a1a1a] border border-[#B48500]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <FileText className="w-4 h-4 ml-2" />
              جميع التقارير
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <CheckCircle className="w-4 h-4 ml-2" />
              المكتملة
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <Star className="w-4 h-4 ml-2" />
              المفضلة
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <BarChart3 className="w-4 h-4 ml-2" />
              الإحصائيات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters and Search */}
            <Card className="bg-black border-[#B48500]">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B6914] w-4 h-4" />
                    <Input
                      placeholder="البحث في التقارير..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914] pr-10"
                    />
                  </div>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                      <SelectValue placeholder="فلترة بالحالة" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#B48500]">
                      <SelectItem value="all" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        جميع الحالات
                      </SelectItem>
                      <SelectItem value="completed" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        مكتمل
                      </SelectItem>
                      <SelectItem value="processing" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        قيد المعالجة
                      </SelectItem>
                      <SelectItem value="failed" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        فشل
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                      <SelectValue placeholder="نوع التحليل" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#B48500]">
                      <SelectItem value="all" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        جميع الأنواع
                      </SelectItem>
                      <SelectItem value="الشامل" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        التحليل الشامل
                      </SelectItem>
                      <SelectItem value="الكلاسيكي" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        التحليل الكلاسيكي
                      </SelectItem>
                      <SelectItem value="المتقدم" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        التحليل المتقدم
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#B48500]">
                      <SelectItem value="date" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        التاريخ
                      </SelectItem>
                      <SelectItem value="name" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        اسم الشركة
                      </SelectItem>
                      <SelectItem value="rating" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        التقييم
                      </SelectItem>
                      <SelectItem value="size" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                        حجم الملف
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="bg-black border-[#B48500] hover:border-[#B48500] transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-[#B48500] font-bold text-lg">{report.companyName}</h3>
                          {report.isFavorite && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                          <Badge className={`${getStatusColor(report.status)} text-white text-xs`}>
                            {getStatusText(report.status)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-[#8B6914] text-sm">نوع التحليل</p>
                            <p className="text-[#B48500] font-semibold">{report.analysisType}</p>
                          </div>
                          <div>
                            <p className="text-[#8B6914] text-sm">القطاع</p>
                            <p className="text-[#B48500] font-semibold">{report.sector}</p>
                          </div>
                          <div>
                            <p className="text-[#8B6914] text-sm">تاريخ الإنشاء</p>
                            <p className="text-[#B48500] font-semibold">{report.createdDate}</p>
                          </div>
                          <div>
                            <p className="text-[#8B6914] text-sm">حجم التقرير</p>
                            <p className="text-[#B48500] font-semibold">{report.size}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-[#8B6914]">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {report.filesCount} ملفات
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            {report.analysisCount} تحليل
                          </span>
                          {report.rating > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {report.rating}/5
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {report.status === "completed" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
                            >
                              <Eye className="w-4 h-4 ml-2" />
                              عرض
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
                            >
                              <Download className="w-4 h-4 ml-2" />
                              تحميل
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
                            >
                              <Share2 className="w-4 h-4 ml-2" />
                              مشاركة
                            </Button>
                          </>
                        )}
                        {report.status === "processing" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-yellow-500 hover:bg-yellow-500 hover:text-black"
                          >
                            <Clock className="w-4 h-4 ml-2" />
                            انتظار
                          </Button>
                        )}
                        {report.status === "failed" && (
                          <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500 hover:text-white">
                            <AlertCircle className="w-4 h-4 ml-2" />
                            إعادة المحاولة
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="space-y-4">
              {completedReports.map((report) => (
                <Card key={report.id} className="bg-black border-green-500 hover:border-green-400 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[#B48500] font-bold text-lg mb-2">{report.companyName}</h3>
                        <p className="text-[#8B6914]">
                          {report.analysisType} - {report.createdDate}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-[#8B6914]">
                          <span>{report.analysisCount} تحليل</span>
                          <span>{report.size}</span>
                          <span>⭐ {report.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-[#B48500]">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-[#B48500]">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-[#B48500]">
                          <Printer className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-[#B48500]">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="space-y-4">
              {reports
                .filter((r) => r.isFavorite)
                .map((report) => (
                  <Card key={report.id} className="bg-black border-yellow-500 hover:border-yellow-400 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <h3 className="text-[#B48500] font-bold text-lg">{report.companyName}</h3>
                          </div>
                          <p className="text-[#8B6914]">
                            {report.analysisType} - {report.createdDate}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-[#8B6914]">
                            <span>{report.analysisCount} تحليل</span>
                            <span>⭐ {report.rating}/5</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-[#B48500]">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-[#B48500]">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black border-[#B48500]">
                <CardHeader>
                  <CardTitle className="text-[#B48500]">إحصائيات الاستخدام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#8B6914]">إجمالي التحليلات المنجزة:</span>
                      <span className="text-[#B48500] font-bold">
                        {completedReports.reduce((sum, r) => sum + r.analysisCount, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B6914]">متوسط التقييم:</span>
                      <span className="text-[#B48500] font-bold">
                        {(completedReports.reduce((sum, r) => sum + r.rating, 0) / completedReports.length).toFixed(1)}
                        /5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B6914]">إجمالي حجم التقارير:</span>
                      <span className="text-[#B48500] font-bold">
                        {completedReports.reduce((sum, r) => sum + Number.parseFloat(r.size), 0).toFixed(1)} MB
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black border-[#B48500]">
                <CardHeader>
                  <CardTitle className="text-[#B48500]">القطاعات الأكثر تحليلاً</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["التكنولوجيا", "المصرفي", "الاستثمار", "الطاقة", "التجارة الإلكترونية"].map((sector, index) => (
                      <div key={sector} className="flex items-center justify-between">
                        <span className="text-[#8B6914]">{sector}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-[#1a1a1a] rounded-full">
                            <div
                              className="h-full bg-[#B48500] rounded-full"
                              style={{ width: `${(5 - index) * 20}%` }}
                            />
                          </div>
                          <span className="text-[#B48500] text-sm">{5 - index}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
