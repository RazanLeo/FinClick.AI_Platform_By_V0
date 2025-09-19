"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserDashboard } from "./user-dashboard"
import {
  Users,
  BarChart3,
  DollarSign,
  Activity,
  Search,
  Filter,
  Download,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  company: string
  subscriptionType: string
  subscriptionStatus: "active" | "expired" | "trial"
  lastLogin: string
  totalAnalyses: number
}

interface SystemStats {
  totalUsers: number
  activeSubscriptions: number
  totalAnalyses: number
  monthlyRevenue: number
  systemUptime: string
  processingQueue: number
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const [systemStats] = useState<SystemStats>({
    totalUsers: 1247,
    activeSubscriptions: 892,
    totalAnalyses: 15634,
    monthlyRevenue: 4460000,
    systemUptime: "99.9%",
    processingQueue: 23,
  })

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "أحمد المالكي",
      email: "ahmed@company.com",
      company: "شركة الرياض للتطوير",
      subscriptionType: "yearly",
      subscriptionStatus: "active",
      lastLogin: "2024-01-15",
      totalAnalyses: 45,
    },
    {
      id: "2",
      name: "فاطمة العتيبي",
      email: "fatima@bank.com",
      company: "البنك الأهلي السعودي",
      subscriptionType: "monthly",
      subscriptionStatus: "active",
      lastLogin: "2024-01-14",
      totalAnalyses: 78,
    },
    {
      id: "3",
      name: "خالد الشمري",
      email: "khalid@investment.com",
      company: "محفظة استثمارية خاصة",
      subscriptionType: "yearly",
      subscriptionStatus: "expired",
      lastLogin: "2024-01-10",
      totalAnalyses: 23,
    },
    {
      id: "4",
      name: "سارة القحطاني",
      email: "sara@rajhi.com",
      company: "بنك الراجحي",
      subscriptionType: "monthly",
      subscriptionStatus: "trial",
      lastLogin: "2024-01-15",
      totalAnalyses: 12,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "expired":
        return "bg-red-500"
      case "trial":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط"
      case "expired":
        return "منتهي"
      case "trial":
        return "تجريبي"
      default:
        return "غير معروف"
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#B48500] animate-glow flex items-center gap-2">
                <Shield className="w-8 h-8" />
                لوحة تحكم الإدارة
              </h1>
              <p className="text-[#8B6914]">إدارة المنصة والمستخدمين والاشتراكات</p>
            </div>
            <Badge className="bg-red-500 text-white">مدير النظام</Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#1a1a1a] border border-[#B48500]">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <BarChart3 className="w-4 h-4 ml-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <Users className="w-4 h-4 ml-2" />
              المستخدمون
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <Activity className="w-4 h-4 ml-2" />
              التحليلات
            </TabsTrigger>
            <TabsTrigger
              value="platform"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <Settings className="w-4 h-4 ml-2" />
              استخدام المنصة
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="bg-black border-[#B48500] hover-glow">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-[#B48500] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#B48500]">{systemStats.totalUsers.toLocaleString()}</div>
                  <div className="text-[#8B6914] text-sm">إجمالي المستخدمين</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-[#B48500] hover-glow">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#B48500]">
                    {systemStats.activeSubscriptions.toLocaleString()}
                  </div>
                  <div className="text-[#8B6914] text-sm">اشتراكات نشطة</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-[#B48500] hover-glow">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-[#B48500] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#B48500]">{systemStats.totalAnalyses.toLocaleString()}</div>
                  <div className="text-[#8B6914] text-sm">إجمالي التحليلات</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-[#B48500] hover-glow">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#B48500]">
                    {(systemStats.monthlyRevenue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-[#8B6914] text-sm">الإيرادات الشهرية</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-[#B48500] hover-glow">
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#B48500]">{systemStats.systemUptime}</div>
                  <div className="text-[#8B6914] text-sm">وقت التشغيل</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-[#B48500] hover-glow">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#B48500]">{systemStats.processingQueue}</div>
                  <div className="text-[#8B6914] text-sm">قائمة الانتظار</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-black border-[#B48500]">
              <CardHeader>
                <CardTitle className="text-[#B48500]">النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-[#B48500] text-sm">تم إكمال تحليل شامل لشركة التقنية المتقدمة</p>
                      <p className="text-[#8B6914] text-xs">منذ 5 دقائق</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-[#B48500] text-sm">مستخدم جديد: محمد الأحمد - شركة الاستثمار الذكي</p>
                      <p className="text-[#8B6914] text-xs">منذ 15 دقيقة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-[#B48500] text-sm">اشتراك سنوي جديد: 54,000 ر.س</p>
                      <p className="text-[#8B6914] text-xs">منذ 30 دقيقة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <div className="flex-1">
                      <p className="text-[#B48500] text-sm">تحذير: استخدام عالي للخادم (85%)</p>
                      <p className="text-[#8B6914] text-xs">منذ ساعة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-black border-[#B48500]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#B48500]">إدارة المستخدمين</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent"
                    >
                      <Download className="w-4 h-4 ml-2" />
                      تصدير
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent"
                    >
                      <Filter className="w-4 h-4 ml-2" />
                      فلترة
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B6914] w-4 h-4" />
                  <Input
                    placeholder="البحث عن المستخدمين..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914] pr-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#8B6914] rounded-lg hover:border-[#B48500] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#B48500] rounded-full flex items-center justify-center text-black font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-[#B48500] font-semibold">{user.name}</h4>
                          <p className="text-[#8B6914] text-sm">{user.email}</p>
                          <p className="text-[#8B6914] text-xs">{user.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Badge className={`${getStatusColor(user.subscriptionStatus)} text-white text-xs`}>
                            {getStatusText(user.subscriptionStatus)}
                          </Badge>
                          <p className="text-[#8B6914] text-xs mt-1">
                            {user.subscriptionType === "yearly" ? "سنوي" : "شهري"}
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="text-[#B48500] font-semibold">{user.totalAnalyses}</div>
                          <p className="text-[#8B6914] text-xs">تحليل</p>
                        </div>

                        <div className="text-center">
                          <div className="text-[#B48500] text-sm">{user.lastLogin}</div>
                          <p className="text-[#8B6914] text-xs">آخر دخول</p>
                        </div>

                        <div className="flex gap-1">
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
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500 hover:text-white">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-black border-[#B48500]">
              <CardHeader>
                <CardTitle className="text-[#B48500]">إحصائيات التحليلات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-[#8B6914]">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-[#B48500]" />
                  <p>سيتم إضافة إحصائيات مفصلة للتحليلات قريباً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platform Usage Tab */}
          <TabsContent value="platform" className="space-y-6">
            <UserDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
