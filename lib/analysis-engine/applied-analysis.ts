// محرك التحليل التطبيقي المتوسط - 21 تحليل
// يشمل: المقارنة المتقدمة (3) + التقييم والاستثمار (13) + الأداء والكفاءة (5)

export interface FinancialData {
  // بيانات القوائم المالية الأساسية
  revenue: number
  netIncome: number
  totalAssets: number
  totalEquity: number
  totalLiabilities: number
  currentAssets: number
  currentLiabilities: number
  cash: number
  inventory: number
  accountsReceivable: number
  accountsPayable: number
  longTermDebt: number
  shortTermDebt: number
  operatingCashFlow: number
  freeCashFlow: number
  investingCashFlow: number
  financingCashFlow: number

  // بيانات إضافية للتحليل التطبيقي
  marketValue: number
  bookValue: number
  sharesOutstanding: number
  dividendsPaid: number
  operatingIncome: number
  interestExpense: number
  taxRate: number
  beta: number
  riskFreeRate: number
  marketReturn: number

  // بيانات المقارنة
  industryAverages?: {
    roe: number
    roa: number
    currentRatio: number
    debtToEquity: number
    profitMargin: number
  }

  // بيانات تاريخية للمقارنة الزمنية
  historicalData?: {
    previousYear: Partial<FinancialData>
    twoYearsAgo: Partial<FinancialData>
  }
}

export interface AnalysisResult {
  id: string
  name: string
  nameEn: string
  category: string
  value: number
  formula: string
  interpretation: string
  benchmark: number
  status: "excellent" | "good" | "average" | "poor" | "critical"
  description: string
  calculation: string
  recommendations?: string[]
  riskLevel?: "low" | "medium" | "high"
  trend?: "improving" | "stable" | "declining"
}

export class AppliedAnalysisEngine {
  // 1. المقارنة المتقدمة (3 تحليلات)
  static performAdvancedComparison(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // 1.1 تحليل المقارنة القطاعية
    if (data.industryAverages) {
      const sectorComparison = this.calculateSectorComparison(data)
      results.push(sectorComparison)
    }

    // 1.2 تحليل المقارنة الزمنية
    if (data.historicalData) {
      const timeSeriesComparison = this.calculateTimeSeriesComparison(data)
      results.push(timeSeriesComparison)
    }

    // 1.3 تحليل المقارنة المعيارية
    const benchmarkComparison = this.calculateBenchmarkComparison(data)
    results.push(benchmarkComparison)

    return results
  }

  // 2. التقييم والاستثمار (13 تحليل)
  static performValuationAnalysis(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // 2.1 نسبة السعر إلى الأرباح (P/E)
    const peRatio = data.marketValue / data.netIncome
    results.push({
      id: "pe_ratio",
      name: "نسبة السعر إلى الأرباح",
      nameEn: "Price to Earnings Ratio",
      category: "التقييم والاستثمار",
      value: peRatio,
      formula: "القيمة السوقية ÷ الربح الصافي",
      interpretation: this.interpretPERatio(peRatio),
      benchmark: 15,
      status: this.getStatus(peRatio, 15, "optimal"),
      description: "يقيس مدى استعداد المستثمرين لدفع مقابل كل ريال من الأرباح",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.netIncome.toLocaleString()}`,
      recommendations: this.getPERecommendations(peRatio),
    })

    // 2.2 نسبة السعر إلى القيمة الدفترية (P/B)
    const pbRatio = data.marketValue / data.bookValue
    results.push({
      id: "pb_ratio",
      name: "نسبة السعر إلى القيمة الدفترية",
      nameEn: "Price to Book Ratio",
      category: "التقييم والاستثمار",
      value: pbRatio,
      formula: "القيمة السوقية ÷ القيمة الدفترية",
      interpretation: this.interpretPBRatio(pbRatio),
      benchmark: 1.5,
      status: this.getStatus(pbRatio, 1.5, "optimal"),
      description: "يقارن القيمة السوقية بالقيمة الدفترية للشركة",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.bookValue.toLocaleString()}`,
      recommendations: this.getPBRecommendations(pbRatio),
    })

