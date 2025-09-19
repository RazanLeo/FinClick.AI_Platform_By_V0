"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, UserPlus, Building, Mail, Phone, CreditCard } from "lucide-react"

interface RegisterFormProps {
  onRegister: (userData: any) => void
  onBack: () => void
}

export function RegisterForm({ onRegister, onBack }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Company Info
    companyName: "",
    position: "",
    sector: "",
    activity: "",
    legalEntity: "",

    // Subscription
    subscriptionType: "",
    paymentMethod: "",

    // Terms
    acceptTerms: false,
    acceptPrivacy: false,
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
  ]

  const legalEntities = [
    "شركة مساهمة عامة",
    "شركة مساهمة خاصة",
    "شركة ذات مسؤولية محدودة",
    "شركة الشخص الواحد",
    "مؤسسة فردية",
    "شركة تضامن",
    "شركة توصية بسيطة",
    "جمعية تعاونية",
    "منظمة غير ربحية",
    "مؤسسة عامة",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          setError("يرجى إكمال جميع البيانات الشخصية")
          return false
        }
        if (!formData.password || formData.password.length < 8) {
          setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل")
          return false
        }
        if (formData.password !== formData.confirmPassword) {
          setError("كلمة المرور وتأكيد كلمة المرور غير متطابقتين")
          return false
        }
        break
      case 2:
        if (!formData.companyName || !formData.position || !formData.sector || !formData.legalEntity) {
          setError("يرجى إكمال جميع بيانات الشركة")
          return false
        }
        break
      case 3:
        if (!formData.subscriptionType || !formData.paymentMethod) {
          setError("يرجى اختيار نوع الاشتراك وطريقة الدفع")
          return false
        }
        if (!formData.acceptTerms || !formData.acceptPrivacy) {
          setError("يجب الموافقة على الشروط والأحكام وسياسة الخصوصية")
          return false
        }
        break
    }
    setError("")
    return true
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setLoading(true)
    try {
      // Simulate registration process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onRegister(formData)
    } catch (err: any) {
      setError("حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-black border-[#B48500] shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-[#B48500] rounded-full flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-black" />
          </div>
          <CardTitle className="text-2xl text-[#B48500] animate-glow">إنشاء حساب جديد</CardTitle>
          <p className="text-[#8B6914]">
            الخطوة {step} من 3 - {step === 1 ? "البيانات الشخصية" : step === 2 ? "بيانات الشركة" : "الاشتراك والدفع"}
          </p>
        </CardHeader>

        <CardContent>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className={`text-sm ${step >= 1 ? "text-[#B48500]" : "text-[#8B6914]"}`}>البيانات الشخصية</span>
              <span className={`text-sm ${step >= 2 ? "text-[#B48500]" : "text-[#8B6914]"}`}>بيانات الشركة</span>
              <span className={`text-sm ${step >= 3 ? "text-[#B48500]" : "text-[#8B6914]"}`}>الاشتراك</span>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-2">
              <div
                className="bg-[#B48500] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {error && (
            <Alert className="mb-4 border-red-500 bg-red-500/10">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#B48500]">
                    الاسم الأول *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-black border-[#B48500] text-[#B48500]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#B48500]">
                    الاسم الأخير *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-black border-[#B48500] text-[#B48500]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#B48500]">
                  البريد الإلكتروني *
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B6914] w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-black border-[#B48500] text-[#B48500] pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#B48500]">
                  رقم الهاتف *
                </Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B6914] w-4 h-4" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-black border-[#B48500] text-[#B48500] pr-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#B48500]">
                    كلمة المرور *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="bg-black border-[#B48500] text-[#B48500] pl-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3 text-[#8B6914] hover:text-[#B48500]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#B48500]">
                    تأكيد كلمة المرور *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="bg-black border-[#B48500] text-[#B48500] pl-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3 text-[#8B6914] hover:text-[#B48500]"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Company Information */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-[#B48500]">
                  اسم الشركة *
                </Label>
                <div className="relative">
                  <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B6914] w-4 h-4" />
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="bg-black border-[#B48500] text-[#B48500] pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-[#B48500]">
                  المنصب *
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  className="bg-black border-[#B48500] text-[#B48500]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#B48500]">القطاع *</Label>
                  <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                    <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                      <SelectValue placeholder="اختر القطاع" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#B48500]">
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
                  <Select
                    value={formData.legalEntity}
                    onValueChange={(value) => handleInputChange("legalEntity", value)}
                  >
                    <SelectTrigger className="bg-black border-[#B48500] text-[#B48500]">
                      <SelectValue placeholder="اختر الكيان القانوني" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#B48500]">
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

              <div className="space-y-2">
                <Label htmlFor="activity" className="text-[#B48500]">
                  النشاط (اختياري)
                </Label>
                <Input
                  id="activity"
                  value={formData.activity}
                  onChange={(e) => handleInputChange("activity", e.target.value)}
                  className="bg-black border-[#B48500] text-[#B48500]"
                  placeholder="مثال: تطوير البرمجيات، التجارة الإلكترونية..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Subscription */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-[#B48500] text-lg">اختر خطة الاشتراك *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.subscriptionType === "monthly"
                        ? "border-[#B48500] bg-[#B48500]/10"
                        : "border-[#8B6914] hover:border-[#B48500]"
                    }`}
                    onClick={() => handleInputChange("subscriptionType", "monthly")}
                  >
                    <div className="text-center">
                      <h4 className="text-[#B48500] font-semibold text-lg">الخطة الشهرية</h4>
                      <div className="text-3xl font-bold text-[#B48500] my-2">5,000 ر.س</div>
                      <p className="text-[#8B6914] text-sm">شهرياً</p>
                    </div>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                      formData.subscriptionType === "yearly"
                        ? "border-[#B48500] bg-[#B48500]/10"
                        : "border-[#8B6914] hover:border-[#B48500]"
                    }`}
                    onClick={() => handleInputChange("subscriptionType", "yearly")}
                  >
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">وفر 10%</span>
                    </div>
                    <div className="text-center">
                      <h4 className="text-[#B48500] font-semibold text-lg">الخطة السنوية</h4>
                      <div className="text-lg text-[#8B6914] line-through">60,000 ر.س</div>
                      <div className="text-3xl font-bold text-[#B48500] my-2">54,000 ر.س</div>
                      <p className="text-[#8B6914] text-sm">سنوياً</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[#B48500] text-lg">طريقة الدفع *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: "mada", name: "مدى", icon: "💳" },
                    { id: "visa", name: "فيزا", icon: "💳" },
                    { id: "mastercard", name: "ماستركارد", icon: "💳" },
                    { id: "paypal", name: "باي بال", icon: "🌐" },
                    { id: "applepay", name: "آبل باي", icon: "📱" },
                  ].map((method) => (
                    <div
                      key={method.id}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                        formData.paymentMethod === method.id
                          ? "border-[#B48500] bg-[#B48500]/10"
                          : "border-[#8B6914] hover:border-[#B48500]"
                      }`}
                      onClick={() => handleInputChange("paymentMethod", method.id)}
                    >
                      <div className="text-2xl mb-1">{method.icon}</div>
                      <div className="text-[#B48500] text-sm">{method.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                    className="border-[#B48500] data-[state=checked]:bg-[#B48500] data-[state=checked]:text-black"
                  />
                  <Label htmlFor="terms" className="text-[#8B6914] text-sm">
                    أوافق على{" "}
                    <Button variant="link" className="text-[#B48500] p-0 h-auto">
                      الشروط والأحكام
                    </Button>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="privacy"
                    checked={formData.acceptPrivacy}
                    onCheckedChange={(checked) => handleInputChange("acceptPrivacy", checked as boolean)}
                    className="border-[#B48500] data-[state=checked]:bg-[#B48500] data-[state=checked]:text-black"
                  />
                  <Label htmlFor="privacy" className="text-[#8B6914] text-sm">
                    أوافق على{" "}
                    <Button variant="link" className="text-[#B48500] p-0 h-auto">
                      سياسة الخصوصية
                    </Button>
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#B48500]">
            <Button
              variant="outline"
              onClick={step === 1 ? onBack : () => setStep(step - 1)}
              className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
            >
              {step === 1 ? "العودة لتسجيل الدخول" : "السابق"}
            </Button>

            {step < 3 ? (
              <Button onClick={handleNext} className="bg-[#B48500] text-black hover:bg-[#8B6914]">
                التالي
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#B48500] text-black hover:bg-[#8B6914] flex items-center gap-2"
              >
                {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                <CreditCard className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
