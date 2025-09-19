"use client"

import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/components/auth/auth-provider"
import { useEffect } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { user, login } = useAuth()

  useEffect(() => {
    if (user) {
      // Redirect based on user type
      switch (user.type) {
        case "admin":
          router.push("/admin")
          break
        case "guest":
        case "user":
          router.push("/dashboard")
          break
        default:
          router.push("/")
      }
    }
  }, [user, router])

  const handleLogin = async (userType: "user" | "admin" | "guest", credentials: any) => {
    await login(userType, credentials)
  }

  return <LoginForm onLogin={handleLogin} />
}
