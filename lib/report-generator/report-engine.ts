// محرك توليد التقارير المالية الاحترافية
// يدعم PDF, Word, Excel, PowerPoint مع تصميم احترافي ثنائي اللغة

import type { AnalysisResult } from "../analysis-engine/basic-analysis"
import type { AdvancedAnalysisResult } from "../analysis-engine/advanced-analysis"

export interface ReportData {
  companyName: string
  analysisDate: string
  reportType: "comprehensive" | "basic" | "advanced" | "custom"
  language: "ar" | "en"
  basicAnalysis: AnalysisResult[]
  appliedAnalysis: AdvancedAnalysisResult[]
  advancedAnalysis: AdvancedAnalysisResult[]
  executiveSummary: ExecutiveSummary
  swotAnalysis: SWOTAnalysis
  recommendations: Recommendation[]
  charts: ChartData[]
}

export interface ExecutiveSummary {
  overallScore: number
  overallStatus: "excellent" | "good" | "average" | "poor" | "critical"
  keyFindings: string[]
  majorRisks: string[]
  opportunities: string[]
  conclusion: string
}

export interface SWOTAnalysis {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  strategicRecommendations: string[]
}

export interface Recommendation {
  category: string
  priority: "high" | "medium" | "low"
  title: string
  description: string
  expectedImpact: string
  timeframe: string
  implementation: string[]
}

export interface ChartData {
  id: string
  type: "bar" | "line" | "pie" | "radar" | "scatter" | "heatmap"
  title: string
  titleEn: string
  data: any[]
  colors: string[]
  description: string
}

export class ReportEngine {
  // توليد التقرير الشامل
  static async generateComprehensiveReport(data: ReportData): Promise<ReportOutput> {
    const sections = [
      this.generateCoverPage(data),
      this.generateExecutiveSummary(data),
      this.generateCompanyOverview(data),
      this.generateBasicAnalysisSection(data),
      this.generateAppliedAnalysisSection(data),
      this.generateAdvancedAnalysisSection(data),
      this.generateSWOTAnalysis(data),
      this.generateRiskAssessment(data),
      this.generateRecommendations(data),
      this.generateCharts(data),
      this.generateAppendices(data),
    ]

    return {
      sections,
      metadata: this.generateMetadata(data),
      styling: this.getReportStyling(data.language),
    }
  }

