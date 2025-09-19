"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Settings, Building, Globe, Calendar, BarChart3 } from "lucide-react"

interface AnalysisOptionsProps {
  onOptionsChange: (options: any) => void
}

export function AnalysisOptions({ onOptionsChange }: AnalysisOptionsProps) {
  const [options, setOptions] = useState({
    language: "ar",
    companyName: "",
    sector: "",
    activity: "",
    legalEntity: "",
    analysisYears: "1",
    comparisonLevel: "",
    analysisTypes: {
      classical: false,
      applied: false,
      advanced: false,
      comprehensive: true,
    },
  })

  const sectors = [
    "الطاقة والموارد الطبيعية",
    "المواد الأساسية والكيماويات",
    "التعدين والمعادن",
    "الصناعات التحويلية",
    "الأغذية والمشروبات",
    "الزراعة والثروة الحيوانية",
    "القطاع المالي والمصرفي",
    "العقارات والإنشاءات",
    "التجارة والتجزئة",
    "النقل واللوجستيات",
    "الاتصالات وتكنولوجيا المعلومات",
    "الذكاء الاصطناعي والتعلم الآلي",
    "الرعاية الصحية",
    "التعليم والتدريب",
    "السياحة والضيافة",
    "الإعلام والترفيه",
    "الخدمات المهنية والاستشارية",
    "الخدمات الشخصية والمجتمعية",
    "الدفاع والأمن",
    "الفضاء والأقمار الصناعية",
    "البيئة والاستدامة",
    "الروبوتات والأتمتة",
    "القطاع الحكومي والعام",
    "القطاع غير الربحي والخيري",
    "الاقتصاد الإبداعي",
    "القطاعات الناشئة والمستقبلية",
  ]

  const legalEntities = [
    "شركة مساهمة عامة",
    "شركة مساهمة خاصة",
    "شركة ذات مسؤولية محدودة",
    "شركة الشخص الواحد",
    "مؤسسة فردية",
    "شركة تضامن",
    "شركة توصية بسيطة",
    "شركة توصية بالأسهم",
    "الشركة القابضة",
    "الشركة التابعة",
    "جمعية تعاونية",
    "منظمة غير ربحية",
    "مؤسسة عامة",
    "شركة مملوكة للدولة",
    "الهيئة المستقلة",
    "الشركة متعددة الجنسيات",
    "الشركة المهنية",
  ]

  const comparisonLevels = [
    { value: "saudi", label: "المستوى المحلي - السعودية" },
    { value: "gulf", label: "دول الخليج العربي" },
    { value: "arab", label: "الدول العربية" },
    { value: "asia", label: "دول آسيا" },
    { value: "africa", label: "دول أفريقيا" },
    { value: "europe", label: "دول أوروبا" },
    { value: "north-america", label: "دول أمريكا الشمالية" },
    { value: "south-america", label: "دول أمريكا الجنوبية" },
    { value: "australia", label: "دول أستراليا" },
    { value: "global", label: "عالمياً" },
  ]

  const analysisTypeOptions = [
    {
      key: "classical",
      label: "التحليل الأساسي الكلاسيكي",
      description: "106 تحليلات أساسية",
      color: "bg-blue-500",
    },
    {
      key: "applied",
      label: "التحليل التطبيقي المتوسط",
      description: "21 تحليل متوسط",
      color: "bg-green-500",
    },
    {
      key: "advanced",
      label: "التحليل المتقدم والمتطور",
      description: "53 تحليل متقدم",
      color: "bg-purple-500",
    },
    {
      key: "comprehensive",
      label: "التحليل الشامل",
      description: "جميع الـ 180 تحليل",
      color: "bg-[#B48500]",
    },
  ]

  const handleOptionChange = (key: string, value: any) => {
    const newOptions = { ...options, [key]: value }
    setOptions(newOptions)
    onOptionsChange(newOptions)
  }

  const handleAnalysisTypeChange = (type: string, checked: boolean) => {
    const newAnalysisTypes = { ...options.analysisTypes, [type]: checked }

    // If comprehensive is selected, unselect others
    if (type === "comprehensive" && checked) {
      Object.keys(newAnalysisTypes).forEach((key) => {
        newAnalysisTypes[key] = key === "comprehensive"
      })
    } else if (type !== "comprehensive" && checked) {
      // If any other type is selected, unselect comprehensive
      newAnalysisTypes.comprehensive = false
    }

    const newOptions = { ...options, analysisTypes: newAnalysisTypes }
    setOptions(newOptions)
    onOptionsChange(newOptions)
  }

  return (
    <Card className="bg-black border-[#B48500]">
      <CardHeader>
        <CardTitle className="text-[#B48500] flex items-center gap-2">
          <Settings className="w-5 h-5" />
          خيارات التحليل
        </CardTitle>
        <p className="text-[#8B6914] text-sm">حدد المعايير والخيارات المطلوبة للتحليل المالي</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Language Selection */}
        <div className="space-y-2">
          <Label className="text-[#B48500] flex items-center gap-2">
            <Globe className="w-4 h-4" />
            اللغة المطلوبة للتحليل والتقارير
          </Label>
          <Select value={options.language} onValueChange={(value) => handleOptionChange("language", value)}>
            <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#B48500]">
              <SelectItem value="ar" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                🇸🇦 العربية
              </SelectItem>
              <SelectItem value="en" className="text-[#B48500] focus:bg-[#B48500] focus:text-black">
                🇺🇸 English
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-[#B48500] flex items-center gap-2">
            <Building className="w-4 h-4" />
            اسم الشركة / المنظمة
          </Label>
          <Input
            id="companyName"
            value={options.companyName}
            onChange={(e) => handleOptionChange("companyName", e.target.value)}
            placeholder="أدخل اسم الشركة أو المنظمة"
            className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914]"
          />
        </div>

        {/* Sector and Legal Entity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#B48500]">القطاع *</Label>
            <Select value={options.sector} onValueChange={(value) => handleOptionChange("sector", value)}>
              <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                <SelectValue placeholder="اختر القطاع" />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#B48500] max-h-60">
                {sectors.map((sector) => (
                  <SelectItem
                    key={sector}
                    value={sector}
                    className="text-[#B48500] focus:bg-[#B48500] focus:text-black"
                  >
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[#B48500]">الكيان القانوني *</Label>
            <Select value={options.legalEntity} onValueChange={(value) => handleOptionChange("legalEntity", value)}>
              <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                <SelectValue placeholder="اختر الكيان القانوني" />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#B48500] max-h-60">
                {legalEntities.map((entity) => (
                  <SelectItem
                    key={entity}
                    value={entity}
                    className="text-[#B48500] focus:bg-[#B48500] focus:text-black"
                  >
                    {entity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Activity */}
        <div className="space-y-2">
          <Label htmlFor="activity" className="text-[#B48500]">
            النشاط (اختياري)
          </Label>
          <Input
            id="activity"
            value={options.activity}
            onChange={(e) => handleOptionChange("activity", e.target.value)}
            placeholder="مثال: تطوير البرمجيات، التجارة الإلكترونية، الخدمات المصرفية..."
            className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914]"
          />
        </div>

        {/* Analysis Years and Comparison Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#B48500] flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              عدد سنوات التحليل
            </Label>
            <Select value={options.analysisYears} onValueChange={(value) => handleOptionChange("analysisYears", value)}>
              <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#B48500]">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((year) => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                    className="text-[#B48500] focus:bg-[#B48500] focus:text-black"
                  >
                    {year} {year === 1 ? "سنة" : "سنوات"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[#B48500]">مستوى المقارنة الجغرافي</Label>
            <Select
              value={options.comparisonLevel}
              onValueChange={(value) => handleOptionChange("comparisonLevel", value)}
            >
              <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                <SelectValue placeholder="اختر مستوى المقارنة" />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#B48500]">
                {comparisonLevels.map((level) => (
                  <SelectItem
                    key={level.value}
                    value={level.value}
                    className="text-[#B48500] focus:bg-[#B48500] focus:text-black"
                  >
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Analysis Types */}
        <div className="space-y-4">
          <Label className="text-[#B48500] flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            نوع التحليل المطلوب
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisTypeOptions.map((type) => (
              <div
                key={type.key}
                className={`p-4 border-2 rounded-lg transition-all ${
                  options.analysisTypes[type.key as keyof typeof options.analysisTypes]
                    ? "border-[#B48500] bg-[#B48500]/10"
                    : "border-[#8B6914] hover:border-[#B48500]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={type.key}
                    checked={options.analysisTypes[type.key as keyof typeof options.analysisTypes]}
                    onCheckedChange={(checked) => handleAnalysisTypeChange(type.key, checked as boolean)}
                    className="border-[#B48500] data-[state=checked]:bg-[#B48500] data-[state=checked]:text-black mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={type.key} className="text-[#B48500] font-semibold cursor-pointer">
                      {type.label}
                    </Label>
                    <p className="text-[#8B6914] text-sm mt-1">{type.description}</p>
                    <Badge className={`${type.color} text-white text-xs mt-2`}>
                      {type.key === "comprehensive" ? "الأكثر شمولية" : "متخصص"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#1a1a1a] border border-[#B48500] rounded-lg p-4">
          <h4 className="text-[#B48500] font-semibold mb-2">ملخص الخيارات المحددة</h4>
          <div className="space-y-1 text-sm text-[#8B6914]">
            <p>• اللغة: {options.language === "ar" ? "العربية" : "English"}</p>
            <p>• الشركة: {options.companyName || "غير محدد"}</p>
            <p>• القطاع: {options.sector || "غير محدد"}</p>
            <p>• الكيان القانوني: {options.legalEntity || "غير محدد"}</p>
            <p>• عدد السنوات: {options.analysisYears} سنة</p>
            <p>
              • مستوى المقارنة: {comparisonLevels.find((l) => l.value === options.comparisonLevel)?.label || "غير محدد"}
            </p>
            <p>
              • أنواع التحليل:{" "}
              {Object.entries(options.analysisTypes)
                .filter(([_, selected]) => selected)
                .map(([type, _]) => analysisTypeOptions.find((opt) => opt.key === type)?.label)
                .join("، ") || "غير محدد"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
