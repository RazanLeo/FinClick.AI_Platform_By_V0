import { Header } from "@/components/header"
import { StockTicker } from "@/components/stock-ticker"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { BeneficiariesSection } from "@/components/beneficiaries-section"
import { StepsSection } from "@/components/steps-section"
import { AnalysisTypesSection } from "@/components/analysis-types-section"
import { FreeToolsSection } from "@/components/free-tools-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { CompanyModal } from "@/components/company-modal"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <StockTicker />
      <HeroSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <BeneficiariesSection />
      <section id="steps">
        <StepsSection />
      </section>
      <section id="analysis-types">
        <AnalysisTypesSection />
      </section>
      <div data-section="free-tools">
        <FreeToolsSection />
      </div>
      <div data-section="testimonials">
        <TestimonialsSection />
      </div>
      <div data-section="pricing">
        <PricingSection />
      </div>
      <Footer />
      <CompanyModal />
    </div>
  )
}