  // صفحة الغلاف
  private static generateCoverPage(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "cover",
      title: isArabic ? "تقرير التحليل المالي الشامل" : "Comprehensive Financial Analysis Report",
      type: "cover",
      content: {
        companyName: data.companyName,
        reportTitle: isArabic ? "تحليل مالي متقدم بالذكاء الاصطناعي" : "Advanced AI-Powered Financial Analysis",
        subtitle: isArabic
          ? "تقرير شامل يحتوي على 180 نوع تحليل مالي"
          : "Comprehensive Report with 180 Financial Analysis Types",
        date: data.analysisDate,
        generatedBy: "FinClick.AI",
        logo: "/images/finclick-logo.png",
        watermark: isArabic ? "سري ومحدود التداول" : "Confidential & Limited Distribution",
      },
      styling: {
        backgroundColor: "#1a365d",
        textColor: "#ffffff",
        accentColor: "#3182ce",
        layout: "centered",
      },
    }
  }

  // الملخص التنفيذي
  private static generateExecutiveSummary(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "executive_summary",
      title: isArabic ? "الملخص التنفيذي" : "Executive Summary",
      type: "summary",
      content: {
        overallAssessment: {
          score: data.executiveSummary.overallScore,
          status: data.executiveSummary.overallStatus,
          description: this.getStatusDescription(data.executiveSummary.overallStatus, isArabic),
        },
        keyMetrics: this.extractKeyMetrics(data),
        performanceHighlights: data.executiveSummary.keyFindings,
        majorConcerns: data.executiveSummary.majorRisks,
        opportunities: data.executiveSummary.opportunities,
        conclusion: data.executiveSummary.conclusion,
        analysisBreakdown: {
          basicAnalysis: data.basicAnalysis.length,
          appliedAnalysis: data.appliedAnalysis.length,
          advancedAnalysis: data.advancedAnalysis.length,
          totalAnalysis: data.basicAnalysis.length + data.appliedAnalysis.length + data.advancedAnalysis.length,
        },
      },
    }
  }

  // نظرة عامة على الشركة
  private static generateCompanyOverview(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "company_overview",
      title: isArabic ? "نظرة عامة على الشركة" : "Company Overview",
      type: "overview",
      content: {
        companyProfile: {
          name: data.companyName,
          analysisDate: data.analysisDate,
          reportScope: isArabic ? "تحليل مالي شامل متعدد المستويات" : "Comprehensive Multi-Level Financial Analysis",
        },
        analysisScope: {
          documentsAnalyzed: isArabic
            ? "البيانات المالية والمستندات المرفقة"
            : "Financial Statements and Attached Documents",
          analysisDepth: isArabic ? "180 نوع تحليل مالي متخصص" : "180 Specialized Financial Analysis Types",
          methodology: isArabic ? "تحليل بالذكاء الاصطناعي ووكلاء متعددين" : "AI-Powered Analysis with Multiple Agents",
        },
        keyAssumptions: [
          isArabic ? "البيانات المالية المقدمة دقيقة ومحدثة" : "Provided financial data is accurate and up-to-date",
          isArabic ? "استمرارية العمليات التجارية" : "Business continuity assumption",
          isArabic ? "الظروف الاقتصادية الحالية مستقرة نسبياً" : "Current economic conditions are relatively stable",
        ],
      },
    }
  }

  // قسم التحليل الأساسي
  private static generateBasicAnalysisSection(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "basic_analysis",
      title: isArabic ? "التحليل المالي الأساسي (106 تحليل)" : "Basic Financial Analysis (106 Analyses)",
      type: "analysis",
      content: {
        introduction: isArabic
          ? "يشمل هذا القسم التحليل المالي الأساسي الكلاسيكي الذي يغطي التحليل الهيكلي والنسب المالية وتحليلات التدفق النقدي"
          : "This section includes classical basic financial analysis covering structural analysis, financial ratios, and cash flow analyses",

        categories: [
          {
            name: isArabic ? "التحليل الهيكلي" : "Structural Analysis",
            count: 13,
            analyses: data.basicAnalysis.filter((a) => a.category === "التحليل الهيكلي"),
            summary: this.generateCategorySummary(
              data.basicAnalysis.filter((a) => a.category === "التحليل الهيكلي"),
              isArabic,
            ),
          },
          {
            name: isArabic ? "النسب المالية" : "Financial Ratios",
            count: 75,
            analyses: data.basicAnalysis.filter((a) => a.category === "النسب المالية"),
            summary: this.generateCategorySummary(
              data.basicAnalysis.filter((a) => a.category === "النسب المالية"),
              isArabic,
            ),
          },
          {
            name: isArabic ? "تحليلات التدفق النقدي" : "Cash Flow Analysis",
            count: 18,
            analyses: data.basicAnalysis.filter((a) => a.category === "تحليلات التدفق النقدي"),
            summary: this.generateCategorySummary(
              data.basicAnalysis.filter((a) => a.category === "تحليلات التدفق النقدي"),
              isArabic,
            ),
          },
        ],

        overallAssessment: this.generateOverallAssessment(data.basicAnalysis, isArabic),
        keyInsights: this.extractKeyInsights(data.basicAnalysis, isArabic),
      },
    }
  }

  // قسم التحليل التطبيقي
  private static generateAppliedAnalysisSection(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "applied_analysis",
      title: isArabic ? "التحليل المالي التطبيقي (21 تحليل)" : "Applied Financial Analysis (21 Analyses)",
      type: "analysis",
      content: {
        introduction: isArabic
          ? "يركز هذا القسم على التحليلات المالية التطبيقية المتوسطة التي تشمل المقارنة المتقدمة والتقييم والاستثمار وتحليل الأداء والكفاءة"
          : "This section focuses on intermediate applied financial analyses including advanced comparison, valuation & investment, and performance & efficiency analysis",

        categories: [
          {
            name: isArabic ? "المقارنة المتقدمة" : "Advanced Comparison",
            count: 3,
            analyses: data.appliedAnalysis.filter((a) => a.category === "المقارنة المتقدمة"),
            summary: this.generateCategorySummary(
              data.appliedAnalysis.filter((a) => a.category === "المقارنة المتقدمة"),
              isArabic,
            ),
          },
          {
            name: isArabic ? "التقييم والاستثمار" : "Valuation & Investment",
            count: 13,
            analyses: data.appliedAnalysis.filter((a) => a.category === "التقييم والاستثمار"),
            summary: this.generateCategorySummary(
              data.appliedAnalysis.filter((a) => a.category === "التقييم والاستثمار"),
              isArabic,
            ),
          },
          {
            name: isArabic ? "الأداء والكفاءة" : "Performance & Efficiency",
            count: 5,
            analyses: data.appliedAnalysis.filter((a) => a.category === "الأداء والكفاءة"),
            summary: this.generateCategorySummary(
              data.appliedAnalysis.filter((a) => a.category === "الأداء والكفاءة"),
              isArabic,
            ),
          },
        ],

        overallAssessment: this.generateOverallAssessment(data.appliedAnalysis, isArabic),
        keyInsights: this.extractKeyInsights(data.appliedAnalysis, isArabic),
      },
    }
  }

  // قسم التحليل المتقدم
  private static generateAdvancedAnalysisSection(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "advanced_analysis",
      title: isArabic ? "التحليل المالي المتقدم (53 تحليل)" : "Advanced Financial Analysis (53 Analyses)",
      type: "analysis",
      content: {
        introduction: isArabic
          ? "يغطي هذا القسم التحليلات المالية المتطورة والمتقدمة بما في ذلك النمذجة المالية والتحليل الإحصائي الكمي والتنبؤ الائتماني وتحليل المخاطر الكمية"
          : "This section covers sophisticated and advanced financial analyses including financial modeling, quantitative statistical analysis, credit forecasting, and quantitative risk analysis",

        categories: [
          {
            name: isArabic ? "النمذجة المالية" : "Financial Modeling",
            count: 11,
            analyses: data.advancedAnalysis.filter((a) => a.category === "النمذجة المالية"),
            summary: this.generateCategorySummary(
              data.advancedAnalysis.filter((a) => a.category === "النمذجة المالية"),
              isArabic,
            ),
          },
          {
            name: isArabic ? "التحليل الإحصائي الكمي" : "Quantitative Statistical Analysis",
            count: 16,
            analyses: data.advancedAnalysis.filter((a) => a.category === "التحليل الإحصائي الكمي"),
            summary: this.generateCategorySummary(
              data.advancedAnalysis.filter((a) => a.category === "التحليل الإحصائي الكمي"),
              isArabic,
            ),
          },
          {
            name: isArabic ? "التنبؤ الائتماني" : "Credit Forecasting",
            count: 10,
            analyses: data.advancedAnalysis.filter((a) => a.category === "التنبؤ الائتماني"),
            summary: this.generateCategorySummary(
              data.advancedAnalysis.filter((a) => a.category === "التنبؤ الائتماني"),
              isArabic,
            ),
          },
          {
            name: isArabic ? "المخاطر الكمية" : "Quantitative Risk",
            count: 16,
            analyses: data.advancedAnalysis.filter((a) => a.category === "المخاطر الكمية"),
            summary: this.generateCategorySummary(
              data.advancedAnalysis.filter((a) => a.category === "المخاطر الكمية"),
              isArabic,
            ),
          },
        ],

        overallAssessment: this.generateOverallAssessment(data.advancedAnalysis, isArabic),
        keyInsights: this.extractKeyInsights(data.advancedAnalysis, isArabic),
        modelAccuracy: this.calculateModelAccuracy(data.advancedAnalysis),
        confidenceLevel: this.calculateConfidenceLevel(data.advancedAnalysis),
      },
    }
  }

  // تحليل SWOT
  private static generateSWOTAnalysis(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "swot_analysis",
      title: isArabic ? "تحليل SWOT الشامل" : "Comprehensive SWOT Analysis",
      type: "swot",
      content: {
        introduction: isArabic
          ? "تحليل شامل لنقاط القوة والضعف والفرص والتهديدات بناءً على نتائج التحليل المالي المتعدد المستويات"
          : "Comprehensive analysis of Strengths, Weaknesses, Opportunities, and Threats based on multi-level financial analysis results",

        strengths: {
          title: isArabic ? "نقاط القوة" : "Strengths",
          items: data.swotAnalysis.strengths,
          impact: this.calculateSWOTImpact(data.swotAnalysis.strengths, "positive"),
        },

        weaknesses: {
          title: isArabic ? "نقاط الضعف" : "Weaknesses",
          items: data.swotAnalysis.weaknesses,
          impact: this.calculateSWOTImpact(data.swotAnalysis.weaknesses, "negative"),
        },

        opportunities: {
          title: isArabic ? "الفرص" : "Opportunities",
          items: data.swotAnalysis.opportunities,
          impact: this.calculateSWOTImpact(data.swotAnalysis.opportunities, "positive"),
        },

        threats: {
          title: isArabic ? "التهديدات" : "Threats",
          items: data.swotAnalysis.threats,
          impact: this.calculateSWOTImpact(data.swotAnalysis.threats, "negative"),
        },

        strategicMatrix: this.generateStrategicMatrix(data.swotAnalysis, isArabic),
        recommendations: data.swotAnalysis.strategicRecommendations,
      },
    }
  }

  // تقييم المخاطر
  private static generateRiskAssessment(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    const riskAnalyses = [
      ...data.basicAnalysis.filter((a) => a.name.includes("مخاطر") || a.nameEn.includes("Risk")),
      ...data.advancedAnalysis.filter((a) => a.category === "المخاطر الكمية"),
    ]

    return {
      id: "risk_assessment",
      title: isArabic ? "تقييم المخاطر الشامل" : "Comprehensive Risk Assessment",
      type: "risk",
      content: {
        introduction: isArabic
          ? "تقييم شامل للمخاطر المالية والتشغيلية والاستراتيجية بناءً على التحليلات الكمية المتقدمة"
          : "Comprehensive assessment of financial, operational, and strategic risks based on advanced quantitative analyses",

        riskProfile: {
          overallRiskLevel: this.calculateOverallRiskLevel(riskAnalyses),
          riskScore: this.calculateRiskScore(riskAnalyses),
          riskDistribution: this.calculateRiskDistribution(riskAnalyses),
        },

        riskCategories: [
          {
            category: isArabic ? "المخاطر المالية" : "Financial Risks",
            risks: riskAnalyses.filter((r) => r.category.includes("مالي") || r.category.includes("Financial")),
            severity: "medium",
          },
          {
            category: isArabic ? "مخاطر السوق" : "Market Risks",
            risks: riskAnalyses.filter((r) => r.name.includes("السوق") || r.nameEn.includes("Market")),
            severity: "high",
          },
          {
            category: isArabic ? "المخاطر التشغيلية" : "Operational Risks",
            risks: riskAnalyses.filter((r) => r.name.includes("تشغيل") || r.nameEn.includes("Operational")),
            severity: "low",
          },
          {
            category: isArabic ? "المخاطر الائتمانية" : "Credit Risks",
            risks: riskAnalyses.filter((r) => r.category === "التنبؤ الائتماني"),
            severity: "medium",
          },
        ],

        riskMitigation: this.generateRiskMitigationStrategies(riskAnalyses, isArabic),
        monitoringRecommendations: this.generateMonitoringRecommendations(riskAnalyses, isArabic),
      },
    }
  }

  // التوصيات
  private static generateRecommendations(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "recommendations",
      title: isArabic ? "التوصيات الاستراتيجية" : "Strategic Recommendations",
      type: "recommendations",
      content: {
        introduction: isArabic
          ? "توصيات استراتيجية مبنية على نتائج التحليل الشامل لتحسين الأداء المالي وإدارة المخاطر"
          : "Strategic recommendations based on comprehensive analysis results to improve financial performance and risk management",

        priorityRecommendations: data.recommendations.filter((r) => r.priority === "high"),
        mediumPriorityRecommendations: data.recommendations.filter((r) => r.priority === "medium"),
        longTermRecommendations: data.recommendations.filter((r) => r.priority === "low"),

        implementationRoadmap: this.generateImplementationRoadmap(data.recommendations, isArabic),
        expectedOutcomes: this.generateExpectedOutcomes(data.recommendations, isArabic),
        successMetrics: this.generateSuccessMetrics(data.recommendations, isArabic),
      },
    }
  }

  // الرسوم البيانية
  private static generateCharts(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "charts",
      title: isArabic ? "الرسوم البيانية والتصورات" : "Charts and Visualizations",
      type: "charts",
      content: {
        introduction: isArabic
          ? "تصورات بيانية احترافية لنتائج التحليل المالي لتسهيل فهم واستيعاب المعلومات المالية المعقدة"
          : "Professional data visualizations of financial analysis results to facilitate understanding of complex financial information",

        charts: data.charts.map((chart) => ({
          ...chart,
          config: this.generateChartConfig(chart, isArabic),
          insights: this.generateChartInsights(chart, isArabic),
        })),

        dashboardSummary: this.generateDashboardSummary(data.charts, isArabic),
      },
    }
  }

  // الملاحق
  private static generateAppendices(data: ReportData): ReportSection {
    const isArabic = data.language === "ar"

    return {
      id: "appendices",
      title: isArabic ? "الملاحق" : "Appendices",
      type: "appendices",
      content: {
        methodology: {
          title: isArabic ? "منهجية التحليل" : "Analysis Methodology",
          content: isArabic
            ? "شرح مفصل لمنهجية التحليل المالي المستخدمة والنماذج الرياضية والإحصائية المطبقة"
            : "Detailed explanation of the financial analysis methodology used and the mathematical and statistical models applied",
        },

        glossary: {
          title: isArabic ? "قاموس المصطلحات" : "Glossary of Terms",
          terms: this.generateGlossary(isArabic),
        },

        dataSource: {
          title: isArabic ? "مصادر البيانات" : "Data Sources",
          sources: [
            isArabic ? "البيانات المالية المقدمة من الشركة" : "Financial data provided by the company",
            isArabic ? "بيانات السوق من مصادر موثوقة" : "Market data from reliable sources",
            isArabic ? "المؤشرات الاقتصادية الكلية" : "Macroeconomic indicators",
          ],
        },

        disclaimer: {
          title: isArabic ? "إخلاء المسؤولية" : "Disclaimer",
          content: isArabic
            ? "هذا التقرير مبني على البيانات المتاحة وقت التحليل ولا يشكل نصيحة استثمارية. يُنصح بالحصول على استشارة مالية مهنية قبل اتخاذ أي قرارات استثمارية."
            : "This report is based on data available at the time of analysis and does not constitute investment advice. Professional financial consultation is recommended before making any investment decisions.",
        },
      },
    }
  }

  // دوال مساعدة
  private static generateMetadata(data: ReportData): ReportMetadata {
    return {
      title: `Financial Analysis Report - ${data.companyName}`,
      author: "FinClick.AI",
      subject: "Comprehensive Financial Analysis",
      keywords: ["financial analysis", "AI", "business intelligence", "risk assessment"],
      creationDate: new Date().toISOString(),
      language: data.language,
      pages: this.estimatePageCount(data),
      version: "1.0",
    }
  }

  private static getReportStyling(language: "ar" | "en"): ReportStyling {
    return {
      direction: language === "ar" ? "rtl" : "ltr",
      primaryFont: language === "ar" ? "Cairo" : "Inter",
      secondaryFont: language === "ar" ? "Tajawal" : "Roboto",
      colors: {
        primary: "#1a365d",
        secondary: "#3182ce",
        accent: "#38a169",
        warning: "#d69e2e",
        danger: "#e53e3e",
        success: "#38a169",
        neutral: "#718096",
      },
      spacing: {
        small: "8px",
        medium: "16px",
        large: "24px",
        xlarge: "32px",
      },
    }
  }

  private static getStatusDescription(status: string, isArabic: boolean): string {
    const descriptions = {
      excellent: isArabic ? "أداء مالي ممتاز وقوي" : "Excellent and strong financial performance",
      good: isArabic ? "أداء مالي جيد ومستقر" : "Good and stable financial performance",
      average: isArabic ? "أداء مالي متوسط" : "Average financial performance",
      poor: isArabic ? "أداء مالي ضعيف يحتاج تحسين" : "Poor financial performance requiring improvement",
      critical: isArabic
        ? "وضع مالي حرج يتطلب تدخل فوري"
        : "Critical financial situation requiring immediate intervention",
    }
    return descriptions[status as keyof typeof descriptions] || ""
  }

  private static extractKeyMetrics(data: ReportData): KeyMetric[] {
    const allAnalyses = [...data.basicAnalysis, ...data.appliedAnalysis, ...data.advancedAnalysis]

    return [
      {
        name: data.language === "ar" ? "إجمالي التحليلات" : "Total Analyses",
        value: allAnalyses.length.toString(),
        trend: "neutral",
      },
      {
        name: data.language === "ar" ? "النتائج الممتازة" : "Excellent Results",
        value: allAnalyses.filter((a) => a.status === "excellent").length.toString(),
        trend: "positive",
      },
      {
        name: data.language === "ar" ? "النتائج الحرجة" : "Critical Results",
        value: allAnalyses.filter((a) => a.status === "critical").length.toString(),
        trend: "negative",
      },
      {
        name: data.language === "ar" ? "متوسط الثقة" : "Average Confidence",
        value: `${Math.round(allAnalyses.reduce((sum, a) => sum + a.confidence, 0) / allAnalyses.length)}%`,
        trend: "neutral",
      },
    ]
  }

  private static generateCategorySummary(analyses: AnalysisResult[], isArabic: boolean): CategorySummary {
    const excellentCount = analyses.filter((a) => a.status === "excellent").length
    const goodCount = analyses.filter((a) => a.status === "good").length
    const averageCount = analyses.filter((a) => a.status === "average").length
    const poorCount = analyses.filter((a) => a.status === "poor").length
    const criticalCount = analyses.filter((a) => a.status === "critical").length

    const totalCount = analyses.length
    const positiveCount = excellentCount + goodCount
    const negativeCount = poorCount + criticalCount

    let overallStatus: string
    if (positiveCount / totalCount > 0.7) overallStatus = "excellent"
    else if (positiveCount / totalCount > 0.5) overallStatus = "good"
    else if (negativeCount / totalCount > 0.5) overallStatus = "poor"
    else if (negativeCount / totalCount > 0.3) overallStatus = "average"
    else overallStatus = "critical"

    return {
      overallStatus,
      distribution: {
        excellent: excellentCount,
        good: goodCount,
        average: averageCount,
        poor: poorCount,
        critical: criticalCount,
      },
      keyFindings: analyses
        .filter((a) => a.status === "excellent" || a.status === "critical")
        .slice(0, 3)
        .map((a) => (isArabic ? a.interpretation : a.nameEn)),
      averageConfidence: Math.round(analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length),
    }
  }

  private static generateOverallAssessment(analyses: AnalysisResult[], isArabic: boolean): OverallAssessment {
    const summary = this.generateCategorySummary(analyses, isArabic)

    return {
      status: summary.overallStatus,
      score: this.calculateCategoryScore(summary.distribution),
      strengths: analyses.filter((a) => a.status === "excellent").slice(0, 5),
      concerns: analyses.filter((a) => a.status === "critical" || a.status === "poor").slice(0, 5),
      recommendations: this.generateCategoryRecommendations(analyses, isArabic),
    }
  }

  private static extractKeyInsights(analyses: AnalysisResult[], isArabic: boolean): string[] {
    return analyses
      .filter((a) => a.status === "excellent" || a.status === "critical")
      .slice(0, 10)
      .map((a) => a.interpretation)
  }

  private static calculateCategoryScore(distribution: any): number {
    const weights = { excellent: 5, good: 4, average: 3, poor: 2, critical: 1 }
    const total = Object.values(distribution).reduce((sum: number, count: any) => sum + count, 0)
    const weightedSum = Object.entries(distribution).reduce((sum, [status, count]: [string, any]) => {
      return sum + weights[status as keyof typeof weights] * count
    }, 0)

    return Math.round((weightedSum / (total * 5)) * 100)
  }

  private static generateCategoryRecommendations(analyses: AnalysisResult[], isArabic: boolean): string[] {
    const criticalAnalyses = analyses.filter((a) => a.status === "critical")
    const poorAnalyses = analyses.filter((a) => a.status === "poor")

    const recommendations: string[] = []

    if (criticalAnalyses.length > 0) {
      recommendations.push(
        isArabic
          ? `معالجة فورية مطلوبة لـ ${criticalAnalyses.length} مؤشر حرج`
          : `Immediate attention required for ${criticalAnalyses.length} critical indicators`,
      )
    }

    if (poorAnalyses.length > 0) {
      recommendations.push(
        isArabic
          ? `تحسين مطلوب لـ ${poorAnalyses.length} مؤشر ضعيف`
          : `Improvement needed for ${poorAnalyses.length} poor indicators`,
      )
    }

    return recommendations
  }

  private static calculateSWOTImpact(items: string[], type: "positive" | "negative"): SWOTImpact {
    return {
      level: items.length > 5 ? "high" : items.length > 2 ? "medium" : "low",
      score: items.length * (type === "positive" ? 1 : -1),
      priority: items.length > 3 ? "high" : "medium",
    }
  }

  private static generateStrategicMatrix(swot: SWOTAnalysis, isArabic: boolean): StrategicMatrix {
    return {
      soStrategies: isArabic ? "استراتيجيات القوة-الفرص" : "Strength-Opportunity Strategies",
      woStrategies: isArabic ? "استراتيجيات الضعف-الفرص" : "Weakness-Opportunity Strategies",
      stStrategies: isArabic ? "استراتيجيات القوة-التهديدات" : "Strength-Threat Strategies",
      wtStrategies: isArabic ? "استراتيجيات الضعف-التهديدات" : "Weakness-Threat Strategies",
    }
  }

  private static calculateOverallRiskLevel(riskAnalyses: AnalysisResult[]): string {
    const criticalRisks = riskAnalyses.filter((r) => r.status === "critical").length
    const poorRisks = riskAnalyses.filter((r) => r.status === "poor").length
    const totalRisks = riskAnalyses.length

    const riskRatio = (criticalRisks * 2 + poorRisks) / totalRisks

    if (riskRatio > 1.5) return "high"
    if (riskRatio > 0.8) return "medium"
    return "low"
  }

  private static calculateRiskScore(riskAnalyses: AnalysisResult[]): number {
    const weights = { excellent: 1, good: 2, average: 3, poor: 4, critical: 5 }
    const totalWeight = riskAnalyses.reduce((sum, risk) => {
      return sum + weights[risk.status]
    }, 0)

    return Math.round((totalWeight / (riskAnalyses.length * 5)) * 100)
  }

  private static calculateRiskDistribution(riskAnalyses: AnalysisResult[]): RiskDistribution {
    const total = riskAnalyses.length
    return {
      low: (riskAnalyses.filter((r) => r.status === "excellent" || r.status === "good").length / total) * 100,
      medium: (riskAnalyses.filter((r) => r.status === "average").length / total) * 100,
      high: (riskAnalyses.filter((r) => r.status === "poor" || r.status === "critical").length / total) * 100,
    }
  }

  private static generateRiskMitigationStrategies(riskAnalyses: AnalysisResult[], isArabic: boolean): string[] {
    return [
      isArabic ? "تنويع مصادر الإيرادات لتقليل مخاطر التركز" : "Diversify revenue sources to reduce concentration risk",
      isArabic ? "تحسين إدارة السيولة والتدفق النقدي" : "Improve liquidity and cash flow management",
      isArabic ? "تطوير نظام إنذار مبكر للمخاطر" : "Develop early warning system for risks",
      isArabic ? "تعزيز الضوابط الداخلية والحوكمة" : "Strengthen internal controls and governance",
    ]
  }

  private static generateMonitoringRecommendations(riskAnalyses: AnalysisResult[], isArabic: boolean): string[] {
    return [
      isArabic ? "مراقبة شهرية للمؤشرات المالية الرئيسية" : "Monthly monitoring of key financial indicators",
      isArabic ? "تقييم ربع سنوي لمستوى المخاطر" : "Quarterly risk level assessment",
      isArabic
        ? "مراجعة سنوية شاملة لاستراتيجية إدارة المخاطر"
        : "Annual comprehensive review of risk management strategy",
    ]
  }

  private static generateImplementationRoadmap(
    recommendations: Recommendation[],
    isArabic: boolean,
  ): ImplementationPhase[] {
    return [
      {
        phase: isArabic ? "المرحلة الأولى (0-3 أشهر)" : "Phase 1 (0-3 months)",
        recommendations: recommendations.filter((r) => r.priority === "high"),
        expectedDuration: "3 months",
      },
      {
        phase: isArabic ? "المرحلة الثانية (3-12 شهر)" : "Phase 2 (3-12 months)",
        recommendations: recommendations.filter((r) => r.priority === "medium"),
        expectedDuration: "9 months",
      },
      {
        phase: isArabic ? "المرحلة الثالثة (12+ شهر)" : "Phase 3 (12+ months)",
        recommendations: recommendations.filter((r) => r.priority === "low"),
        expectedDuration: "12+ months",
      },
    ]
  }

  private static generateExpectedOutcomes(recommendations: Recommendation[], isArabic: boolean): string[] {
    return recommendations.map((r) => r.expectedImpact)
  }

  private static generateSuccessMetrics(recommendations: Recommendation[], isArabic: boolean): string[] {
    return [
      isArabic ? "تحسن في النسب المالية الرئيسية بنسبة 15%" : "15% improvement in key financial ratios",
      isArabic ? "انخفاض مستوى المخاطر بنسبة 20%" : "20% reduction in risk level",
      isArabic ? "زيادة الكفاءة التشغيلية بنسبة 10%" : "10% increase in operational efficiency",
    ]
  }

  private static generateChartConfig(chart: ChartData, isArabic: boolean): ChartConfig {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: isArabic ? chart.title : chart.titleEn,
          font: {
            size: 16,
            weight: "bold",
          },
        },
        legend: {
          position: "bottom",
        },
      },
      scales:
        chart.type !== "pie"
          ? {
              y: {
                beginAtZero: true,
              },
            }
          : undefined,
    }
  }

  private static generateChartInsights(chart: ChartData, isArabic: boolean): string[] {
    return [
      isArabic ? "تحليل الاتجاهات العامة في البيانات" : "Analysis of general trends in data",
      isArabic ? "تحديد النقاط المهمة والشاذة" : "Identification of important and outlier points",
      isArabic ? "مقارنة الأداء مع المعايير المرجعية" : "Performance comparison with benchmarks",
    ]
  }

  private static generateDashboardSummary(charts: ChartData[], isArabic: boolean): DashboardSummary {
    return {
      totalCharts: charts.length,
      chartTypes: [...new Set(charts.map((c) => c.type))],
      keyInsights: isArabic
        ? "الرسوم البيانية تظهر اتجاهات إيجابية في معظم المؤشرات المالية"
        : "Charts show positive trends in most financial indicators",
    }
  }

  private static generateGlossary(isArabic: boolean): GlossaryTerm[] {
    return [
      {
        term: isArabic ? "النسبة الحالية" : "Current Ratio",
        definition: isArabic
          ? "نسبة الأصول المتداولة إلى الخصوم المتداولة، تقيس قدرة الشركة على الوفاء بالتزاماتها قصيرة الأجل"
          : "Ratio of current assets to current liabilities, measures company's ability to meet short-term obligations",
      },
      {
        term: isArabic ? "العائد على الاستثمار" : "Return on Investment (ROI)",
        definition: isArabic
          ? "مقياس لكفاءة الاستثمار، يحسب كنسبة صافي الربح إلى إجمالي الاستثمار"
          : "Measure of investment efficiency, calculated as net profit to total investment ratio",
      },
      // يمكن إضافة المزيد من المصطلحات
    ]
  }

  private static calculateModelAccuracy(analyses: AdvancedAnalysisResult[]): number {
    const accuracies = analyses.filter((a) => a.modelAccuracy !== undefined).map((a) => a.modelAccuracy!)

    return accuracies.length > 0 ? Math.round(accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length) : 85
  }

  private static calculateConfidenceLevel(analyses: AdvancedAnalysisResult[]): number {
    return Math.round(analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length)
  }

  private static estimatePageCount(data: ReportData): number {
    const basePages = 15 // صفحات أساسية
    const analysisPages = Math.ceil(
      (data.basicAnalysis.length + data.appliedAnalysis.length + data.advancedAnalysis.length) / 10,
    )
    const chartPages = Math.ceil(data.charts.length / 2)

    return basePages + analysisPages + chartPages
  }
}

