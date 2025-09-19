"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface AnalysisConfig {
  sector: string
  activity: string
  legalEntity: string
  comparisonType: string
  yearsCount: number
  analysisTypes: string[]
}

interface AnalysisOptionsProps {
  config: AnalysisConfig
  onChange: (config: AnalysisConfig) => void
}

export function AnalysisOptions({ config, onChange }: AnalysisOptionsProps) {
  const updateConfig = (key: keyof AnalysisConfig, value: any) => {
    onChange({ ...config, [key]: value })
  }

  const sectors = [
    "البنوك والخدمات المالية",
    "البتروكيماويات",
    "الاتصالات وتقنية المعلومات",
    "التجارة والخدمات",
    "الصناعات الأساسية",
    "الرعاية الصحية",
    "العقارات والإنشاءات",
    "الطاقة والمرافق",
    "النقل واللوجستيات",
    "الإعلام والترفيه",
  ]

  const activities = [
    "تجارة التجزئة",
    "تجارة الجملة",
    "التصنيع",
    "الخدمات المالية",
    "الخدمات الاستشارية",
    "التطوير العقاري",
    "المقاولات",
    "التكنولوجيا",
    "الصحة",
    "التعليم",
  ]

  const legalEntities = [
    "شركة مساهمة عامة",
    "شركة مساهمة مقفلة",
    "شركة ذات مسؤولية محدودة",
    "شركة تضامن",
    "شركة توصية بسيطة",
    "مؤسسة فردية",
    "شركة أجنبية",
  ]

  const comparisonTypes = [
    "مقارنة مع القطاع",
    "مقارنة مع السوق العام",
    "مقارنة مع شركات مماثلة",
    "مقارنة تاريخية فقط",
    "بدون مقارنة",
  ]

  const analysisCategories = [
    { id: "basic", name: "التحليل الأساسي الكلاسيكي (106 تحليل)", count: 106 },
    { id: "applied", name: "التحليل التطبيقي المتوسط (21 تحليل)", count: 21 },
    { id: "advanced", name: "التحليل المتقدم والمتطور (53 تحليل)", count: 53 },
  ]

  const handleAnalysisTypeChange = (categoryId: string, checked: boolean) => {
    let newTypes = [...config.analysisTypes]
    if (checked) {
      if (!newTypes.includes(categoryId)) {
        newTypes.push(categoryId)
      }
    } else {
      newTypes = newTypes.filter((type) => type !== categoryId)
    }
    updateConfig("analysisTypes", newTypes)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#B48500] mb-2">حدد خيارات التحليل</h2>
        <p className="text-gray-300 mb-6">اختر المعايير المناسبة لتحليل دقيق ومخصص</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* القطاع */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <Label className="text-[#B48500] font-semibold mb-3 block">القطاع الاقتصادي *</Label>
          <Select value={config.sector} onValueChange={(value) => updateConfig("sector", value)}>
            <SelectTrigger className="bg-gray-900 border-gray-600 text-gray-200">
              <SelectValue placeholder="اختر القطاع" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-600">
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector} className="text-gray-200 hover:bg-gray-800">
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* النشاط */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <Label className="text-[#B48500] font-semibold mb-3 block">النشاط التجاري *</Label>
          <Select value={config.activity} onValueChange={(value) => updateConfig("activity", value)}>
            <SelectTrigger className="bg-gray-900 border-gray-600 text-gray-200">
              <SelectValue placeholder="اختر النشاط" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-600">
              {activities.map((activity) => (
                <SelectItem key={activity} value={activity} className="text-gray-200 hover:bg-gray-800">
                  {activity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* الكيان القانوني */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <Label className="text-[#B48500] font-semibold mb-3 block">الكيان القانوني</Label>
          <Select value={config.legalEntity} onValueChange={(value) => updateConfig("legalEntity", value)}>
            <SelectTrigger className="bg-gray-900 border-gray-600 text-gray-200">
              <SelectValue placeholder="اختر الكيان القانوني" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-600">
              {legalEntities.map((entity) => (
                <SelectItem key={entity} value={entity} className="text-gray-200 hover:bg-gray-800">
                  {entity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* نوع المقارنة */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <Label className="text-[#B48500] font-semibold mb-3 block">نوع المقارنة</Label>
          <Select value={config.comparisonType} onValueChange={(value) => updateConfig("comparisonType", value)}>
            <SelectTrigger className="bg-gray-900 border-gray-600 text-gray-200">
              <SelectValue placeholder="اختر نوع المقارنة" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-600">
              {comparisonTypes.map((type) => (
                <SelectItem key={type} value={type} className="text-gray-200 hover:bg-gray-800">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
      </div>

      {/* عدد السنوات */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <Label className="text-[#B48500] font-semibold mb-4 block">عدد السنوات للتحليل: {config.yearsCount} سنة</Label>
        <Slider
          value={[config.yearsCount]}
          onValueChange={(value) => updateConfig("yearsCount", value[0])}
          max={10}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>سنة واحدة</span>
          <span>10 سنوات</span>
        </div>
      </Card>

      {/* أنواع التحليل */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <Label className="text-[#B48500] font-semibold mb-4 block">أنواع التحليل المطلوبة</Label>
        <div className="space-y-4">
          {analysisCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3 rtl:space-x-reverse">
              <Checkbox
                id={category.id}
                checked={config.analysisTypes.includes(category.id)}
                onCheckedChange={(checked) => handleAnalysisTypeChange(category.id, checked as boolean)}
                className="border-gray-600 data-[state=checked]:bg-[#B48500] data-[state=checked]:border-[#B48500]"
              />
              <Label htmlFor={category.id} className="text-gray-200 cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}

          {config.analysisTypes.length === 0 && (
            <p className="text-sm text-gray-400 mt-2">إذا لم تحدد أي نوع، سيتم إجراء جميع الأنواع (180 تحليل)</p>
          )}
        </div>
      </Card>
    </div>
  )
}
