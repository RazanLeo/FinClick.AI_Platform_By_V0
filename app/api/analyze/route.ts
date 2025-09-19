import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

// Schema for financial analysis results
const AnalysisResultSchema = z.object({
  summary: z.string(),
  keyFindings: z.array(z.string()),
  recommendations: z.array(z.string()),
  riskLevel: z.enum(["منخفض", "متوسط", "مرتفع"]),
  score: z.number().min(0).max(100),
  detailedAnalysis: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      nameEn: z.string(),
      category: z.enum(["التصنيف الأساسي", "التصنيف التطبيقي", "التصنيف المتقدم"]),
      subcategory: z.string(),
      value: z.number(),
      formula: z.string(),
      interpretation: z.string(),
      benchmark: z.string(),
      status: z.enum(["ممتاز", "جيد", "متوسط", "سيء", "حرج"]),
      description: z.string(),
      calculation: z.string(),
      recommendations: z.array(z.string()),
      riskLevel: z.enum(["منخفض", "متوسط", "مرتفع"]),
      confidence: z.number().min(0).max(100),
    }),
  ),
})

// Complete list of 180 financial analyses
const FINANCIAL_ANALYSES = {
  basic: [
    // Profitability Analysis (25 analyses)
    "Gross Profit Margin Analysis",
    "Net Profit Margin Analysis",
    "Operating Profit Margin Analysis",
    "Return on Assets (ROA)",
    "Return on Equity (ROE)",
    "Return on Investment (ROI)",
    "Earnings Before Interest and Taxes (EBIT)",
    "Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)",
    "Price-to-Earnings Ratio (P/E)",
    "Earnings Per Share (EPS)",
    "Revenue Growth Rate",
    "Profit Growth Rate",
    "Cost of Goods Sold Analysis",
    "Operating Expense Analysis",
    "Interest Coverage Ratio",
    "Dividend Yield Analysis",
    "Payout Ratio Analysis",
    "Retained Earnings Analysis",
    "Book Value Per Share",
    "Market Value Analysis",
    "Revenue Per Employee",
    "Profit Per Employee",
    "Asset Turnover Profitability",
    "Sales Efficiency Analysis",
    "Margin Stability Analysis",

    // Liquidity Analysis (20 analyses)
    "Current Ratio Analysis",
    "Quick Ratio Analysis",
    "Cash Ratio Analysis",
    "Working Capital Analysis",
    "Cash Flow Analysis",
    "Operating Cash Flow Ratio",
    "Cash Conversion Cycle",
    "Days Sales Outstanding (DSO)",
    "Days Inventory Outstanding (DIO)",
    "Days Payable Outstanding (DPO)",
    "Cash Position Analysis",
    "Short-term Debt Coverage",
    "Liquid Assets Analysis",
    "Cash Flow Coverage Ratio",
    "Operating Cash Flow Analysis",
    "Free Cash Flow Analysis",
    "Cash Flow Margin",
    "Cash Flow Per Share",
    "Liquidity Buffer Analysis",
    "Emergency Fund Analysis",

    // Efficiency Analysis (20 analyses)
    "Asset Turnover Ratio",
    "Inventory Turnover Ratio",
    "Receivables Turnover Ratio",
    "Payables Turnover Ratio",
    "Fixed Asset Turnover",
    "Total Asset Utilization",
    "Working Capital Turnover",
    "Sales Per Square Foot",
    "Revenue Per Asset",
    "Capacity Utilization Analysis",
    "Resource Allocation Efficiency",
    "Cost Efficiency Analysis",
    "Operational Efficiency Metrics",
    "Process Efficiency Analysis",
    "Time Efficiency Analysis",
    "Labor Productivity Analysis",
    "Capital Productivity Analysis",
    "Technology Efficiency",
    "Supply Chain Efficiency",
    "Distribution Efficiency",

    // Leverage Analysis (20 analyses)
    "Debt-to-Equity Ratio",
    "Debt-to-Assets Ratio",
    "Debt Service Coverage Ratio",
    "Times Interest Earned Ratio",
    "Equity Multiplier",
    "Financial Leverage Ratio",
    "Long-term Debt Analysis",
    "Short-term Debt Analysis",
    "Total Debt Analysis",
    "Debt Maturity Analysis",
    "Credit Risk Analysis",
    "Borrowing Capacity Analysis",
    "Leverage Impact on ROE",
    "Debt Sustainability Analysis",
    "Interest Rate Risk",
    "Refinancing Risk Analysis",
    "Covenant Compliance Analysis",
    "Debt Structure Analysis",
    "Capital Structure Optimization",
    "Leverage Trend Analysis",

    // Growth Analysis (21 analyses)
    "Revenue Growth Analysis",
    "Profit Growth Analysis",
    "Asset Growth Analysis",
    "Equity Growth Analysis",
    "Market Share Growth",
    "Customer Growth Analysis",
    "Product Line Growth",
    "Geographic Growth Analysis",
    "Organic Growth Analysis",
    "Acquisition Growth Analysis",
    "Sustainable Growth Rate",
    "Internal Growth Rate",
    "Growth Sustainability Analysis",
    "Growth Quality Analysis",
    "Growth Efficiency",
    "Market Expansion Analysis",
    "Competitive Growth Analysis",
    "Innovation Growth",
    "Digital Growth Analysis",
    "International Growth",
    "Future Growth Potential",
  ],

  intermediate: [
    // Advanced Profitability (7 analyses)
    "Economic Value Added (EVA)",
    "Market Value Added (MVA)",
    "Return on Invested Capital (ROIC)",
    "Cash Return on Assets",
    "Operating Leverage Analysis",
    "Financial Leverage Impact",
    "Profitability Trend Analysis",

    // Risk Analysis (7 analyses)
    "Value at Risk (VaR)",
    "Beta Analysis",
    "Standard Deviation Analysis",
    "Sharpe Ratio Analysis",
    "Credit Risk Assessment",
    "Market Risk Analysis",
    "Operational Risk Analysis",

    // Valuation Analysis (7 analyses)
    "Discounted Cash Flow (DCF)",
    "Net Present Value (NPV)",
    "Internal Rate of Return (IRR)",
    "Payback Period Analysis",
    "Modified IRR",
    "Profitability Index",
    "Terminal Value Analysis",
  ],

  advanced: [
    // Strategic Analysis (18 analyses)
    "SWOT Financial Analysis",
    "Porter Five Forces Financial Impact",
    "Competitive Position Analysis",
    "Market Position Valuation",
    "Strategic Asset Analysis",
    "Core Competency Valuation",
    "Business Model Analysis",
    "Value Chain Analysis",
    "Strategic Option Valuation",
    "Scenario Analysis",
    "Sensitivity Analysis",
    "Monte Carlo Simulation",
    "Real Options Analysis",
    "Strategic Investment Analysis",
    "Merger & Acquisition Analysis",
    "Divestiture Analysis",
    "Joint Venture Analysis",
    "Strategic Partnership Valuation",

    // Advanced Modeling (18 analyses)
    "Financial Forecasting Models",
    "Regression Analysis",
    "Time Series Analysis",
    "Correlation Analysis",
    "Factor Analysis",
    "Principal Component Analysis",
    "Machine Learning Predictions",
    "Neural Network Analysis",
    "Predictive Analytics",
    "Behavioral Finance Analysis",
    "Market Anomaly Detection",
    "Pattern Recognition",
    "Algorithmic Trading Analysis",
    "High-Frequency Data Analysis",
    "Alternative Data Analysis",
    "ESG Impact Analysis",
    "Sustainability Metrics",
    "Carbon Footprint Valuation",

    // Industry-Specific Analysis (17 analyses)
    "Banking Sector Analysis",
    "Insurance Sector Analysis",
    "Real Estate Analysis",
    "Technology Sector Analysis",
    "Healthcare Sector Analysis",
    "Energy Sector Analysis",
    "Manufacturing Analysis",
    "Retail Sector Analysis",
    "Service Industry Analysis",
    "Commodity Analysis",
    "Currency Analysis",
    "Bond Analysis",
    "Equity Analysis",
    "Derivatives Analysis",
    "Alternative Investment Analysis",
    "Private Equity Analysis",
    "Venture Capital Analysis",
  ],
}

