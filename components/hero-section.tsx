"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, CreditCard } from "lucide-react"
import { useEffect, useRef } from "react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const rect = section.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    updateCanvasSize()

    const gridSize = 50
    const perspective = 600
    const rotationX = -0.2
    const rotationY = 0.05

    let time = 0

    function project3D(x: number, y: number, z: number) {
      const cosX = Math.cos(rotationX)
      const sinX = Math.sin(rotationX)
      const cosY = Math.cos(rotationY)
      const sinY = Math.sin(rotationY)

      const y1 = y * cosX - z * sinX
      const z1 = y * sinX + z * cosX
      const x1 = x * cosY + z1 * sinY
      const z2 = -x * sinY + z1 * cosY

      const scale = perspective / (perspective + z2)
      return {
        x: x1 * scale + canvas.width / 2,
        y: y1 * scale + canvas.height / 2,
        scale: scale,
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.003

      const centerX = 0
      const centerY = 0
      const centerZ = -150

      for (let i = -12; i <= 12; i++) {
        for (let j = -8; j <= 8; j++) {
          const x = i * gridSize
          const y = j * gridSize
          const z = Math.sin(time + i * 0.2 + j * 0.2) * 15

          const point = project3D(x + centerX, y + centerY, z + centerZ)

          if (point.scale > 0.2) {
            if (i < 12) {
              const nextPoint = project3D(
                (i + 1) * gridSize + centerX,
                y + centerY,
                Math.sin(time + (i + 1) * 0.2 + j * 0.2) * 15 + centerZ,
              )
              if (nextPoint.scale > 0.2) {
                const opacity = Math.min(point.scale, nextPoint.scale) * 0.5
                ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`
                ctx.lineWidth = Math.max(0.3, point.scale * 1.5)
                ctx.shadowColor = "rgba(255, 215, 0, 0.2)"
                ctx.shadowBlur = 2
                ctx.beginPath()
                ctx.moveTo(point.x, point.y)
                ctx.lineTo(nextPoint.x, nextPoint.y)
                ctx.stroke()
              }
            }

            if (j < 8) {
              const nextPoint = project3D(
                x + centerX,
                (j + 1) * gridSize + centerY,
                Math.sin(time + i * 0.2 + (j + 1) * 0.2) * 15 + centerZ,
              )
              if (nextPoint.scale > 0.2) {
                const opacity = Math.min(point.scale, nextPoint.scale) * 0.5
                ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`
                ctx.lineWidth = Math.max(0.3, point.scale * 1.5)
                ctx.shadowColor = "rgba(255, 215, 0, 0.2)"
                ctx.shadowBlur = 2
                ctx.beginPath()
                ctx.moveTo(point.x, point.y)
                ctx.lineTo(nextPoint.x, nextPoint.y)
                ctx.stroke()
              }
            }

            const nodeSize = Math.max(0.8, point.scale * 2.5)
            const nodeOpacity = point.scale * 0.7

            ctx.globalAlpha = nodeOpacity * 0.3
            ctx.fillStyle = "#FFD700"
            ctx.shadowColor = "#FFD700"
            ctx.shadowBlur = 6
            ctx.beginPath()
            ctx.arc(point.x, point.y, nodeSize * 1.8, 0, Math.PI * 2)
            ctx.fill()

            ctx.globalAlpha = nodeOpacity
            ctx.shadowBlur = 3
            ctx.fillStyle = "#FFF"
            ctx.beginPath()
            ctx.arc(point.x, point.y, nodeSize, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative py-20 overflow-hidden bg-black min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-25" style={{ zIndex: 1 }} />

      <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Image
              src="/images/finclick-logo.png"
              alt="FinClick.AI Logo"
              width={200}
              height={200}
              className="mx-auto animate-pulse-gold"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-[#B48500] mb-6">FinClick.AI</h1>

          <p className="text-2xl md:text-3xl text-[#8B6914] mb-8 font-semibold">منصة التحليل المالي الذكية الثورية</p>

          <p className="text-xl md:text-2xl text-[#B48500] mb-12 opacity-90">
            Revolutionary Intelligent Financial Analysis Platform
          </p>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-[#8B6914] leading-relaxed mb-6">
              ثورة ونقلة نوعية في عالم التحليل المالي - نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين
            </p>
            <p className="text-lg text-[#8B6914] leading-relaxed" data-hero-text2>
              تقديم 180+ نوع تحليل مالي كمي بالذكاء الاصطناعي في ثوانٍ معدودة
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-[#B48500] text-black hover:bg-[#8B6914] text-xl px-8 py-4">
              <Sparkles className="w-6 h-6 ml-2" />
              ابدأ التحليل الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black text-xl px-8 py-4"
              onClick={() => {
                const pricingSection = document.querySelector('[data-section="pricing"]')
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <CreditCard className="w-6 h-6 ml-2" />
              اشترك الآن
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B48500] mb-2">180+</div>
              <div className="text-[#8B6914]">نوع تحليل مالي</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B48500] mb-2">99%</div>
              <div className="text-[#8B6914]">دقة التحليل</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B48500] mb-2">3</div>
              <div className="text-[#8B6914]">خطوات بسيطة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