    // 2.3 عائد الأرباح (Dividend Yield)
    const dividendYieldValue = (data.dividendsPaid / data.marketValue) * 100
    results.push({
      id: "dividend_yield",
      name: "عائد الأرباح الموزعة",
      nameEn: "Dividend Yield",
      category: "التقييم والاستثمار",
      value: dividendYieldValue,
      formula: "(الأرباح الموزعة ÷ القيمة السوقية) × 100",
      interpretation: this.interpretDividendYield(dividendYieldValue),
      benchmark: 3,
      status: this.getStatus(dividendYieldValue, 3, "higher"),
      description: "يقيس العائد النقدي للمستثمرين من الأرباح الموزعة",
      calculation: `(${data.dividendsPaid.toLocaleString()} ÷ ${data.marketValue.toLocaleString()}) × 100`,
    })

    // 2.4 نسبة توزيع الأرباح (Payout Ratio)
    const payoutRatio = (data.dividendsPaid / data.netIncome) * 100
    results.push({
      id: "payout_ratio",
      name: "نسبة توزيع الأرباح",
      nameEn: "Payout Ratio",
      category: "التقييم والاستثمار",
      value: payoutRatio,
      formula: "(الأرباح الموزعة ÷ الربح الصافي) × 100",
      interpretation: this.interpretPayoutRatio(payoutRatio),
      benchmark: 40,
      status: this.getStatus(payoutRatio, 40, "optimal"),
      description: "يقيس نسبة الأرباح التي توزعها الشركة على المساهمين",
      calculation: `(${data.dividendsPaid.toLocaleString()} ÷ ${data.netIncome.toLocaleString()}) × 100`,
    })

    // 2.5 القيمة الاقتصادية المضافة (EVA)
    const wacc = this.calculateWACC(data)
    const eva = data.netIncome - (data.totalAssets * wacc) / 100
    results.push({
      id: "eva",
      name: "القيمة الاقتصادية المضافة",
      nameEn: "Economic Value Added",
      category: "التقييم والاستثمار",
      value: eva,
      formula: "الربح الصافي - (إجمالي الأصول × تكلفة رأس المال)",
      interpretation: this.interpretEVA(eva),
      benchmark: 0,
      status: this.getStatus(eva, 0, "higher"),
      description: "يقيس القيمة الحقيقية المضافة بعد خصم تكلفة رأس المال",
      calculation: `${data.netIncome.toLocaleString()} - (${data.totalAssets.toLocaleString()} × ${wacc.toFixed(2)}%)`,
    })

    // 2.6 نموذج تسعير الأصول الرأسمالية (CAPM)
    const expectedReturn = data.riskFreeRate + data.beta * (data.marketReturn - data.riskFreeRate)
    results.push({
      id: "capm",
      name: "العائد المتوقع حسب نموذج CAPM",
      nameEn: "CAPM Expected Return",
      category: "التقييم والاستثمار",
      value: expectedReturn,
      formula: "المعدل الخالي من المخاطر + بيتا × (عائد السوق - المعدل الخالي من المخاطر)",
      interpretation: this.interpretCAPM(expectedReturn),
      benchmark: 10,
      status: this.getStatus(expectedReturn, 10, "higher"),
      description: "يحسب العائد المتوقع بناءً على مخاطر الاستثمار",
      calculation: `${data.riskFreeRate}% + ${data.beta} × (${data.marketReturn}% - ${data.riskFreeRate}%)`,
    })