let groqClient: any = null

function getGroqClient() {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      throw new Error(
        "Groq API key is missing. Pass it using the 'apiKey' parameter or the GROQ_API_KEY environment variable.",
      )
    }
    console.log("[v0] Creating Groq client with API key:", apiKey.substring(0, 10) + "...")
    groqClient = createGroq({
      apiKey: apiKey,
    })
  }
  return groqClient
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting analysis request")

    if (!process.env.GROQ_API_KEY) {
      console.error("[v0] GROQ_API_KEY environment variable is not set")
      return NextResponse.json(
        {
          error:
            "Groq API key is missing. Pass it using the 'apiKey' parameter or the GROQ_API_KEY environment variable.",
        },
        { status: 500 },
      )
    }

    const body = await request.json()
    console.log("[v0] Request body received:", JSON.stringify(body, null, 2))

    const { fileData, analysisTypes, analysisLevel, companyInfo } = body

    if (!fileData || !analysisTypes || !analysisLevel) {
      console.error("[v0] Missing required parameters:", {
        fileData: !!fileData,
        analysisTypes: !!analysisTypes,
        analysisLevel: !!analysisLevel,
      })
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const selectedAnalyses = getSelectedAnalyses(analysisTypes, analysisLevel)
    console.log("[v0] Selected analyses count:", selectedAnalyses.length)

    const analysisPrompt = `
أنت محلل مالي خبير متخصص في التحليل المالي المتقدم. قم بتحليل البيانات المالية المقدمة وتنفيذ التحليلات المالية المحددة بدقة.

بيانات الشركة:
${companyInfo ? JSON.stringify(companyInfo, null, 2) : "غير متوفرة"}

البيانات المالية:
${JSON.stringify(fileData, null, 2)}

التحليلات المالية المطلوب تنفيذها (${selectedAnalyses.length} تحليل):
${selectedAnalyses.map((analysis, index) => `${index + 1}. ${analysis}`).join("\n")}

لكل تحليل من التحليلات المذكورة في القائمة أعلاه، قم بتنفيذه وتقديم النتائج وفق القالب التالي:
{
  "id": "معرف فريد للتحليل",
  "name": "اسم التحليل بالعربية", 
  "nameEn": "اسم التحليل بالإنجليزية",
  "category": "التصنيف الأساسي أو التطبيقي أو المتقدم",
  "subcategory": "التصنيف الفرعي (مثل: الربحية، السيولة، الكفاءة، إلخ)",
  "value": "القيمة المحسوبة رقمياً",
  "formula": "المعادلة الرياضية المستخدمة",
  "interpretation": "تفسير مفصل للنتيجة وما تعنيه",
  "benchmark": "المعيار المرجعي للمقارنة",
  "status": "تقييم الأداء: ممتاز/جيد/متوسط/سيء/حرج",
  "description": "وصف تفصيلي للتحليل وأهميته",
  "calculation": "الحساب التفصيلي مع الأرقام الفعلية",
  "recommendations": ["قائمة بالتوصيات المحددة والقابلة للتنفيذ"],
  "riskLevel": "مستوى المخاطر: منخفض/متوسط/مرتفع",
  "confidence": "مستوى الثقة في النتيجة من 0 إلى 100"
}

متطلبات التحليل:
1. استخدم البيانات المالية المقدمة لحساب كل تحليل بدقة
2. قدم حسابات رقمية دقيقة مع إظهار الخطوات
3. فسر النتائج في السياق المالي والاقتصادي
4. قارن النتائج مع المعايير الصناعية المناسبة
5. قدم توصيات عملية وقابلة للتنفيذ
6. ركز فقط على التحليل المالي - لا تذكر الموظفين أو الإدارة
7. استخدم اللغة العربية في جميع النتائج
8. تأكد من دقة الحسابات الرياضية والنسب المالية

يجب تنفيذ جميع التحليلات المذكورة في القائمة أعلاه بدون استثناء.
    `

    console.log("[v0] Starting AI analysis with Groq")

    const client = getGroqClient()

    const result = await generateObject({
      model: client("llama-3.3-70b-versatile"),
      prompt: analysisPrompt,
      schema: AnalysisResultSchema,
    })

    console.log("[v0] AI analysis completed successfully")
    console.log("[v0] Result object:", result.object)

    const analysisResult = {
      ...result.object,
      metadata: {
        analysisCount: selectedAnalyses.length,
        analysisLevel,
        analysisTypes,
        selectedAnalyses: selectedAnalyses.slice(0, 10), // Only first 10 for brevity
        timestamp: new Date().toISOString(),
        model: "llama-3.3-70b-versatile",
        companyInfo,
      },
    }

    console.log("[v0] Returning analysis result")
    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error("[v0] Analysis error details:", error)
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")

    if (error instanceof Error) {
      if (error.message.includes("API key") || error.message.includes("GROQ_API_KEY")) {
        return NextResponse.json(
          {
            error:
              "Groq API key is missing. Pass it using the 'apiKey' parameter or the GROQ_API_KEY environment variable.",
          },
          { status: 500 },
        )
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json({ error: "AI service rate limit exceeded. Please try again later." }, { status: 429 })
      }
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Analysis timeout. Please try with smaller data or try again later." },
          { status: 408 },
        )
      }
    }

    return NextResponse.json(
      {
        error: `Analysis error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      },
      { status: 500 },
    )
  }
}

function getSelectedAnalyses(analysisTypes: string[], analysisLevel: string): string[] {
  const selectedAnalyses: string[] = []

  if (analysisLevel === "basic" || analysisLevel === "comprehensive") {
    analysisTypes.forEach((type) => {
      if (type === "profitability") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(0, 25))
      if (type === "liquidity") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(25, 45))
      if (type === "efficiency") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(45, 65))
      if (type === "leverage") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(65, 85))
      if (type === "growth") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(85, 106))
    })
  }

  if (analysisLevel === "intermediate" || analysisLevel === "comprehensive") {
    analysisTypes.forEach((type) => {
      if (type === "profitability") selectedAnalyses.push(...FINANCIAL_ANALYSES.intermediate.slice(0, 7))
      if (type === "risk") selectedAnalyses.push(...FINANCIAL_ANALYSES.intermediate.slice(7, 14))
      if (type === "valuation") selectedAnalyses.push(...FINANCIAL_ANALYSES.intermediate.slice(14, 21))
    })
  }

  if (analysisLevel === "advanced" || analysisLevel === "comprehensive") {
    analysisTypes.forEach((type) => {
      if (type === "strategic") selectedAnalyses.push(...FINANCIAL_ANALYSES.advanced.slice(0, 18))
      if (type === "modeling") selectedAnalyses.push(...FINANCIAL_ANALYSES.advanced.slice(18, 36))
      if (type === "industry") selectedAnalyses.push(...FINANCIAL_ANALYSES.advanced.slice(36, 53))
    })
  }

  return [...new Set(selectedAnalyses)]
}