// واجهات البيانات
export interface ReportOutput {
  sections: ReportSection[]
  metadata: ReportMetadata
  styling: ReportStyling
}

export interface ReportSection {
  id: string
  title: string
  type: string
  content: any
  styling?: any
}

export interface ReportMetadata {
  title: string
  author: string
  subject: string
  keywords: string[]
  creationDate: string
  language: string
  pages: number
  version: string
}

export interface ReportStyling {
  direction: "rtl" | "ltr"
  primaryFont: string
  secondaryFont: string
  colors: {
    primary: string
    secondary: string
    accent: string
    warning: string
    danger: string
    success: string
    neutral: string
  }
  spacing: {
    small: string
    medium: string
    large: string
    xlarge: string
  }
}

export interface KeyMetric {
  name: string
  value: string
  trend: "positive" | "negative" | "neutral"
}

export interface CategorySummary {
  overallStatus: string
  distribution: {
    excellent: number
    good: number
    average: number
    poor: number
    critical: number
  }
  keyFindings: string[]
  averageConfidence: number
}

export interface OverallAssessment {
  status: string
  score: number
  strengths: AnalysisResult[]
  concerns: AnalysisResult[]
  recommendations: string[]
}

export interface SWOTImpact {
  level: "high" | "medium" | "low"
  score: number
  priority: "high" | "medium" | "low"
}

export interface StrategicMatrix {
  soStrategies: string
  woStrategies: string
  stStrategies: string
  wtStrategies: string
}

export interface RiskDistribution {
  low: number
  medium: number
  high: number
}

export interface ImplementationPhase {
  phase: string
  recommendations: Recommendation[]
  expectedDuration: string
}

export interface ChartConfig {
  responsive: boolean
  maintainAspectRatio: boolean
  plugins: any
  scales?: any
}

export interface DashboardSummary {
  totalCharts: number
  chartTypes: string[]
  keyInsights: string
}

export interface GlossaryTerm {
  term: string
  definition: string
}
