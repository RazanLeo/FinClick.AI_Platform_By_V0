"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "user" | "admin" | "guest"
  companyName?: string
  subscriptionType?: string
  subscriptionStatus?: "active" | "expired" | "trial"
}

interface AuthContextType {
  user: User | null
  login: (userType: "user" | "admin" | "guest", credentials: any) => Promise<void>
  logout: () => void
  register: (userData: any) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("finclick_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (userType: "user" | "admin" | "guest", credentials: any) => {
    setIsLoading(true)
    try {
      let userData: User

      switch (userType) {
        case "admin":
          userData = {
            id: "admin-1",
            name: "Razan FinClick Admin",
            email: "Razan@FinClick.AI",
            type: "admin",
          }
          break
        case "guest":
          userData = {
            id: "guest-1",
            name: "Guest User",
            email: "Guest@FinClick.AI",
            type: "guest",
          }
          break
        default:
          userData = {
            id: `user-${Date.now()}`,
            name: credentials.email.split("@")[0],
            email: credentials.email,
            type: "user",
            subscriptionStatus: "trial",
          }
      }

      setUser(userData)

      // Don't save guest sessions
      if (userType !== "guest") {
        localStorage.setItem("finclick_user", JSON.stringify(userData))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    try {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        type: "user",
        companyName: userData.companyName,
        subscriptionType: userData.subscriptionType,
        subscriptionStatus: "active",
      }

      setUser(newUser)
      localStorage.setItem("finclick_user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("finclick_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
