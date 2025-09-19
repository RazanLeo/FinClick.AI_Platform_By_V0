"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  Target,
} from "lucide-react"

interface AnalysisResult {
  id: string
  type: string
  category: string
  status: "processing" | "completed" | "error"
  progress: number
  results?: any
  insights?: string[]
  recommendations?: string[]
  summary?: string
  score?: number
  riskLevel?: string
  error?: string
}

interface AnalysisEngineProps {
  files: any[]
  options: any
  onAnalysisComplete: (results: AnalysisResult[]) => void
}

export function AnalysisEngine({ files, options, onAnalysisComplete }: AnalysisEngineProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [currentStep, setCurrentStep] = useState("")
  const [overallProgress, setOverallProgress] = useState(0)

  const analysisTypes = {
    basic: {
      profitability: [
        { id: "gross_profit_margin", name: "تحليل هامش الربح الإجمالي", category: "تحليلات الربحية الأساسية" },
        { id: "net_profit_margin", name: "تحليل هامش الربح الصافي", category: "تحليلات الربحية الأساسية" },
        { id: "operating_profit_margin", name: "تحليل هامش الربح التشغيلي", category: "تحليلات الربحية الأساسية" },
        { id: "roa_analysis", name: "العائد على الأصول (ROA)", category: "تحليلات الربحية الأساسية" },
        { id: "roe_analysis", name: "العائد على حقوق الملكية (ROE)", category: "تحليلات الربحية الأساسية" },
        { id: "roi_analysis", name: "العائد على الاستثمار (ROI)", category: "تحليلات الربحية الأساسية" },
        { id: "ebit_analysis", name: "الأرباح قبل الفوائد والضرائب (EBIT)", category: "تحليلات الربحية الأساسية" },
        {
          id: "ebitda_analysis",
          name: "الأرباح قبل الفوائد والضرائب والإهلاك (EBITDA)",
          category: "تحليلات الربحية الأساسية",
        },
        { id: "pe_ratio", name: "نسبة السعر إلى الأرباح (P/E)", category: "تحليلات الربحية الأساسية" },
        { id: "eps_analysis", name: "ربحية السهم (EPS)", category: "تحليلات الربحية الأساسية" },
        { id: "revenue_growth", name: "معدل نمو الإيرادات", category: "تحليلات الربحية الأساسية" },
        { id: "profit_growth", name: "معدل نمو الأرباح", category: "تحليلات الربحية الأساسية" },
        { id: "cogs_analysis", name: "تحليل تكلفة البضاعة المباعة", category: "تحليلات الربحية الأساسية" },
        { id: "operating_expense", name: "تحليل المصروفات التشغيلية", category: "تحليلات الربحية الأساسية" },
        { id: "interest_coverage", name: "نسبة تغطية الفوائد", category: "تحليلات الربحية الأساسية" },
        { id: "dividend_yield", name: "تحليل عائد الأرباح الموزعة", category: "تحليلات الربحية الأساسية" },
        { id: "payout_ratio", name: "تحليل نسبة التوزيع", category: "تحليلات الربحية الأساسية" },
        { id: "retained_earnings", name: "تحليل الأرباح المحتجزة", category: "تحليلات الربحية الأساسية" },
        { id: "book_value_per_share", name: "القيمة الدفترية للسهم", category: "تحليلات الربحية الأساسية" },
        { id: "market_value", name: "تحليل القيمة السوقية", category: "تحليلات الربحية الأساسية" },
        { id: "revenue_per_employee", name: "الإيرادات لكل موظف", category: "تحليلات الربحية الأساسية" },
        { id: "profit_per_employee", name: "الربح لكل موظف", category: "تحليلات الربحية الأساسية" },
        { id: "asset_turnover_profit", name: "ربحية دوران الأصول", category: "تحليلات الربحية الأساسية" },
        { id: "sales_efficiency", name: "تحليل كفاءة المبيعات", category: "تحليلات الربحية الأساسية" },
        { id: "margin_stability", name: "تحليل استقرار الهوامش", category: "تحليلات الربحية الأساسية" },
      ],
      liquidity: [
        { id: "current_ratio", name: "نسبة السيولة الجارية", category: "تحليلات السيولة الأساسية" },
        { id: "quick_ratio", name: "نسبة السيولة السريعة", category: "تحليلات السيولة الأساسية" },
        { id: "cash_ratio", name: "نسبة السيولة النقدية", category: "تحليلات السيولة الأساسية" },
        { id: "working_capital", name: "تحليل رأس المال العامل", category: "تحليلات السيولة الأساسية" },
        { id: "cash_flow_analysis", name: "تحليل التدفقات النقدية", category: "تحليلات السيولة الأساسية" },
        { id: "operating_cash_flow_ratio", name: "نسبة التدفق النقدي التشغيلي", category: "تحليلات السيولة الأساسية" },
        { id: "cash_conversion_cycle", name: "دورة تحويل النقد", category: "تحليلات السيولة الأساسية" },
        { id: "days_sales_outstanding", name: "أيام المبيعات المستحقة (DSO)", category: "تحليلات السيولة الأساسية" },
        { id: "days_inventory_outstanding", name: "أيام المخزون المستحق (DIO)", category: "تحليلات السيولة الأساسية" },
        { id: "days_payable_outstanding", name: "أيام الدفع المستحقة (DPO)", category: "تحليلات السيولة الأساسية" },
        { id: "cash_position", name: "تحليل الوضع النقدي", category: "تحليلات السيولة الأساسية" },
        { id: "short_term_debt_coverage", name: "تغطية الديون قصيرة الأجل", category: "تحليلات السيولة الأساسية" },
        { id: "liquid_assets", name: "تحليل الأصول السائلة", category: "تحليلات السيولة الأساسية" },
        { id: "cash_flow_coverage", name: "نسبة تغطية التدفق النقدي", category: "تحليلات السيولة الأساسية" },
        { id: "operating_cash_flow", name: "تحليل التدفق النقدي التشغيلي", category: "تحليلات السيولة الأساسية" },
        { id: "free_cash_flow", name: "تحليل التدفق النقدي الحر", category: "تحليلات السيولة الأساسية" },
        { id: "cash_flow_margin", name: "هامش التدفق النقدي", category: "تحليلات السيولة الأساسية" },
        { id: "cash_flow_per_share", name: "التدفق النقدي للسهم", category: "تحليلات السيولة الأساسية" },
        { id: "liquidity_buffer", name: "تحليل احتياطي السيولة", category: "تحليلات السيولة الأساسية" },
        { id: "emergency_fund", name: "تحليل صندوق الطوارئ", category: "تحليلات السيولة الأساسية" },
      ],
      efficiency: [
        { id: "asset_turnover", name: "نسبة دوران الأصول", category: "تحليلات الكفاءة الأساسية" },
        { id: "inventory_turnover", name: "نسبة دوران المخزون", category: "تحليلات الكفاءة الأساسية" },
        { id: "receivables_turnover", name: "نسبة دوران المدينين", category: "تحليلات الكفاءة الأساسية" },
        { id: "payables_turnover", name: "نسبة دوران الدائنين", category: "تحليلات الكفاءة الأساسية" },
        { id: "fixed_asset_turnover", name: "دوران الأصول الثابتة", category: "تحليلات الكفاءة الأساسية" },
        { id: "total_asset_utilization", name: "استخدام إجمالي الأصول", category: "تحليلات الكفاءة الأساسية" },
        { id: "working_capital_turnover", name: "دوران رأس المال العامل", category: "تحليلات الكفاءة الأساسية" },
        { id: "sales_per_sqft", name: "المبيعات لكل متر مربع", category: "تحليلات الكفاءة الأساسية" },
        { id: "revenue_per_asset", name: "الإيرادات لكل أصل", category: "تحليلات الكفاءة الأساسية" },
        { id: "capacity_utilization", name: "تحليل استخدام الطاقة", category: "تحليلات الكفاءة الأساسية" },
        { id: "resource_allocation", name: "كفاءة تخصيص الموارد", category: "تحليلات الكفاءة الأساسية" },
        { id: "cost_efficiency", name: "تحليل كفاءة التكلفة", category: "تحليلات الكفاءة الأساسية" },
        { id: "operational_efficiency", name: "مقاييس الكفاءة التشغيلية", category: "تحليلات الكفاءة الأساسية" },
        { id: "process_efficiency", name: "تحليل كفاءة العمليات", category: "تحليلات الكفاءة الأساسية" },
        { id: "time_efficiency", name: "تحليل كفاءة الوقت", category: "تحليلات الكفاءة الأساسية" },
        { id: "labor_productivity", name: "تحليل إنتاجية العمالة", category: "تحليلات الكفاءة الأساسية" },
        { id: "capital_productivity", name: "تحليل إنتاجية رأس المال", category: "تحليلات الكفاءة الأساسية" },
        { id: "technology_efficiency", name: "كفاءة التكنولوجيا", category: "تحليلات الكفاءة الأساسية" },
        { id: "supply_chain_efficiency", name: "كفاءة سلسلة التوريد", category: "تحليلات الكفاءة الأساسية" },
        { id: "distribution_efficiency", name: "كفاءة التوزيع", category: "تحليلات الكفاءة الأساسية" },
      ],
      leverage: [
        { id: "debt_to_equity", name: "نسبة الدين إلى حقوق الملكية", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "debt_to_assets", name: "نسبة الدين إلى الأصول", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "debt_service_coverage", name: "نسبة تغطية خدمة الدين", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "times_interest_earned", name: "نسبة تغطية الفوائد", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "equity_multiplier", name: "مضاعف حقوق الملكية", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "financial_leverage", name: "نسبة الرافعة المالية", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "long_term_debt", name: "تحليل الديون طويلة الأجل", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "short_term_debt", name: "تحليل الديون قصيرة الأجل", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "total_debt", name: "تحليل إجمالي الديون", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "debt_maturity", name: "تحليل استحقاق الديون", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "credit_risk", name: "تحليل مخاطر الائتمان", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "borrowing_capacity", name: "تحليل القدرة على الاقتراض", category: "تحليلات الرافعة المالية الأساسية" },
        {
          id: "leverage_impact_roe",
          name: "تأثير الرافعة على العائد على حقوق الملكية",
          category: "تحليلات الرافعة المالية الأساسية",
        },
        { id: "debt_sustainability", name: "تحليل استدامة الديون", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "interest_rate_risk", name: "مخاطر أسعار الفائدة", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "refinancing_risk", name: "تحليل مخاطر إعادة التمويل", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "covenant_compliance", name: "تحليل الامتثال للشروط", category: "تحليلات الرافعة المالية الأساسية" },
        { id: "debt_structure", name: "تحليل هيكل الديون", category: "تحليلات الرافعة المالية الأساسية" },
        {
          id: "capital_structure_optimization",
          name: "تحسين هيكل رأس المال",
          category: "تحليلات الرافعة المالية الأساسية",
        },
        { id: "leverage_trend", name: "تحليل اتجاه الرافعة المالية", category: "تحليلات الرافعة المالية الأساسية" },
      ],
      growth: [
        { id: "revenue_growth_analysis", name: "تحليل نمو الإيرادات", category: "تحليلات النمو الأساسية" },
        { id: "profit_growth_analysis", name: "تحليل نمو الأرباح", category: "تحليلات النمو الأساسية" },
        { id: "asset_growth", name: "تحليل نمو الأصول", category: "تحليلات النمو الأساسية" },
        { id: "equity_growth", name: "تحليل نمو حقوق الملكية", category: "تحليلات النمو الأساسية" },
        { id: "market_share_growth", name: "نمو الحصة السوقية", category: "تحليلات النمو الأساسية" },
        { id: "customer_growth", name: "تحليل نمو العملاء", category: "تحليلات النمو الأساسية" },
        { id: "product_line_growth", name: "نمو خطوط الإنتاج", category: "تحليلات النمو الأساسية" },
        { id: "geographic_growth", name: "تحليل النمو الجغرافي", category: "تحليلات النمو الأساسية" },
        { id: "organic_growth", name: "تحليل النمو العضوي", category: "تحليلات النمو الأساسية" },
        { id: "acquisition_growth", name: "تحليل نمو الاستحواذ", category: "تحليلات النمو الأساسية" },
        { id: "sustainable_growth_rate", name: "معدل النمو المستدام", category: "تحليلات النمو الأساسية" },
        { id: "internal_growth_rate", name: "معدل النمو الداخلي", category: "تحليلات النمو الأساسية" },
        { id: "growth_sustainability", name: "تحليل استدامة النمو", category: "تحليلات النمو الأساسية" },
        { id: "growth_quality", name: "تحليل جودة النمو", category: "تحليلات النمو الأساسية" },
        { id: "growth_efficiency", name: "كفاءة النمو", category: "تحليلات النمو الأساسية" },
        { id: "market_expansion", name: "تحليل توسع السوق", category: "تحليلات النمو الأساسية" },
        { id: "competitive_growth", name: "تحليل النمو التنافسي", category: "تحليلات النمو الأساسية" },
        { id: "innovation_growth", name: "نمو الابتكار", category: "تحليلات النمو الأساسية" },
        { id: "digital_growth", name: "تحليل النمو الرقمي", category: "تحليلات النمو الأساسية" },
        { id: "international_growth", name: "النمو الدولي", category: "تحليلات النمو الأساسية" },
        { id: "future_growth_potential", name: "إمكانات النمو المستقبلي", category: "تحليلات النمو الأساسية" },
      ],
    },
    intermediate: {
      advanced_profitability: [
        { id: "eva_analysis", name: "القيمة الاقتصادية المضافة (EVA)", category: "تحليلات الربحية المتقدمة" },
        { id: "mva_analysis", name: "القيمة السوقية المضافة (MVA)", category: "تحليلات الربحية المتقدمة" },
        { id: "roic_analysis", name: "العائد على رأس المال المستثمر (ROIC)", category: "تحليلات الربحية المتقدمة" },
        { id: "cash_return_assets", name: "العائد النقدي على الأصول", category: "تحليلات الربحية المتقدمة" },
        { id: "operating_leverage", name: "تحليل الرافعة التشغيلية", category: "تحليلات الربحية المتقدمة" },
        { id: "financial_leverage_impact", name: "تأثير الرافعة المالية", category: "تحليلات الربحية المتقدمة" },
        { id: "profitability_trend", name: "تحليل اتجاه الربحية", category: "تحليلات الربحية المتقدمة" },
      ],
      risk_analysis: [
        { id: "var_analysis", name: "القيمة المعرضة للخطر (VaR)", category: "تحليلات المخاطر" },
        { id: "beta_analysis", name: "تحليل بيتا", category: "تحليلات المخاطر" },
        { id: "standard_deviation", name: "تحليل الانحراف المعياري", category: "تحليلات المخاطر" },
        { id: "sharpe_ratio", name: "تحليل نسبة شارب", category: "تحليلات المخاطر" },
        { id: "credit_risk_assessment", name: "تقييم مخاطر الائتمان", category: "تحليلات المخاطر" },
        { id: "market_risk", name: "تحليل مخاطر السوق", category: "تحليلات المخاطر" },
        { id: "operational_risk", name: "تحليل المخاطر التشغيلية", category: "تحليلات المخاطر" },
      ],
      valuation_analysis: [
        { id: "dcf_analysis", name: "التدفقات النقدية المخصومة (DCF)", category: "تحليلات التقييم" },
        { id: "npv_analysis", name: "صافي القيمة الحالية (NPV)", category: "تحليلات التقييم" },
        { id: "irr_analysis", name: "معدل العائد الداخلي (IRR)", category: "تحليلات التقييم" },
        { id: "payback_period", name: "تحليل فترة الاسترداد", category: "تحليلات التقييم" },
        { id: "modified_irr", name: "معدل العائد الداخلي المعدل", category: "تحليلات التقييم" },
        { id: "profitability_index", name: "مؤشر الربحية", category: "تحليلات التقييم" },
        { id: "terminal_value", name: "تحليل القيمة النهائية", category: "تحليلات التقييم" },
      ],
    },
    advanced: {
      strategic_analysis: [
        { id: "swot_financial", name: "التحليل المالي SWOT", category: "التحليل الاستراتيجي" },
        { id: "porter_five_forces", name: "التأثير المالي لقوى بورتر الخمس", category: "التحليل الاستراتيجي" },
        { id: "competitive_position", name: "تحليل الموقع التنافسي", category: "التحليل الاستراتيجي" },
        { id: "market_position_valuation", name: "تقييم الموقع السوقي", category: "التحليل الاستراتيجي" },
        { id: "strategic_asset", name: "تحليل الأصول الاستراتيجية", category: "التحليل الاستراتيجي" },
        { id: "core_competency_valuation", name: "تقييم الكفاءات الأساسية", category: "التحليل الاستراتيجي" },
        { id: "business_model", name: "تحليل نموذج الأعمال", category: "التحليل الاستراتيجي" },
        { id: "value_chain", name: "تحليل سلسلة القيمة", category: "التحليل الاستراتيجي" },
        { id: "strategic_option_valuation", name: "تقييم الخيارات الاستراتيجية", category: "التحليل الاستراتيجي" },
        { id: "scenario_analysis", name: "تحليل السيناريوهات", category: "التحليل الاستراتيجي" },
        { id: "sensitivity_analysis", name: "تحليل الحساسية", category: "التحليل الاستراتيجي" },
        { id: "monte_carlo", name: "محاكاة مونت كارلو", category: "التحليل الاستراتيجي" },
        { id: "real_options", name: "تحليل الخيارات الحقيقية", category: "التحليل الاستراتيجي" },
        { id: "strategic_investment", name: "تحليل الاستثمار الاستراتيجي", category: "التحليل الاستراتيجي" },
        { id: "merger_acquisition", name: "تحليل الاندماج والاستحواذ", category: "التحليل الاستراتيجي" },
        { id: "divestiture_analysis", name: "تحليل التصفية", category: "التحليل الاستراتيجي" },
        { id: "joint_venture", name: "تحليل المشاريع المشتركة", category: "التحليل الاستراتيجي" },
        { id: "strategic_partnership", name: "تقييم الشراكة الاستراتيجية", category: "التحليل الاستراتيجي" },
      ],
      advanced_modeling: [
        { id: "financial_forecasting", name: "نماذج التنبؤ المالي", category: "النمذجة المتقدمة" },
        { id: "regression_analysis", name: "تحليل الانحدار", category: "النمذجة المتقدمة" },
        { id: "time_series", name: "تحليل السلاسل الزمنية", category: "النمذجة المتقدمة" },
        { id: "correlation_analysis", name: "تحليل الارتباط", category: "النمذجة المتقدمة" },
        { id: "factor_analysis", name: "تحليل العوامل", category: "النمذجة المتقدمة" },
        { id: "principal_component", name: "تحليل المكونات الأساسية", category: "النمذجة المتقدمة" },
        { id: "machine_learning_predictions", name: "تنبؤات التعلم الآلي", category: "النمذجة المتقدمة" },
        { id: "neural_network", name: "تحليل الشبكات العصبية", category: "النمذجة المتقدمة" },
        { id: "predictive_analytics", name: "التحليلات التنبؤية", category: "النمذجة المتقدمة" },
        { id: "behavioral_finance", name: "تحليل التمويل السلوكي", category: "النمذجة المتقدمة" },
        { id: "market_anomaly_detection", name: "اكتشاف شذوذ السوق", category: "النمذجة المتقدمة" },
        { id: "pattern_recognition", name: "التعرف على الأنماط", category: "النمذجة المتقدمة" },
        { id: "algorithmic_trading", name: "تحليل التداول الخوارزمي", category: "النمذجة المتقدمة" },
        { id: "high_frequency_data", name: "تحليل البيانات عالية التردد", category: "النمذجة المتقدمة" },
        { id: "alternative_data", name: "تحليل البيانات البديلة", category: "النمذجة المتقدمة" },
        { id: "esg_impact", name: "تحليل تأثير ESG", category: "النمذجة المتقدمة" },
        { id: "sustainability_metrics", name: "مقاييس الاستدامة", category: "النمذجة المتقدمة" },
        { id: "carbon_footprint", name: "تقييم البصمة الكربونية", category: "النمذجة المتقدمة" },
      ],
      industry_specific: [
        { id: "banking_sector", name: "تحليل القطاع المصرفي", category: "التحليل القطاعي" },
        { id: "insurance_sector", name: "تحليل قطاع التأمين", category: "التحليل القطاعي" },
        { id: "real_estate", name: "تحليل العقارات", category: "التحليل القطاعي" },
        { id: "technology_sector", name: "تحليل قطاع التكنولوجيا", category: "التحليل القطاعي" },
        { id: "healthcare_sector", name: "تحليل قطاع الرعاية الصحية", category: "التحليل القطاعي" },
        { id: "energy_sector", name: "تحليل قطاع الطاقة", category: "التحليل القطاعي" },
        { id: "manufacturing", name: "تحليل التصنيع", category: "التحليل القطاعي" },
        { id: "retail_sector", name: "تحليل قطاع التجزئة", category: "التحليل القطاعي" },
        { id: "service_industry", name: "تحليل صناعة الخدمات", category: "التحليل القطاعي" },
        { id: "commodity_analysis", name: "تحليل السلع", category: "التحليل القطاعي" },
        { id: "currency_analysis", name: "تحليل العملات", category: "التحليل القطاعي" },
        { id: "bond_analysis", name: "تحليل السندات", category: "التحليل القطاعي" },
        { id: "equity_analysis", name: "تحليل الأسهم", category: "التحليل القطاعي" },
        { id: "derivatives_analysis", name: "تحليل المشتقات", category: "التحليل القطاعي" },
        { id: "alternative_investment", name: "تحليل الاستثمارات البديلة", category: "التحليل القطاعي" },
        { id: "private_equity", name: "تحليل الأسهم الخاصة", category: "التحليل القطاعي" },
        { id: "venture_capital", name: "تحليل رأس المال المخاطر", category: "التحليل القطاعي" },
      ],
    },
  }

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setOverallProgress(0)
    setAnalysisResults([])

    const analysesToRun: any[] = []

    if (options.analysisTypes.comprehensive) {
      // إضافة جميع التحليلات للمستوى الشامل
      Object.values(analysisTypes.basic)
        .flat()
        .forEach((analysis) => analysesToRun.push(analysis))
      Object.values(analysisTypes.intermediate)
        .flat()
        .forEach((analysis) => analysesToRun.push(analysis))
      Object.values(analysisTypes.advanced)
        .flat()
        .forEach((analysis) => analysesToRun.push(analysis))
    } else {
      // إضافة التحليلات بناءً على الأنواع المحددة
      if (options.analysisTypes.classical) {
        Object.values(analysisTypes.basic)
          .flat()
          .forEach((analysis) => analysesToRun.push(analysis))
      }
      if (options.analysisTypes.applied) {
        Object.values(analysisTypes.intermediate)
          .flat()
          .forEach((analysis) => analysesToRun.push(analysis))
      }
      if (options.analysisTypes.advanced) {
        Object.values(analysisTypes.advanced)
          .flat()
          .forEach((analysis) => analysesToRun.push(analysis))
      }
    }

    const initialResults: AnalysisResult[] = analysesToRun.map((analysis) => ({
      id: analysis.id,
      type: analysis.name,
      category: analysis.category,
      status: "processing",
      progress: 0,
    }))

    setAnalysisResults(initialResults)

    try {
      console.log("[v0] Starting analysis with options:", options)
      console.log("[v0] Files to analyze:", files)
      console.log("[v0] Analyses to run:", analysesToRun.length)

      setCurrentStep(`جاري إرسال البيانات للتحليل بالذكاء الاصطناعي...`)

      const selectedAnalysisTypes: string[] = []

      if (options.analysisTypes.comprehensive) {
        selectedAnalysisTypes.push(
          "profitability",
          "liquidity",
          "efficiency",
          "leverage",
          "growth",
          "risk",
          "valuation",
          "strategic",
          "modeling",
          "industry",
        )
      } else {
        if (options.analysisTypes.classical) {
          selectedAnalysisTypes.push("profitability", "liquidity", "efficiency", "leverage", "growth")
        }
        if (options.analysisTypes.applied) {
          selectedAnalysisTypes.push("risk", "valuation")
        }
        if (options.analysisTypes.advanced) {
          selectedAnalysisTypes.push("strategic", "modeling", "industry")
        }
      }

      let analysisLevel = "basic"
      if (options.analysisTypes.comprehensive) {
        analysisLevel = "comprehensive"
      } else if (options.analysisTypes.advanced) {
        analysisLevel = "advanced"
      } else if (options.analysisTypes.applied) {
        analysisLevel = "intermediate"
      }

      const requestBody = {
        fileData: files,
        analysisTypes: selectedAnalysisTypes,
        analysisLevel: analysisLevel,
        companyInfo: {
          name: options.companyName,
          sector: options.sector,
          activity: options.activity,
          legalEntity: options.legalEntity,
          analysisYears: options.analysisYears,
          comparisonLevel: options.comparisonLevel,
          language: options.language,
        },
      }

      console.log("[v0] Request body:", requestBody)

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response ok:", response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] API Error Response:", errorText)
        throw new Error(`فشل في التحليل: ${response.status} - ${errorText}`)
      }

      const aiResults = await response.json()
      console.log("[v0] AI Results received:", aiResults)

      if (!aiResults || typeof aiResults !== "object") {
        throw new Error("استجابة غير صحيحة من خدمة التحليل")
      }

      setAnalysisResults((prev) =>
        prev.map((result) => ({
          ...result,
          status: "completed" as const,
          progress: 100,
          results: aiResults.detailedAnalysis || {},
          insights: aiResults.keyFindings || [],
          recommendations: aiResults.recommendations || [],
          summary: aiResults.summary || "تم إكمال التحليل",
          score: aiResults.score || 0,
          riskLevel: aiResults.riskLevel || "medium",
        })),
      )

      setOverallProgress(100)
      setCurrentStep(`تم إكمال ${analysesToRun.length} تحليل مالي بنجاح`)
      onAnalysisComplete(initialResults)
    } catch (error) {
      console.error("[v0] Analysis error details:", error)
      console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))

      setAnalysisResults((prev) =>
        prev.map((result) => ({
          ...result,
          status: "error" as const,
          progress: 0,
          error: error instanceof Error ? error.message : "حدث خطأ غير معروف",
        })),
      )
      setCurrentStep(`حدث خطأ في التحليل: ${error instanceof Error ? error.message : "خطأ غير معروف"}`)
    }

    setIsAnalyzing(false)
  }

  const generateMockResults = (analysisId: string) => {
    const baseResults = {
      value: Math.random() * 100,
      trend: Math.random() > 0.5 ? "increasing" : "decreasing",
      benchmark: Math.random() * 100,
      industryAverage: Math.random() * 100,
    }

    switch (analysisId) {
      case "gross_profit_margin":
        return { ...baseResults, percentage: Math.random() * 30 + 10 }
      case "current_ratio":
        return { ...baseResults, ratio: Math.random() * 2 + 1 }
      case "debt_to_equity":
        return { ...baseResults, ratio: Math.random() * 1.5 + 0.5 }
      default:
        return baseResults
    }
  }

  const generateInsights = (analysisId: string): string[] => {
    const insights = [
      "الأداء المالي يظهر تحسناً مستمراً خلال الفترة المحللة",
      "المؤشرات تشير إلى استقرار في الوضع المالي للشركة",
      "هناك فرص لتحسين الكفاءة التشغيلية",
      "النسب المالية ضمن المعدلات الطبيعية للقطاع",
      "التدفقات النقدية تظهر نمطاً إيجابياً",
    ]
    return insights.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  const generateRecommendations = (analysisId: string): string[] => {
    const recommendations = [
      "تحسين إدارة رأس المال العامل لزيادة السيولة",
      "تنويع مصادر الإيرادات لتقليل المخاطر",
      "الاستثمار في التكنولوجيا لتحسين الكفاءة",
      "مراجعة هيكل التكاليف لتحسين الهوامش",
      "تطوير استراتيجيات النمو طويلة المدى",
    ]
    return recommendations.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  const generateSummary = (analysisId: string): string => {
    const summaries = [
      "التحليل يظهر أداءً مالياً قوياً مع إمكانيات للتحسين",
      "المؤشرات المالية تشير إلى استقرار وصحة مالية جيدة",
      "هناك نقاط قوة واضحة مع بعض المجالات التي تحتاج تطوير",
      "الوضع المالي العام إيجابي مع توصيات للنمو المستدام",
    ]
    return summaries[Math.floor(Math.random() * summaries.length)]
  }

  const getRiskLevel = (): string => {
    const levels = ["منخفض", "متوسط", "مرتفع"]
    const weights = [0.6, 0.3, 0.1] // 60% منخفض، 30% متوسط، 10% مرتفع
    const random = Math.random()
    let cumulative = 0

    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i]
      if (random <= cumulative) {
        return levels[i]
      }
    }
    return levels[0]
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "منخفض":
        return "text-green-500"
      case "متوسط":
        return "text-yellow-500"
      case "مرتفع":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const completedAnalyses = analysisResults.filter((a) => a.status === "completed")
  const processingAnalyses = analysisResults.filter((a) => a.status === "processing")
  const errorAnalyses = analysisResults.filter((a) => a.status === "error")

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <Card className="bg-black border-[#B48500]">
        <CardHeader>
          <CardTitle className="text-[#B48500] flex items-center gap-2">
            <Brain className="w-6 h-6 animate-pulse" />
            محرك التحليل المالي الذكي
          </CardTitle>
          <p className="text-[#8B6914]">تحليل {analysisResults.length} نوع من التحليلات المالية المتقدمة</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Overall Progress */}
            <div>
              <div className="flex justify-between text-sm text-[#B48500] mb-2">
                <span>التقدم العام</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
              <p className="text-[#8B6914] text-sm mt-2">{currentStep}</p>
            </div>

            {/* Analysis Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-[#8B6914]">
                <div className="text-2xl font-bold text-[#B48500]">{analysisResults.length}</div>
                <div className="text-[#8B6914] text-sm">إجمالي التحليلات</div>
              </div>
              <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-[#8B6914]">
                <div className="text-2xl font-bold text-green-500">{completedAnalyses.length}</div>
                <div className="text-[#8B6914] text-sm">مكتملة</div>
              </div>
              <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-[#8B6914]">
                <div className="text-2xl font-bold text-yellow-500">{processingAnalyses.length}</div>
                <div className="text-[#8B6914] text-sm">قيد المعالجة</div>
              </div>
              <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-[#8B6914]">
                <div className="text-2xl font-bold text-red-500">{errorAnalyses.length}</div>
                <div className="text-[#8B6914] text-sm">أخطاء</div>
              </div>
            </div>

            {/* Start Analysis Button */}
            {!isAnalyzing && analysisResults.length === 0 && (
              <Button
                onClick={startAnalysis}
                className="w-full bg-[#B48500] text-black hover:bg-[#8B6914] text-lg py-6 font-bold"
              >
                <Sparkles className="w-6 h-6 ml-2" />
                بدء التحليل المالي الذكي
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResults.length > 0 && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-[#1a1a1a] border border-[#B48500]">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <BarChart3 className="w-4 h-4 ml-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <CheckCircle className="w-4 h-4 ml-2" />
              مكتملة ({completedAnalyses.length})
            </TabsTrigger>
            <TabsTrigger
              value="processing"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <Clock className="w-4 h-4 ml-2" />
              قيد المعالجة ({processingAnalyses.length})
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="data-[state=active]:bg-[#B48500] data-[state=active]:text-black text-[#B48500]"
            >
              <Target className="w-4 h-4 ml-2" />
              الرؤى والتوصيات
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-4">
              {Object.entries(
                analysisResults.reduce(
                  (acc, analysis) => {
                    if (!acc[analysis.category]) {
                      acc[analysis.category] = []
                    }
                    acc[analysis.category].push(analysis)
                    return acc
                  },
                  {} as Record<string, AnalysisResult[]>,
                ),
              ).map(([category, analyses]) => (
                <Card key={category} className="bg-black border-[#B48500]">
                  <CardHeader>
                    <CardTitle className="text-[#B48500] text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {analyses.map((analysis) => (
                        <div
                          key={analysis.id}
                          className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#8B6914]"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(analysis.status)}
                            <span className="text-[#B48500] text-sm">{analysis.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {analysis.status === "completed" && analysis.score && (
                              <Badge className="bg-[#B48500] text-black">{Math.round(analysis.score)}%</Badge>
                            )}
                            {analysis.status === "completed" && analysis.riskLevel && (
                              <Badge className={`${getRiskColor(analysis.riskLevel)} border-current`} variant="outline">
                                {analysis.riskLevel}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed">
            <div className="space-y-4">
              {completedAnalyses.map((analysis) => (
                <Card key={analysis.id} className="bg-black border-[#B48500]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#B48500] text-lg">{analysis.type}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#B48500] text-black">
                          {analysis.score ? Math.round(analysis.score) : 0}%
                        </Badge>
                        {analysis.riskLevel && (
                          <Badge className={`${getRiskColor(analysis.riskLevel)} border-current`} variant="outline">
                            {analysis.riskLevel}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-[#8B6914] text-sm">{analysis.category}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.summary && (
                        <div>
                          <h4 className="text-[#B48500] font-semibold mb-2">الملخص</h4>
                          <p className="text-[#8B6914] text-sm">{analysis.summary}</p>
                        </div>
                      )}

                      {analysis.insights && analysis.insights.length > 0 && (
                        <div>
                          <h4 className="text-[#B48500] font-semibold mb-2">الرؤى الرئيسية</h4>
                          <ul className="space-y-1">
                            {analysis.insights.map((insight, index) => (
                              <li key={index} className="text-[#8B6914] text-sm flex items-start gap-2">
                                <span className="text-[#B48500] mt-1">•</span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent"
                        >
                          <Eye className="w-4 h-4 ml-2" />
                          عرض التفاصيل
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent"
                        >
                          <Download className="w-4 h-4 ml-2" />
                          تحميل التقرير
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Processing Tab */}
          <TabsContent value="processing">
            <div className="space-y-4">
              {processingAnalyses.map((analysis) => (
                <Card key={analysis.id} className="bg-black border-[#B48500]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-yellow-500 animate-spin" />
                        <div>
                          <h4 className="text-[#B48500] font-semibold">{analysis.type}</h4>
                          <p className="text-[#8B6914] text-sm">{analysis.category}</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500 text-black">قيد المعالجة</Badge>
                    </div>
                    <Progress value={analysis.progress} className="mt-3 h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="space-y-6">
              {/* Overall Insights */}
              <Card className="bg-black border-[#B48500]">
                <CardHeader>
                  <CardTitle className="text-[#B48500]">الرؤى العامة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-[#1a1a1a] rounded-lg border border-[#8B6914]">
                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-[#B48500]">
                          {Math.round(
                            completedAnalyses.reduce((acc, a) => acc + (a.score || 0), 0) / completedAnalyses.length,
                          ) || 0}
                          %
                        </div>
                        <div className="text-[#8B6914] text-sm">متوسط الأداء العام</div>
                      </div>
                      <div className="text-center p-4 bg-[#1a1a1a] rounded-lg border border-[#8B6914]">
                        <Target className="w-8 h-8 text-[#B48500] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-[#B48500]">
                          {completedAnalyses.filter((a) => a.riskLevel === "منخفض").length}
                        </div>
                        <div className="text-[#8B6914] text-sm">تحليلات منخفضة المخاطر</div>
                      </div>
                      <div className="text-center p-4 bg-[#1a1a1a] rounded-lg border border-[#8B6914]">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-[#B48500]">
                          {Math.round((completedAnalyses.length / analysisResults.length) * 100)}%
                        </div>
                        <div className="text-[#8B6914] text-sm">معدل الإكمال</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Recommendations */}
              <Card className="bg-black border-[#B48500]">
                <CardHeader>
                  <CardTitle className="text-[#B48500]">أهم التوصيات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {completedAnalyses
                      .filter((a) => a.recommendations && a.recommendations.length > 0)
                      .slice(0, 5)
                      .map((analysis, index) => (
                        <div key={analysis.id} className="p-3 bg-[#1a1a1a] rounded-lg border border-[#8B6914]">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#B48500] rounded-full flex items-center justify-center text-black text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-[#B48500] font-semibold text-sm mb-1">{analysis.type}</h4>
                              <p className="text-[#8B6914] text-sm">
                                {analysis.recommendations?.[0] || "لا توجد توصيات متاحة"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
