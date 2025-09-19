"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Shield, Users, LogIn } from "lucide-react"

interface LoginFormProps {
  onLogin: (userType: "user" | "admin" | "guest", credentials: any) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form states for different account types
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  })

  const adminCredentials = {
    username: "Razan@FinClick.AI",
    password: "RazanFinClickAI@056300",
  }

  const guestCredentials = {
    username: "Guest@FinClick.AI",
    password: "GuestFinClickAI@123321",
  }

  const handleLogin = async (type: "user" | "admin" | "guest") => {
    setLoading(true)
    setError("")

    try {
      let credentials
      switch (type) {
        case "user":
          if (!userCredentials.email || !userCredentials.password) {
            throw new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور")
          }
          credentials = userCredentials
          break
        case "admin":
          credentials = adminCredentials
          break
        case "guest":
          credentials = guestCredentials
          break
      }

      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onLogin(type, credentials)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black border-[#B48500] shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-[#B48500] rounded-full flex items-center justify-center">
            <LogIn className="w-8 h-8 text-black" />
          </div>
          <CardTitle className="text-2xl text-[#B48500]">تسجيل الدخول</CardTitle>
          <p className="text-[#8B6914]">اختر نوع الحساب للدخول إلى المنصة</p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#1a1a1a] border border-[#B48500]">
              <TabsTrigger
                value="user"
                className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
              >
                <User className="w-4 h-4 ml-2" />
                مستخدم
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
              >
                <Shield className="w-4 h-4 ml-2" />
                إدارة
              </TabsTrigger>
              <TabsTrigger
                value="guest"
                className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
              >
                <Users className="w-4 h-4 ml-2" />
                ضيف
              </TabsTrigger>
            </TabsList>

            {error && (
              <Alert className="mt-4 border-red-500 bg-red-500/10">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            {/* User Login */}
            <TabsContent value="user" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="user-email" className="text-[#B48500]">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="example@email.com"
                  value={userCredentials.email}
                  onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                  className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-password" className="text-[#B48500]">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="user-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={userCredentials.password}
                    onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                    className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914] pl-10"
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
              <Button
                onClick={() => handleLogin("user")}
                disabled={loading}
                className="w-full bg-[#B48500] text-black hover:bg-[#8B6914] font-semibold"
              >
                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
              <div className="text-center">
                <Button variant="link" className="text-[#8B6914] hover:text-[#B48500]">
                  نسيت كلمة المرور؟
                </Button>
              </div>
            </TabsContent>

            {/* Admin Login */}
            <TabsContent value="admin" className="space-y-4 mt-6">
              <div className="bg-[#1a1a1a] border border-[#B48500] rounded-lg p-4 mb-4">
                <h4 className="text-[#B48500] font-semibold mb-2">حساب الإدارة</h4>
                <p className="text-[#8B6914] text-sm">
                  هذا الحساب مخصص لإدارة المنصة ومراقبة المستخدمين والتحكم في جميع العمليات
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-username" className="text-[#B48500]">
                  اسم المستخدم
                </Label>
                <Input
                  id="admin-username"
                  placeholder="أدخل اسم المستخدم للإدارة"
                  className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-[#B48500]">
                  كلمة المرور
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="أدخل كلمة المرور للإدارة"
                  className="bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914]"
                />
              </div>
              <Button
                onClick={() => handleLogin("admin")}
                disabled={loading}
                className="w-full bg-[#B48500] text-black hover:bg-[#8B6914] font-semibold"
              >
                {loading ? "جاري تسجيل الدخول..." : "دخول الإدارة"}
              </Button>
            </TabsContent>

            {/* Guest Login */}
            <TabsContent value="guest" className="space-y-4 mt-6">
              <div className="bg-[#1a1a1a] border border-[#B48500] rounded-lg p-4 mb-4">
                <h4 className="text-[#B48500] font-semibold mb-2">حساب الضيوف</h4>
                <p className="text-[#8B6914] text-sm">
                  حساب مجاني للتجربة بجميع المميزات. البيانات لا تُحفظ بعد إغلاق الجلسة
                </p>
              </div>
              <Button
                onClick={() => handleLogin("guest")}
                disabled={loading}
                className="w-full bg-[#B48500] text-black hover:bg-[#8B6914] font-semibold"
              >
                {loading ? "جاري تسجيل الدخول..." : "دخول كضيف"}
              </Button>
              <div className="text-center text-[#8B6914] text-sm">لا حاجة لإدخال بيانات - اضغط للدخول مباشرة</div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t border-[#B48500] text-center">
            <p className="text-[#8B6914] text-sm mb-2">ليس لديك حساب؟</p>
            <Button
              variant="outline"
              className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent"
            >
              إنشاء حساب جديد
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
