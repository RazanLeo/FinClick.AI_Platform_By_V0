"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useAuth } from "@/components/auth/auth-provider"

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  const handleLogin = async (userType: "user" | "admin" | "guest", credentials: any) => {
    await login(userType, credentials)

    // Redirect based on user type
    switch (userType) {
      case "admin":
        router.push("/admin")
        break
      case "guest":
      case "user":
        router.push("/dashboard")
        break
    }
  }

  const handleRegister = async (userData: any) => {
    await register(userData)
    router.push("/dashboard")
  }

  if (showRegister) {
    return <RegisterForm onRegister={handleRegister} onBack={() => setShowRegister(false)} />
  }

  return <LoginForm onLogin={handleLogin} />
}