    // 2.7 نسبة السعر إلى المبيعات (P/S)
    const psRatio = data.marketValue / data.revenue
    results.push({
      id: "ps_ratio",
      name: "نسبة السعر إلى المبيعات",
      nameEn: "Price to Sales Ratio",
      category: "التقييم والاستثمار",
      value: psRatio,
      formula: "القيمة السوقية ÷ المبيعات",
      interpretation: this.interpretPSRatio(psRatio),
      benchmark: 2,
      status: this.getStatus(psRatio, 2, "optimal"),
      description: "يقيس تقييم الشركة مقارنة بمبيعاتها",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.revenue.toLocaleString()}`,
    })

    // 2.8 نسبة السعر إلى التدفق النقدي (P/CF)
    const pcfRatio = data.marketValue / data.operatingCashFlow
    results.push({
      id: "pcf_ratio",
      name: "نسبة السعر إلى التدفق النقدي",
      nameEn: "Price to Cash Flow Ratio",
      category: "التقييم والاستثمار",
      value: pcfRatio,
      formula: "القيمة السوقية ÷ التدفق النقدي التشغيلي",
      interpretation: this.interpretPCFRatio(pcfRatio),
      benchmark: 10,
      status: this.getStatus(pcfRatio, 10, "optimal"),
      description: "يقيس تقييم الشركة مقارنة بتدفقها النقدي",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.operatingCashFlow.toLocaleString()}`,
    })

    // 2.9 القيمة السوقية إلى القيمة المضافة (M/VA)
    const valueAdded = data.revenue - data.totalAssets * 0.1 // تكلفة الأصول المقدرة
    const mvvaRatio = data.marketValue / valueAdded
    results.push({
      id: "mvva_ratio",
      name: "نسبة القيمة السوقية إلى القيمة المضافة",
      nameEn: "Market Value to Value Added Ratio",
      category: "التقييم والاستثمار",
      value: mvvaRatio,
      formula: "القيمة السوقية ÷ القيمة المضافة",
      interpretation: this.interpretMVVARatio(mvvaRatio),
      benchmark: 3,
      status: this.getStatus(mvvaRatio, 3, "optimal"),
      description: "يقيس كفاءة الشركة في خلق القيمة للمساهمين",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${valueAdded.toLocaleString()}`,
    })

    // 2.10 عائد الاستثمار المعدل بالمخاطر
    const riskAdjustedReturn = data.netIncome / data.totalAssets / data.beta
    results.push({
      id: "risk_adjusted_return",
      name: "عائد الاستثمار المعدل بالمخاطر",
      nameEn: "Risk Adjusted Return",
      category: "التقييم والاستثمار",
      value: riskAdjustedReturn * 100,
      formula: "(العائد على الأصول ÷ بيتا) × 100",
      interpretation: this.interpretRiskAdjustedReturn(riskAdjustedReturn * 100),
      benchmark: 8,
      status: this.getStatus(riskAdjustedReturn * 100, 8, "higher"),
      description: "يقيس العائد مقارنة بمستوى المخاطر",
      calculation: `((${data.netIncome.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) ÷ ${data.beta}) × 100`,
    })

    // 2.11 نسبة القيمة السوقية إلى الإيرادات المتكررة
    const recurringRevenue = data.revenue * 0.8 // تقدير الإيرادات المتكررة
    const mvrrRatio = data.marketValue / recurringRevenue
    results.push({
      id: "mvrr_ratio",
      name: "نسبة القيمة السوقية إلى الإيرادات المتكررة",
      nameEn: "Market Value to Recurring Revenue Ratio",
      category: "التقييم والاستثمار",
      value: mvrrRatio,
      formula: "القيمة السوقية ÷ الإيرادات المتكررة",
      interpretation: this.interpretMVRRRatio(mvrrRatio),
      benchmark: 5,
      status: this.getStatus(mvrrRatio, 5, "optimal"),
      description: "يقيس تقييم الشركة مقارنة بإيراداتها المستقرة",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${recurringRevenue.toLocaleString()}`,
    })

    // 2.12 مضاعف الأرباح قبل الفوائد والضرائب والإهلاك
    const ebitda = data.operatingIncome + data.totalAssets * 0.05 // تقدير الإهلاك
    const ebitdaMultiple = data.marketValue / ebitda
    results.push({
      id: "ebitda_multiple",
      name: "مضاعف الأرباح قبل الفوائد والضرائب والإهلاك",
      nameEn: "EBITDA Multiple",
      category: "التقييم والاستثمار",
      value: ebitdaMultiple,
      formula: "القيمة السوقية ÷ الأرباح قبل الفوائد والضرائب والإهلاك",
      interpretation: this.interpretEBITDAMultiple(ebitdaMultiple),
      benchmark: 8,
      status: this.getStatus(ebitdaMultiple, 8, "optimal"),
      description: "يقيس تقييم الشركة مقارنة بأرباحها التشغيلية",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${ebitda.toLocaleString()}`,
    })

    // 2.13 نسبة القيمة الدفترية الملموسة
    const tangibleBookValue = data.bookValue * 0.8 // تقدير القيمة الملموسة
    const ptbvRatio = data.marketValue / tangibleBookValue
    results.push({
      id: "ptbv_ratio",
      name: "نسبة السعر إلى القيمة الدفترية الملموسة",
      nameEn: "Price to Tangible Book Value Ratio",
      category: "التقييم والاستثمار",
      value: ptbvRatio,
      formula: "القيمة السوقية ÷ القيمة الدفترية الملموسة",
      interpretation: this.interpretPTBVRatio(ptbvRatio),
      benchmark: 2,
      status: this.getStatus(ptbvRatio, 2, "optimal"),
      description: "يقيس تقييم الشركة مقارنة بأصولها الملموسة",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${tangibleBookValue.toLocaleString()}`,
    })

    return results
  }

  // 3. الأداء والكفاءة (5 تحليلات)
  static performEfficiencyAnalysis(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // 3.1 كفاءة استخدام الأصول
    const assetUtilization = (data.revenue / data.totalAssets) * 100
    results.push({
      id: "asset_utilization",
      name: "كفاءة استخدام الأصول",
      nameEn: "Asset Utilization Efficiency",
      category: "الأداء والكفاءة",
      value: assetUtilization,
      formula: "(المبيعات ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretAssetUtilization(assetUtilization),
      benchmark: 80,
      status: this.getStatus(assetUtilization, 80, "higher"),
      description: "يقيس مدى كفاءة الشركة في استخدام أصولها لتوليد المبيعات",
      calculation: `(${data.revenue.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
      riskLevel: assetUtilization < 50 ? "high" : assetUtilization < 70 ? "medium" : "low",
    })

    // 3.2 كفاءة رأس المال العامل
    const workingCapital = data.currentAssets - data.currentLiabilities
    const workingCapitalEfficiency = (data.revenue / workingCapital) * 100
    results.push({
      id: "working_capital_efficiency",
      name: "كفاءة رأس المال العامل",
      nameEn: "Working Capital Efficiency",
      category: "الأداء والكفاءة",
      value: workingCapitalEfficiency,
      formula: "(المبيعات ÷ رأس المال العامل) × 100",
      interpretation: this.interpretWorkingCapitalEfficiency(workingCapitalEfficiency),
      benchmark: 400,
      status: this.getStatus(workingCapitalEfficiency, 400, "higher"),
      description: "يقيس كفاءة استخدام رأس المال العامل في توليد المبيعات",
      calculation: `(${data.revenue.toLocaleString()} ÷ ${workingCapital.toLocaleString()}) × 100`,
      riskLevel: workingCapitalEfficiency < 200 ? "high" : workingCapitalEfficiency < 300 ? "medium" : "low",
    })

    // 3.3 كفاءة التشغيل الإجمالية
    const operationalEfficiency = (data.operatingIncome / data.revenue) * 100
    results.push({
      id: "operational_efficiency",
      name: "كفاءة التشغيل الإجمالية",
      nameEn: "Overall Operational Efficiency",
      category: "الأداء والكفاءة",
      value: operationalEfficiency,
      formula: "(الربح التشغيلي ÷ المبيعات) × 100",
      interpretation: this.interpretOperationalEfficiency(operationalEfficiency),
      benchmark: 15,
      status: this.getStatus(operationalEfficiency, 15, "higher"),
      description: "يقيس كفاءة العمليات التشغيلية للشركة",
      calculation: `(${data.operatingIncome.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
      trend: this.calculateTrend(data, "operationalEfficiency"),
    })

    // 3.4 كفاءة إدارة النقدية
    const cashManagementEfficiency = (data.operatingCashFlow / data.cash) * 100
    results.push({
      id: "cash_management_efficiency",
      name: "كفاءة إدارة النقدية",
      nameEn: "Cash Management Efficiency",
      category: "الأداء والكفاءة",
      value: cashManagementEfficiency,
      formula: "(التدفق النقدي التشغيلي ÷ النقدية) × 100",
      interpretation: this.interpretCashManagementEfficiency(cashManagementEfficiency),
      benchmark: 200,
      status: this.getStatus(cashManagementEfficiency, 200, "higher"),
      description: "يقيس كفاءة الشركة في إدارة واستثمار النقدية",
      calculation: `(${data.operatingCashFlow.toLocaleString()} ÷ ${data.cash.toLocaleString()}) × 100`,
      recommendations: this.getCashManagementRecommendations(cashManagementEfficiency),
    })

    // 3.5 مؤشر الأداء المالي المركب
    const compositePerformanceIndex = this.calculateCompositePerformanceIndex(data)
    results.push({
      id: "composite_performance_index",
      name: "مؤشر الأداء المالي المركب",
      nameEn: "Composite Financial Performance Index",
      category: "الأداء والكفاءة",
      value: compositePerformanceIndex,
      formula: "متوسط مرجح للمؤشرات المالية الرئيسية",
      interpretation: this.interpretCompositePerformanceIndex(compositePerformanceIndex),
      benchmark: 70,
      status: this.getStatus(compositePerformanceIndex, 70, "higher"),
      description: "مؤشر شامل يجمع عدة مقاييس للأداء المالي",
      calculation: "حساب مركب من عدة نسب مالية",
      riskLevel: compositePerformanceIndex < 50 ? "high" : compositePerformanceIndex < 65 ? "medium" : "low",
      trend: this.calculateTrend(data, "compositePerformance"),
    })

    return results
  }

  // الدالة الرئيسية لتشغيل جميع التحليلات التطبيقية
  static performAppliedAnalysis(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // 1. المقارنة المتقدمة (3 تحليلات)
    const comparisonAnalysis = this.performAdvancedComparison(data)
    results.push(...comparisonAnalysis)

    // 2. التقييم والاستثمار (13 تحليل)
    const valuationAnalysis = this.performValuationAnalysis(data)
    results.push(...valuationAnalysis)

    // 3. الأداء والكفاءة (5 تحليلات)
    const efficiencyAnalysis = this.performEfficiencyAnalysis(data)
    results.push(...efficiencyAnalysis)

    return results
  }

  // دوال المساعدة والحسابات
  private static calculateWACC(data: FinancialData): number {
    const debtRatio = data.totalLiabilities / data.totalAssets
    const equityRatio = data.totalEquity / data.totalAssets
    const costOfDebt = (data.interestExpense / data.totalLiabilities) * 100
    const costOfEquity = data.riskFreeRate + data.beta * (data.marketReturn - data.riskFreeRate)

    return debtRatio * costOfDebt * (1 - data.taxRate / 100) + equityRatio * costOfEquity
  }

  private static calculateCompositePerformanceIndex(data: FinancialData): number {
    const roe = (data.netIncome / data.totalEquity) * 100
    const roa = (data.netIncome / data.totalAssets) * 100
    const profitMargin = (data.netIncome / data.revenue) * 100
    const assetTurnover = data.revenue / data.totalAssets
    const currentRatio = data.currentAssets / data.currentLiabilities

    // متوسط مرجح للمؤشرات
    return roe * 0.3 + roa * 0.25 + profitMargin * 0.2 + assetTurnover * 10 + currentRatio * 5
  }

  private static calculateSectorComparison(data: FinancialData): AnalysisResult {
    const roe = (data.netIncome / data.totalEquity) * 100
    const industryROE = data.industryAverages!.roe
    const comparison = ((roe - industryROE) / industryROE) * 100

    return {
      id: "sector_comparison",
      name: "مقارنة الأداء القطاعي",
      nameEn: "Sector Performance Comparison",
      category: "المقارنة المتقدمة",
      value: comparison,
      formula: "((أداء الشركة - متوسط القطاع) ÷ متوسط القطاع) × 100",
      interpretation: this.interpretSectorComparison(comparison),
      benchmark: 0,
      status: this.getStatus(comparison, 0, "higher"),
      description: "يقارن أداء الشركة مع متوسط القطاع",
      calculation: `((${roe.toFixed(2)}% - ${industryROE}%) ÷ ${industryROE}%) × 100`,
    }
  }

  private static calculateTimeSeriesComparison(data: FinancialData): AnalysisResult {
    const currentROE = (data.netIncome / data.totalEquity) * 100
    const previousROE =
      (data.historicalData!.previousYear.netIncome! / data.historicalData!.previousYear.totalEquity!) * 100
    const growth = ((currentROE - previousROE) / previousROE) * 100

    return {
      id: "time_series_comparison",
      name: "مقارنة الأداء الزمني",
      nameEn: "Time Series Performance Comparison",
      category: "المقارنة المتقدمة",
      value: growth,
      formula: "((الأداء الحالي - الأداء السابق) ÷ الأداء السابق) × 100",
      interpretation: this.interpretTimeSeriesComparison(growth),
      benchmark: 5,
      status: this.getStatus(growth, 5, "higher"),
      description: "يقارن أداء الشركة عبر الزمن",
      calculation: `((${currentROE.toFixed(2)}% - ${previousROE.toFixed(2)}%) ÷ ${previousROE.toFixed(2)}%) × 100`,
    }
  }

  private static calculateBenchmarkComparison(data: FinancialData): AnalysisResult {
    const performanceScore = this.calculateCompositePerformanceIndex(data)
    const benchmarkScore = 70 // معيار مرجعي
    const comparison = ((performanceScore - benchmarkScore) / benchmarkScore) * 100

    return {
      id: "benchmark_comparison",
      name: "المقارنة المعيارية",
      nameEn: "Benchmark Comparison",
      category: "المقارنة المتقدمة",
      value: comparison,
      formula: "((نقاط الأداء - المعيار المرجعي) ÷ المعيار المرجعي) × 100",
      interpretation: this.interpretBenchmarkComparison(comparison),
      benchmark: 0,
      status: this.getStatus(comparison, 0, "higher"),
      description: "يقارن أداء الشركة مع المعايير المرجعية",
      calculation: `((${performanceScore.toFixed(2)} - ${benchmarkScore}) ÷ ${benchmarkScore}) × 100`,
    }
  }

  private static calculateTrend(data: FinancialData, metric: string): "improving" | "stable" | "declining" {
    // تحليل الاتجاه بناءً على البيانات التاريخية
    if (!data.historicalData) return "stable"

    // منطق تحديد الاتجاه حسب المؤشر
    return "stable" // مبسط للمثال
  }

  // دوال التفسير
  private static interpretPERatio(ratio: number): string {
    if (ratio < 10) return "نسبة منخفضة قد تشير إلى استثمار جيد أو مشاكل في الشركة"
    if (ratio < 20) return "نسبة معقولة تشير إلى تقييم متوازن"
    if (ratio < 30) return "نسبة مرتفعة قد تشير إلى توقعات نمو عالية"
    return "نسبة مرتفعة جداً قد تشير إلى مبالغة في التقييم"
  }

  private static interpretPBRatio(ratio: number): string {
    if (ratio < 1) return "تداول أقل من القيمة الدفترية - فرصة استثمارية محتملة"
    if (ratio < 2) return "تقييم معقول مقارنة بالقيمة الدفترية"
    if (ratio < 3) return "تقييم مرتفع قد يكون مبرراً بالنمو المتوقع"
    return "تقييم مرتفع جداً يتطلب نمو استثنائي لتبريره"
  }

  private static interpretDividendYield(yieldValue: number): string {
    if (yieldValue < 2) return "عائد منخفض - الشركة تركز على النمو أكثر من التوزيعات"
    if (yieldValue < 4) return "عائد معقول للمستثمرين الباحثين عن دخل"
    if (yieldValue < 6) return "عائد جيد لكن قد يشير إلى مخاطر أعلى"
    return "عائد مرتفع جداً قد يشير إلى مشاكل في الشركة"
  }

  private static interpretPayoutRatio(ratio: number): string {
    if (ratio < 30) return "نسبة توزيع منخفضة - الشركة تحتفظ بمعظم الأرباح للنمو"
    if (ratio < 60) return "نسبة توزيع متوازنة بين النمو والتوزيعات"
    if (ratio < 80) return "نسبة توزيع مرتفعة قد تحد من النمو المستقبلي"
    return "نسبة توزيع مرتفعة جداً قد تكون غير مستدامة"
  }

  private static interpretEVA(eva: number): string {
    if (eva > 0) return "الشركة تخلق قيمة اقتصادية إيجابية"
    if (eva > -1000000) return "الشركة تدمر قيمة اقتصادية بسيطة"
    return "الشركة تدمر قيمة اقتصادية كبيرة"
  }

  private static interpretCAPM(expectedReturn: number): string {
    if (expectedReturn < 8) return "عائد متوقع منخفض مقارنة بالمخاطر"
    if (expectedReturn < 12) return "عائد متوقع معقول للمخاطر المتحملة"
    if (expectedReturn < 16) return "عائد متوقع جيد يبرر المخاطر"
    return "عائد متوقع مرتفع لكن مع مخاطر عالية"
  }

  private static interpretPSRatio(ratio: number): string {
    if (ratio < 1) return "تقييم منخفض مقارنة بالمبيعات"
    if (ratio < 3) return "تقييم معقول مقارنة بالمبيعات"
    if (ratio < 5) return "تقييم مرتفع يتطلب هوامش ربح جيدة"
    return "تقييم مرتفع جداً مقارنة بالمبيعات"
  }

  private static interpretPCFRatio(ratio: number): string {
    if (ratio < 8) return "تقييم جذاب مقارنة بالتدفق النقدي"
    if (ratio < 15) return "تقييم معقول مقارنة بالتدفق النقدي"
    if (ratio < 25) return "تقييم مرتفع قد يكون مبرراً بالنمو"
    return "تقييم مرتفع جداً مقارنة بالتدفق النقدي"
  }

  private static interpretMVVARatio(ratio: number): string {
    if (ratio < 2) return "كفاءة عالية في خلق القيمة"
    if (ratio < 4) return "كفاءة معقولة في خلق القيمة"
    if (ratio < 6) return "كفاءة منخفضة في خلق القيمة"
    return "كفاءة ضعيفة جداً في خلق القيمة"
  }

  private static interpretRiskAdjustedReturn(returnValue: number): string {
    if (returnValue > 10) return "عائد ممتاز معدل بالمخاطر"
    if (returnValue > 6) return "عائد جيد معدل بالمخاطر"
    if (returnValue > 3) return "عائد معقول معدل بالمخاطر"
    return "عائد ضعيف معدل بالمخاطر"
  }

  private static interpretMVRRRatio(ratio: number): string {
    if (ratio < 3) return "تقييم جذاب مقارنة بالإيرادات المتكررة"
    if (ratio < 6) return "تقييم معقول للإيرادات المتكررة"
    if (ratio < 10) return "تقييم مرتفع للإيرادات المتكررة"
    return "تقييم مرتفع جداً للإيرادات المتكررة"
  }

  private static interpretEBITDAMultiple(multiple: number): string {
    if (multiple < 5) return "مضاعف منخفض - فرصة استثمارية محتملة"
    if (multiple < 10) return "مضاعف معقول للأرباح التشغيلية"
    if (multiple < 15) return "مضاعف مرتفع يتطلب نمو قوي"
    return "مضاعف مرتفع جداً للأرباح التشغيلية"
  }

  private static interpretPTBVRatio(ratio: number): string {
    if (ratio < 1.5) return "تقييم جذاب مقارنة بالأصول الملموسة"
    if (ratio < 2.5) return "تقييم معقول للأصول الملموسة"
    if (ratio < 4) return "تقييم مرتفع للأصول الملموسة"
    return "تقييم مرتفع جداً للأصول الملموسة"
  }

  private static interpretAssetUtilization(efficiency: number): string {
    if (efficiency > 100) return "كفاءة ممتازة في استخدام الأصول"
    if (efficiency > 70) return "كفاءة جيدة في استخدام الأصول"
    if (efficiency > 50) return "كفاءة متوسطة في استخدام الأصول"
    return "كفاءة ضعيفة في استخدام الأصول"
  }

  private static interpretWorkingCapitalEfficiency(efficiency: number): string {
    if (efficiency > 500) return "كفاءة ممتازة في إدارة رأس المال العامل"
    if (efficiency > 300) return "كفاءة جيدة في إدارة رأس المال العامل"
    if (efficiency > 200) return "كفاءة متوسطة في إدارة رأس المال العامل"
    return "كفاءة ضعيفة في إدارة رأس المال العامل"
  }

  private static interpretOperationalEfficiency(efficiency: number): string {
    if (efficiency > 20) return "كفاءة تشغيلية ممتازة"
    if (efficiency > 15) return "كفاءة تشغيلية جيدة"
    if (efficiency > 10) return "كفاءة تشغيلية متوسطة"
    return "كفاءة تشغيلية ضعيفة"
  }

  private static interpretCashManagementEfficiency(efficiency: number): string {
    if (efficiency > 300) return "إدارة نقدية ممتازة"
    if (efficiency > 200) return "إدارة نقدية جيدة"
    if (efficiency > 100) return "إدارة نقدية متوسطة"
    return "إدارة نقدية ضعيفة"
  }

  private static interpretCompositePerformanceIndex(index: number): string {
    if (index > 80) return "أداء مالي ممتاز"
    if (index > 70) return "أداء مالي جيد"
    if (index > 60) return "أداء مالي متوسط"
    return "أداء مالي ضعيف"
  }

  private static interpretSectorComparison(comparison: number): string {
    if (comparison > 20) return "أداء متفوق بشكل كبير على القطاع"
    if (comparison > 10) return "أداء أفضل من متوسط القطاع"
    if (comparison > -10) return "أداء مماثل لمتوسط القطاع"
    return "أداء أضعف من متوسط القطاع"
  }

  private static interpretTimeSeriesComparison(growth: number): string {
    if (growth > 15) return "نمو ممتاز في الأداء"
    if (growth > 5) return "نمو جيد في الأداء"
    if (growth > -5) return "أداء مستقر"
    return "تراجع في الأداء"
  }

  private static interpretBenchmarkComparison(comparison: number): string {
    if (comparison > 20) return "أداء متفوق على المعايير المرجعية"
    if (comparison > 0) return "أداء أفضل من المعايير المرجعية"
    if (comparison > -20) return "أداء قريب من المعايير المرجعية"
    return "أداء أضعف من المعايير المرجعية"
  }

  // دوال التوصيات
  private static getPERecommendations(ratio: number): string[] {
    if (ratio < 10) return ["فحص أسباب انخفاض التقييم", "تقييم الفرص الاستثمارية"]
    if (ratio < 20) return ["مراقبة الأداء المستقبلي", "مقارنة مع الشركات المماثلة"]
    return ["تقييم مبررات التقييم المرتفع", "مراجعة توقعات النمو"]
  }

  private static getPBRecommendations(ratio: number): string[] {
    if (ratio < 1) return ["تحليل أسباب التداول تحت القيمة الدفترية", "تقييم جودة الأصول"]
    if (ratio < 2) return ["مراقبة الأداء التشغيلي", "مقارنة مع القطاع"]
    return ["مراجعة مبررات التقييم المرتفع", "تحليل النمو المتوقع"]
  }

  private static getCashManagementRecommendations(efficiency: number): string[] {
    if (efficiency < 100) return ["تحسين إدارة النقدية", "استثمار الفوائض النقدية"]
    if (efficiency < 200) return ["تطوير استراتيجية النقدية", "مراجعة السياسات النقدية"]
    return ["الحفاظ على الكفاءة الحالية", "مراقبة التدفقات النقدية"]
  }

  // دالة مساعدة لتحديد الحالة
  private static getStatus(
    value: number,
    benchmark: number,
    type: "higher" | "lower" | "optimal",
  ): "excellent" | "good" | "average" | "poor" | "critical" {
    const ratio = value / benchmark

    if (type === "higher") {
      if (ratio >= 1.2) return "excellent"
      if (ratio >= 1.1) return "good"
      if (ratio >= 0.9) return "average"
      if (ratio >= 0.7) return "poor"
      return "critical"
    } else if (type === "lower") {
      if (ratio <= 0.8) return "excellent"
      if (ratio <= 0.9) return "good"
      if (ratio <= 1.1) return "average"
      if (ratio <= 1.3) return "poor"
      return "critical"
    } else {
      // optimal
      if (ratio >= 0.9 && ratio <= 1.1) return "excellent"
      if (ratio >= 0.8 && ratio <= 1.2) return "good"
      if (ratio >= 0.7 && ratio <= 1.3) return "average"
      if (ratio >= 0.6 && ratio <= 1.4) return "poor"
      return "critical"
    }
  }
}
