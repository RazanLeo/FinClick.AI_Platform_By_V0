import { AnalysisInterface } from "@/components/analysis/analysis-interface"
import { Header } from "@/components/header"

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-20">
        <AnalysisInterface />
      </div>
    </div>
  )
}
