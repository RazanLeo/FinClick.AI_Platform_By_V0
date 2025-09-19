// محرك التحليل الأساسي الكلاسيكي - 106 تحليل مالي

export interface FinancialData {
  // بيانات الميزانية العمومية
  totalAssets: number
  currentAssets: number
  fixedAssets: number
  cash: number
  inventory: number
  accountsReceivable: number
  totalLiabilities: number
  currentLiabilities: number
  longTermDebt: number
  totalEquity: number

  // بيانات قائمة الدخل
  revenue: number
  grossProfit: number
  operatingIncome: number
  netIncome: number
  costOfGoodsSold: number
  operatingExpenses: number
  interestExpense: number

  // بيانات التدفق النقدي
  operatingCashFlow: number
  investingCashFlow: number
  financingCashFlow: number
  freeCashFlow: number

  // بيانات السوق
  marketValue: number
  sharesOutstanding: number
  stockPrice: number

  // بيانات إضافية
  year: number
  sector: string
  industry: string
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
}

export class BasicAnalysisEngine {
  // 1. التحليل الهيكلي (13 تحليل)
  static performStructuralAnalysis(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // 1.1 تحليل هيكل الأصول
    results.push({
      id: "asset_structure_current",
      name: "نسبة الأصول المتداولة",
      nameEn: "Current Assets Ratio",
      category: "التحليل الهيكلي",
      value: (data.currentAssets / data.totalAssets) * 100,
      formula: "(الأصول المتداولة ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretAssetStructure((data.currentAssets / data.totalAssets) * 100, "current"),
      benchmark: 40,
      status: this.getStatus((data.currentAssets / data.totalAssets) * 100, 40, "higher"),
      description: "تقيس نسبة الأصول المتداولة من إجمالي الأصول وتشير إلى مرونة الشركة المالية",
      calculation: `(${data.currentAssets.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    results.push({
      id: "asset_structure_fixed",
      name: "نسبة الأصول الثابتة",
      nameEn: "Fixed Assets Ratio",
      category: "التحليل الهيكلي",
      value: (data.fixedAssets / data.totalAssets) * 100,
      formula: "(الأصول الثابتة ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretAssetStructure((data.fixedAssets / data.totalAssets) * 100, "fixed"),
      benchmark: 60,
      status: this.getStatus((data.fixedAssets / data.totalAssets) * 100, 60, "optimal"),
      description: "تقيس نسبة الأصول الثابتة من إجمالي الأصول وتشير إلى طبيعة استثمارات الشركة",
      calculation: `(${data.fixedAssets.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // 1.2 تحليل هيكل رأس المال
    results.push({
      id: "capital_structure_debt",
      name: "نسبة الديون إلى إجمالي رأس المال",
      nameEn: "Debt to Total Capital Ratio",
      category: "التحليل الهيكلي",
      value: (data.totalLiabilities / (data.totalLiabilities + data.totalEquity)) * 100,
      formula: "(إجمالي الديون ÷ (إجمالي الديون + حقوق الملكية)) × 100",
      interpretation: this.interpretCapitalStructure(
        (data.totalLiabilities / (data.totalLiabilities + data.totalEquity)) * 100,
      ),
      benchmark: 50,
      status: this.getStatus((data.totalLiabilities / (data.totalLiabilities + data.totalEquity)) * 100, 50, "lower"),
      description: "تقيس نسبة الديون في هيكل رأس المال وتشير إلى مستوى المخاطر المالية",
      calculation: `(${data.totalLiabilities.toLocaleString()} ÷ ${(data.totalLiabilities + data.totalEquity).toLocaleString()}) × 100`,
    })

    results.push({
      id: "capital_structure_equity",
      name: "نسبة حقوق الملكية إلى إجمالي رأس المال",
      nameEn: "Equity to Total Capital Ratio",
      category: "التحليل الهيكلي",
      value: (data.totalEquity / (data.totalLiabilities + data.totalEquity)) * 100,
      formula: "(حقوق الملكية ÷ (إجمالي الديون + حقوق الملكية)) × 100",
      interpretation: this.interpretEquityStructure(
        (data.totalEquity / (data.totalLiabilities + data.totalEquity)) * 100,
      ),
      benchmark: 50,
      status: this.getStatus((data.totalEquity / (data.totalLiabilities + data.totalEquity)) * 100, 50, "higher"),
      description: "تقيس نسبة حقوق الملكية في هيكل رأس المال وتشير إلى قوة المركز المالي",
      calculation: `(${data.totalEquity.toLocaleString()} ÷ ${(data.totalLiabilities + data.totalEquity).toLocaleString()}) × 100`,
    })

    // 1.3 تحليل هيكل الإيرادات
    const grossMargin = (data.grossProfit / data.revenue) * 100
    results.push({
      id: "revenue_structure_gross_margin",
      name: "هامش الربح الإجمالي",
      nameEn: "Gross Profit Margin",
      category: "التحليل الهيكلي",
      value: grossMargin,
      formula: "(الربح الإجمالي ÷ الإيرادات) × 100",
      interpretation: this.interpretGrossMargin(grossMargin),
      benchmark: 25,
      status: this.getStatus(grossMargin, 25, "higher"),
      description: "يقيس كفاءة الشركة في إدارة تكلفة البضاعة المباعة",
      calculation: `(${data.grossProfit.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    const operatingMargin = (data.operatingIncome / data.revenue) * 100
    results.push({
      id: "revenue_structure_operating_margin",
      name: "هامش الربح التشغيلي",
      nameEn: "Operating Profit Margin",
      category: "التحليل الهيكلي",
      value: operatingMargin,
      formula: "(الربح التشغيلي ÷ الإيرادات) × 100",
      interpretation: this.interpretOperatingMargin(operatingMargin),
      benchmark: 15,
      status: this.getStatus(operatingMargin, 15, "higher"),
      description: "يقيس كفاءة الشركة في إدارة العمليات التشغيلية",
      calculation: `(${data.operatingIncome.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    const netMargin = (data.netIncome / data.revenue) * 100
    results.push({
      id: "revenue_structure_net_margin",
      name: "هامش الربح الصافي",
      nameEn: "Net Profit Margin",
      category: "التحليل الهيكلي",
      value: netMargin,
      formula: "(الربح الصافي ÷ الإيرادات) × 100",
      interpretation: this.interpretNetMargin(netMargin),
      benchmark: 10,
      status: this.getStatus(netMargin, 10, "higher"),
      description: "يقيس الربحية الإجمالية للشركة بعد جميع المصروفات",
      calculation: `(${data.netIncome.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // 1.4 تحليل هيكل التكاليف
    const costRatio = (data.costOfGoodsSold / data.revenue) * 100
    results.push({
      id: "cost_structure_cogs",
      name: "نسبة تكلفة البضاعة المباعة",
      nameEn: "Cost of Goods Sold Ratio",
      category: "التحليل الهيكلي",
      value: costRatio,
      formula: "(تكلفة البضاعة المباعة ÷ الإيرادات) × 100",
      interpretation: this.interpretCostRatio(costRatio),
      benchmark: 70,
      status: this.getStatus(costRatio, 70, "lower"),
      description: "تقيس نسبة تكلفة البضاعة المباعة من الإيرادات",
      calculation: `(${data.costOfGoodsSold.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    const opexRatio = (data.operatingExpenses / data.revenue) * 100
    results.push({
      id: "cost_structure_opex",
      name: "نسبة المصروفات التشغيلية",
      nameEn: "Operating Expenses Ratio",
      category: "التحليل الهيكلي",
      value: opexRatio,
      formula: "(المصروفات التشغيلية ÷ الإيرادات) × 100",
      interpretation: this.interpretOpexRatio(opexRatio),
      benchmark: 20,
      status: this.getStatus(opexRatio, 20, "lower"),
      description: "تقيس نسبة المصروفات التشغيلية من الإيرادات",
      calculation: `(${data.operatingExpenses.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // 1.5 تحليل هيكل السيولة
    const cashRatio = (data.cash / data.totalAssets) * 100
    results.push({
      id: "liquidity_structure_cash",
      name: "نسبة النقدية من الأصول",
      nameEn: "Cash to Assets Ratio",
      category: "التحليل الهيكلي",
      value: cashRatio,
      formula: "(النقدية ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretCashRatio(cashRatio),
      benchmark: 10,
      status: this.getStatus(cashRatio, 10, "optimal"),
      description: "تقيس نسبة النقدية المتاحة من إجمالي الأصول",
      calculation: `(${data.cash.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // 1.6 تحليل هيكل المخزون
    const inventoryRatio = (data.inventory / data.totalAssets) * 100
    results.push({
      id: "inventory_structure",
      name: "نسبة المخزون من الأصول",
      nameEn: "Inventory to Assets Ratio",
      category: "التحليل الهيكلي",
      value: inventoryRatio,
      formula: "(المخزون ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretInventoryRatio(inventoryRatio),
      benchmark: 15,
      status: this.getStatus(inventoryRatio, 15, "optimal"),
      description: "تقيس نسبة المخزون من إجمالي الأصول",
      calculation: `(${data.inventory.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // 1.7 تحليل هيكل الذمم المدينة
    const receivablesRatio = (data.accountsReceivable / data.totalAssets) * 100
    results.push({
      id: "receivables_structure",
      name: "نسبة الذمم المدينة من الأصول",
      nameEn: "Receivables to Assets Ratio",
      category: "التحليل الهيكلي",
      value: receivablesRatio,
      formula: "(الذمم المدينة ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretReceivablesRatio(receivablesRatio),
      benchmark: 12,
      status: this.getStatus(receivablesRatio, 12, "optimal"),
      description: "تقيس نسبة الذمم المدينة من إجمالي الأصول",
      calculation: `(${data.accountsReceivable.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // 1.8 تحليل هيكل الديون قصيرة الأجل
    const shortTermDebtRatio = (data.currentLiabilities / data.totalLiabilities) * 100
    results.push({
      id: "short_term_debt_structure",
      name: "نسبة الديون قصيرة الأجل",
      nameEn: "Short-term Debt Ratio",
      category: "التحليل الهيكلي",
      value: shortTermDebtRatio,
      formula: "(الالتزامات المتداولة ÷ إجمالي الالتزامات) × 100",
      interpretation: this.interpretShortTermDebtRatio(shortTermDebtRatio),
      benchmark: 60,
      status: this.getStatus(shortTermDebtRatio, 60, "lower"),
      description: "تقيس نسبة الديون قصيرة الأجل من إجمالي الديون",
      calculation: `(${data.currentLiabilities.toLocaleString()} ÷ ${data.totalLiabilities.toLocaleString()}) × 100`,
    })

    return results
  }

  // 2. النسب المالية (75 نسبة)
  static performFinancialRatiosAnalysis(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // 2.1 نسب السيولة (10 نسب)
    const liquidityRatios = this.calculateLiquidityRatios(data)
    results.push(...liquidityRatios)

    // 2.2 نسب النشاط/الكفاءة (15 نسبة)
    const activityRatios = this.calculateActivityRatios(data)
    results.push(...activityRatios)

    // 2.3 نسب الربحية (20 نسبة)
    const profitabilityRatios = this.calculateProfitabilityRatios(data)
    results.push(...profitabilityRatios)

    // 2.4 نسب المديونية/الرافعة (15 نسبة)
    const leverageRatios = this.calculateLeverageRatios(data)
    results.push(...leverageRatios)

    // 2.5 نسب السوق (15 نسبة)
    const marketRatios = this.calculateMarketRatios(data)
    results.push(...marketRatios)

    return results
  }

  // 2.1 نسب السيولة (10 نسب)
  static calculateLiquidityRatios(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // النسبة الجارية
    const currentRatio = data.currentAssets / data.currentLiabilities
    results.push({
      id: "current_ratio",
      name: "النسبة الجارية",
      nameEn: "Current Ratio",
      category: "نسب السيولة",
      value: currentRatio,
      formula: "الأصول المتداولة ÷ الالتزامات المتداولة",
      interpretation: this.interpretCurrentRatio(currentRatio),
      benchmark: 2.0,
      status: this.getStatus(currentRatio, 2.0, "higher"),
      description: "تقيس قدرة الشركة على سداد التزاماتها قصيرة الأجل",
      calculation: `${data.currentAssets.toLocaleString()} ÷ ${data.currentLiabilities.toLocaleString()}`,
    })

    // النسبة السريعة
    const quickRatio = (data.currentAssets - data.inventory) / data.currentLiabilities
    results.push({
      id: "quick_ratio",
      name: "النسبة السريعة",
      nameEn: "Quick Ratio",
      category: "نسب السيولة",
      value: quickRatio,
      formula: "(الأصول المتداولة - المخزون) ÷ الالتزامات المتداولة",
      interpretation: this.interpretQuickRatio(quickRatio),
      benchmark: 1.0,
      status: this.getStatus(quickRatio, 1.0, "higher"),
      description: "تقيس قدرة الشركة على سداد التزاماتها قصيرة الأجل دون الاعتماد على المخزون",
      calculation: `(${data.currentAssets.toLocaleString()} - ${data.inventory.toLocaleString()}) ÷ ${data.currentLiabilities.toLocaleString()}`,
    })

    // النسبة النقدية
    const cashRatio = data.cash / data.currentLiabilities
    results.push({
      id: "cash_ratio",
      name: "النسبة النقدية",
      nameEn: "Cash Ratio",
      category: "نسب السيولة",
      value: cashRatio,
      formula: "النقدية ÷ الالتزامات المتداولة",
      interpretation: this.interpretCashRatioLiquidity(cashRatio),
      benchmark: 0.2,
      status: this.getStatus(cashRatio, 0.2, "higher"),
      description: "تقيس قدرة الشركة على سداد التزاماتها قصيرة الأجل بالنقد المتاح فقط",
      calculation: `${data.cash.toLocaleString()} ÷ ${data.currentLiabilities.toLocaleString()}`,
    })

    // نسبة رأس المال العامل
    const workingCapitalRatio = (data.currentAssets - data.currentLiabilities) / data.totalAssets
    results.push({
      id: "working_capital_ratio",
      name: "نسبة رأس المال العامل",
      nameEn: "Working Capital Ratio",
      category: "نسب السيولة",
      value: workingCapitalRatio,
      formula: "(الأصول المتداولة - الالتزامات المتداولة) ÷ إجمالي الأصول",
      interpretation: this.interpretWorkingCapitalRatio(workingCapitalRatio),
      benchmark: 0.1,
      status: this.getStatus(workingCapitalRatio, 0.1, "higher"),
      description: "تقيس نسبة رأس المال العامل من إجمالي الأصول",
      calculation: `(${data.currentAssets.toLocaleString()} - ${data.currentLiabilities.toLocaleString()}) ÷ ${data.totalAssets.toLocaleString()}`,
    })

    // نسبة السيولة المطلقة
    const absoluteLiquidityRatio = data.cash / data.totalAssets
    results.push({
      id: "absolute_liquidity_ratio",
      name: "نسبة السيولة المطلقة",
      nameEn: "Absolute Liquidity Ratio",
      category: "نسب السيولة",
      value: absoluteLiquidityRatio,
      formula: "النقدية ÷ إجمالي الأصول",
      interpretation: this.interpretAbsoluteLiquidityRatio(absoluteLiquidityRatio),
      benchmark: 0.05,
      status: this.getStatus(absoluteLiquidityRatio, 0.05, "higher"),
      description: "تقيس نسبة النقدية المتاحة من إجمالي الأصول",
      calculation: `${data.cash.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}`,
    })

    // نسبة السيولة الحمضية
    const acidTestRatio = (data.cash + data.accountsReceivable) / data.currentLiabilities
    results.push({
      id: "acid_test_ratio",
      name: "نسبة الاختبار الحمضي",
      nameEn: "Acid Test Ratio",
      category: "نسب السيولة",
      value: acidTestRatio,
      formula: "(النقدية + الذمم المدينة) ÷ الالتزامات المتداولة",
      interpretation: this.interpretAcidTestRatio(acidTestRatio),
      benchmark: 0.8,
      status: this.getStatus(acidTestRatio, 0.8, "higher"),
      description: "تقيس قدرة الشركة على سداد التزاماتها بالأصول السائلة فقط",
      calculation: `(${data.cash.toLocaleString()} + ${data.accountsReceivable.toLocaleString()}) ÷ ${data.currentLiabilities.toLocaleString()}`,
    })

    // نسبة التدفق النقدي التشغيلي إلى الالتزامات المتداولة
    const operatingCashFlowRatio = data.operatingCashFlow / data.currentLiabilities
    results.push({
      id: "operating_cash_flow_ratio",
      name: "نسبة التدفق النقدي التشغيلي",
      nameEn: "Operating Cash Flow Ratio",
      category: "نسب السيولة",
      value: operatingCashFlowRatio,
      formula: "التدفق النقدي التشغيلي ÷ الالتزامات المتداولة",
      interpretation: this.interpretOperatingCashFlowRatio(operatingCashFlowRatio),
      benchmark: 0.4,
      status: this.getStatus(operatingCashFlowRatio, 0.4, "higher"),
      description: "تقيس قدرة الشركة على توليد نقد من العمليات لسداد الالتزامات",
      calculation: `${data.operatingCashFlow.toLocaleString()} ÷ ${data.currentLiabilities.toLocaleString()}`,
    })

    // نسبة الأصول السائلة
    const liquidAssetsRatio = (data.cash + data.accountsReceivable) / data.totalAssets
    results.push({
      id: "liquid_assets_ratio",
      name: "نسبة الأصول السائلة",
      nameEn: "Liquid Assets Ratio",
      category: "نسب السيولة",
      value: liquidAssetsRatio,
      formula: "(النقدية + الذمم المدينة) ÷ إجمالي الأصول",
      interpretation: this.interpretLiquidAssetsRatio(liquidAssetsRatio),
      benchmark: 0.15,
      status: this.getStatus(liquidAssetsRatio, 0.15, "higher"),
      description: "تقيس نسبة الأصول السائلة من إجمالي الأصول",
      calculation: `(${data.cash.toLocaleString()} + ${data.accountsReceivable.toLocaleString()}) ÷ ${data.totalAssets.toLocaleString()}`,
    })

    // نسبة الدفاع الأساسية
    const basicDefenseRatio = (data.cash + data.accountsReceivable) / (data.operatingExpenses / 365)
    results.push({
      id: "basic_defense_ratio",
      name: "نسبة الدفاع الأساسية",
      nameEn: "Basic Defense Ratio",
      category: "نسب السيولة",
      value: basicDefenseRatio,
      formula: "(النقدية + الذمم المدينة) ÷ (المصروفات التشغيلية اليومية)",
      interpretation: this.interpretBasicDefenseRatio(basicDefenseRatio),
      benchmark: 90,
      status: this.getStatus(basicDefenseRatio, 90, "higher"),
      description: "تقيس عدد الأيام التي يمكن للشركة البقاء فيها بالأصول السائلة",
      calculation: `(${data.cash.toLocaleString()} + ${data.accountsReceivable.toLocaleString()}) ÷ ${(data.operatingExpenses / 365).toLocaleString()}`,
    })

    // نسبة الفترة الدفاعية
    const defensiveIntervalRatio = data.currentAssets / (data.operatingExpenses / 365)
    results.push({
      id: "defensive_interval_ratio",
      name: "نسبة الفترة الدفاعية",
      nameEn: "Defensive Interval Ratio",
      category: "نسب السيولة",
      value: defensiveIntervalRatio,
      formula: "الأصول المتداولة ÷ (المصروفات التشغيلية اليومية)",
      interpretation: this.interpretDefensiveIntervalRatio(defensiveIntervalRatio),
      benchmark: 120,
      status: this.getStatus(defensiveIntervalRatio, 120, "higher"),
      description: "تقيس عدد الأيام التي يمكن للشركة البقاء فيها بالأصول المتداولة",
      calculation: `${data.currentAssets.toLocaleString()} ÷ ${(data.operatingExpenses / 365).toLocaleString()}`,
    })

    return results
  }

  // 2.2 نسب النشاط/الكفاءة (15 نسبة)
  static calculateActivityRatios(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // معدل دوران المخزون
    const inventoryTurnover = data.costOfGoodsSold / data.inventory
    results.push({
      id: "inventory_turnover",
      name: "معدل دوران المخزون",
      nameEn: "Inventory Turnover",
      category: "نسب النشاط",
      value: inventoryTurnover,
      formula: "تكلفة البضاعة المباعة ÷ متوسط المخزون",
      interpretation: this.interpretInventoryTurnover(inventoryTurnover),
      benchmark: 6,
      status: this.getStatus(inventoryTurnover, 6, "higher"),
      description: "يقيس كفاءة الشركة في إدارة المخزون",
      calculation: `${data.costOfGoodsSold.toLocaleString()} ÷ ${data.inventory.toLocaleString()}`,
    })

    // فترة دوران المخزون (بالأيام)
    const inventoryDays = 365 / inventoryTurnover
    results.push({
      id: "inventory_days",
      name: "فترة دوران المخزون",
      nameEn: "Days Sales in Inventory",
      category: "نسب النشاط",
      value: inventoryDays,
      formula: "365 ÷ معدل دوران المخزون",
      interpretation: this.interpretInventoryDays(inventoryDays),
      benchmark: 60,
      status: this.getStatus(inventoryDays, 60, "lower"),
      description: "عدد الأيام اللازمة لبيع المخزون",
      calculation: `365 ÷ ${inventoryTurnover.toFixed(2)}`,
    })

    // معدل دوران الذمم المدينة
    const receivablesTurnover = data.revenue / data.accountsReceivable
    results.push({
      id: "receivables_turnover",
      name: "معدل دوران الذمم المدينة",
      nameEn: "Receivables Turnover",
      category: "نسب النشاط",
      value: receivablesTurnover,
      formula: "المبيعات ÷ متوسط الذمم المدينة",
      interpretation: this.interpretReceivablesTurnover(receivablesTurnover),
      benchmark: 8,
      status: this.getStatus(receivablesTurnover, 8, "higher"),
      description: "يقيس كفاءة الشركة في تحصيل الذمم المدينة",
      calculation: `${data.revenue.toLocaleString()} ÷ ${data.accountsReceivable.toLocaleString()}`,
    })

    // فترة التحصيل (بالأيام)
    const collectionPeriod = 365 / receivablesTurnover
    results.push({
      id: "collection_period",
      name: "فترة التحصيل",
      nameEn: "Days Sales Outstanding",
      category: "نسب النشاط",
      value: collectionPeriod,
      formula: "365 ÷ معدل دوران الذمم المدينة",
      interpretation: this.interpretCollectionPeriod(collectionPeriod),
      benchmark: 45,
      status: this.getStatus(collectionPeriod, 45, "lower"),
      description: "متوسط عدد الأيام لتحصيل الذمم المدينة",
      calculation: `365 ÷ ${receivablesTurnover.toFixed(2)}`,
    })

    // معدل دوران الأصول
    const assetTurnover = data.revenue / data.totalAssets
    results.push({
      id: "asset_turnover",
      name: "معدل دوران الأصول",
      nameEn: "Asset Turnover",
      category: "نسب النشاط",
      value: assetTurnover,
      formula: "المبيعات ÷ متوسط إجمالي الأصول",
      interpretation: this.interpretAssetTurnover(assetTurnover),
      benchmark: 1.5,
      status: this.getStatus(assetTurnover, 1.5, "higher"),
      description: "يقيس كفاءة الشركة في استخدام أصولها لتوليد المبيعات",
      calculation: `${data.revenue.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}`,
    })

    // معدل دوران الأصول الثابتة
    const fixedAssetTurnover = data.revenue / data.fixedAssets
    results.push({
      id: "fixed_asset_turnover",
      name: "معدل دوران الأصول الثابتة",
      nameEn: "Fixed Asset Turnover",
      category: "نسب النشاط",
      value: fixedAssetTurnover,
      formula: "المبيعات ÷ متوسط الأصول الثابتة",
      interpretation: this.interpretFixedAssetTurnover(fixedAssetTurnover),
      benchmark: 3,
      status: this.getStatus(fixedAssetTurnover, 3, "higher"),
      description: "يقيس كفاءة الشركة في استخدام أصولها الثابتة",
      calculation: `${data.revenue.toLocaleString()} ÷ ${data.fixedAssets.toLocaleString()}`,
    })

    // معدل دوران رأس المال العامل
    const workingCapital = data.currentAssets - data.currentLiabilities
    const workingCapitalTurnover = data.revenue / workingCapital
    results.push({
      id: "working_capital_turnover",
      name: "معدل دوران رأس المال العامل",
      nameEn: "Working Capital Turnover",
      category: "نسب النشاط",
      value: workingCapitalTurnover,
      formula: "المبيعات ÷ رأس المال العامل",
      interpretation: this.interpretWorkingCapitalTurnover(workingCapitalTurnover),
      benchmark: 5,
      status: this.getStatus(workingCapitalTurnover, 5, "higher"),
      description: "يقيس كفاءة الشركة في استخدام رأس المال العامل",
      calculation: `${data.revenue.toLocaleString()} ÷ ${workingCapital.toLocaleString()}`,
    })

    // معدل دوران النقدية
    const cashTurnover = data.revenue / data.cash
    results.push({
      id: "cash_turnover",
      name: "معدل دوران النقدية",
      nameEn: "Cash Turnover",
      category: "نسب النشاط",
      value: cashTurnover,
      formula: "المبيعات ÷ النقدية",
      interpretation: this.interpretCashTurnover(cashTurnover),
      benchmark: 10,
      status: this.getStatus(cashTurnover, 10, "higher"),
      description: "يقيس كفاءة الشركة في استخدام النقدية",
      calculation: `${data.revenue.toLocaleString()} ÷ ${data.cash.toLocaleString()}`,
    })

    // معدل دوران حقوق الملكية
    const equityTurnover = data.revenue / data.totalEquity
    results.push({
      id: "equity_turnover",
      name: "معدل دوران حقوق الملكية",
      nameEn: "Equity Turnover",
      category: "نسب النشاط",
      value: equityTurnover,
      formula: "المبيعات ÷ متوسط حقوق الملكية",
      interpretation: this.interpretEquityTurnover(equityTurnover),
      benchmark: 2,
      status: this.getStatus(equityTurnover, 2, "higher"),
      description: "يقيس كفاءة الشركة في استخدام حقوق الملكية",
      calculation: `${data.revenue.toLocaleString()} ÷ ${data.totalEquity.toLocaleString()}`,
    })

    // دورة التشغيل
    const operatingCycle = inventoryDays + collectionPeriod
    results.push({
      id: "operating_cycle",
      name: "دورة التشغيل",
      nameEn: "Operating Cycle",
      category: "نسب النشاط",
      value: operatingCycle,
      formula: "فترة دوران المخزون + فترة التحصيل",
      interpretation: this.interpretOperatingCycle(operatingCycle),
      benchmark: 90,
      status: this.getStatus(operatingCycle, 90, "lower"),
      description: "الوقت اللازم لتحويل المخزون إلى نقد",
      calculation: `${inventoryDays.toFixed(0)} + ${collectionPeriod.toFixed(0)}`,
    })

    // دورة التحويل النقدي
    const paymentPeriod = (data.currentLiabilities / data.costOfGoodsSold) * 365
    const cashConversionCycle = operatingCycle - paymentPeriod
    results.push({
      id: "cash_conversion_cycle",
      name: "دورة التحويل النقدي",
      nameEn: "Cash Conversion Cycle",
      category: "نسب النشاط",
      value: cashConversionCycle,
      formula: "دورة التشغيل - فترة السداد",
      interpretation: this.interpretCashConversionCycle(cashConversionCycle),
      benchmark: 60,
      status: this.getStatus(cashConversionCycle, 60, "lower"),
      description: "الوقت بين الاستثمار النقدي والتحصيل النقدي",
      calculation: `${operatingCycle.toFixed(0)} - ${paymentPeriod.toFixed(0)}`,
    })

    // معدل دوران إجمالي رأس المال
    const totalCapitalTurnover = data.revenue / (data.totalLiabilities + data.totalEquity)
    results.push({
      id: "total_capital_turnover",
      name: "معدل دوران إجمالي رأس المال",
      nameEn: "Total Capital Turnover",
      category: "نسب النشاط",
      value: totalCapitalTurnover,
      formula: "المبيعات ÷ إجمالي رأس المال",
      interpretation: this.interpretTotalCapitalTurnover(totalCapitalTurnover),
      benchmark: 1.2,
      status: this.getStatus(totalCapitalTurnover, 1.2, "higher"),
      description: "يقيس كفاءة الشركة في استخدام إجمالي رأس المال",
      calculation: `${data.revenue.toLocaleString()} ÷ ${(data.totalLiabilities + data.totalEquity).toLocaleString()}`,
    })

    // كفاءة استخدام الأصول المتداولة
    const currentAssetTurnover = data.revenue / data.currentAssets
    results.push({
      id: "current_asset_turnover",
      name: "معدل دوران الأصول المتداولة",
      nameEn: "Current Asset Turnover",
      category: "نسب النشاط",
      value: currentAssetTurnover,
      formula: "المبيعات ÷ متوسط الأصول المتداولة",
      interpretation: this.interpretCurrentAssetTurnover(currentAssetTurnover),
      benchmark: 4,
      status: this.getStatus(currentAssetTurnover, 4, "higher"),
      description: "يقيس كفاءة الشركة في استخدام أصولها المتداولة",
      calculation: `${data.revenue.toLocaleString()} ÷ ${data.currentAssets.toLocaleString()}`,
    })

    // معدل استخدام الطاقة الإنتاجية
    const capacityUtilization = (data.revenue / data.fixedAssets) * 100
    results.push({
      id: "capacity_utilization",
      name: "معدل استخدام الطاقة الإنتاجية",
      nameEn: "Capacity Utilization Rate",
      category: "نسب النشاط",
      value: capacityUtilization,
      formula: "(المبيعات ÷ الأصول الثابتة) × 100",
      interpretation: this.interpretCapacityUtilization(capacityUtilization),
      benchmark: 80,
      status: this.getStatus(capacityUtilization, 80, "higher"),
      description: "يقيس مدى استغلال الطاقة الإنتاجية للشركة",
      calculation: `(${data.revenue.toLocaleString()} ÷ ${data.fixedAssets.toLocaleString()}) × 100`,
    })

    return results
  }

  // 2.3 نسب الربحية (20 نسبة)
  static calculateProfitabilityRatios(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // العائد على الأصول (ROA)
    const roa = (data.netIncome / data.totalAssets) * 100
    results.push({
      id: "return_on_assets",
      name: "العائد على الأصول",
      nameEn: "Return on Assets (ROA)",
      category: "نسب الربحية",
      value: roa,
      formula: "(الربح الصافي ÷ متوسط إجمالي الأصول) × 100",
      interpretation: this.interpretROA(roa),
      benchmark: 8,
      status: this.getStatus(roa, 8, "higher"),
      description: "يقيس كفاءة الشركة في استخدام أصولها لتوليد الأرباح",
      calculation: `(${data.netIncome.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // العائد على حقوق الملكية (ROE)
    const roe = (data.netIncome / data.totalEquity) * 100
    results.push({
      id: "return_on_equity",
      name: "العائد على حقوق الملكية",
      nameEn: "Return on Equity (ROE)",
      category: "نسب الربحية",
      value: roe,
      formula: "(الربح الصافي ÷ متوسط حقوق الملكية) × 100",
      interpretation: this.interpretROE(roe),
      benchmark: 15,
      status: this.getStatus(roe, 15, "higher"),
      description: "يقيس العائد المحقق للمساهمين على استثماراتهم",
      calculation: `(${data.netIncome.toLocaleString()} ÷ ${data.totalEquity.toLocaleString()}) × 100`,
    })

    // العائد على رأس المال المستثمر (ROIC)
    const investedCapital = data.totalEquity + data.longTermDebt
    const roic = (data.operatingIncome / investedCapital) * 100
    results.push({
      id: "return_on_invested_capital",
      name: "العائد على رأس المال المستثمر",
      nameEn: "Return on Invested Capital (ROIC)",
      category: "نسب الربحية",
      value: roic,
      formula: "(الربح التشغيلي ÷ رأس المال المستثمر) × 100",
      interpretation: this.interpretROIC(roic),
      benchmark: 12,
      status: this.getStatus(roic, 12, "higher"),
      description: "يقيس كفاءة الشركة في استخدام رأس المال المستثمر",
      calculation: `(${data.operatingIncome.toLocaleString()} ÷ ${investedCapital.toLocaleString()}) × 100`,
    })

    // هامش الربح الإجمالي
    const grossMargin = (data.grossProfit / data.revenue) * 100
    results.push({
      id: "gross_profit_margin",
      name: "هامش الربح الإجمالي",
      nameEn: "Gross Profit Margin",
      category: "نسب الربحية",
      value: grossMargin,
      formula: "(الربح الإجمالي ÷ المبيعات) × 100",
      interpretation: this.interpretGrossMargin(grossMargin),
      benchmark: 30,
      status: this.getStatus(grossMargin, 30, "higher"),
      description: "يقيس ربحية الشركة قبل المصروفات التشغيلية",
      calculation: `(${data.grossProfit.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // هامش الربح التشغيلي
    const operatingMargin = (data.operatingIncome / data.revenue) * 100
    results.push({
      id: "operating_profit_margin",
      name: "هامش الربح التشغيلي",
      nameEn: "Operating Profit Margin",
      category: "نسب الربحية",
      value: operatingMargin,
      formula: "(الربح التشغيلي ÷ المبيعات) × 100",
      interpretation: this.interpretOperatingMargin(operatingMargin),
      benchmark: 15,
      status: this.getStatus(operatingMargin, 15, "higher"),
      description: "يقيس ربحية الشركة من العمليات الأساسية",
      calculation: `(${data.operatingIncome.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // هامش الربح الصافي
    const netMargin = (data.netIncome / data.revenue) * 100
    results.push({
      id: "net_profit_margin",
      name: "هامش الربح الصافي",
      nameEn: "Net Profit Margin",
      category: "نسب الربحية",
      value: netMargin,
      formula: "(الربح الصافي ÷ المبيعات) × 100",
      interpretation: this.interpretNetMargin(netMargin),
      benchmark: 10,
      status: this.getStatus(netMargin, 10, "higher"),
      description: "يقيس الربحية الإجمالية للشركة",
      calculation: `(${data.netIncome.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // العائد على المبيعات
    const returnOnSales = (data.operatingIncome / data.revenue) * 100
    results.push({
      id: "return_on_sales",
      name: "العائد على المبيعات",
      nameEn: "Return on Sales (ROS)",
      category: "نسب الربحية",
      value: returnOnSales,
      formula: "(الربح التشغيلي ÷ المبيعات) × 100",
      interpretation: this.interpretReturnOnSales(returnOnSales),
      benchmark: 12,
      status: this.getStatus(returnOnSales, 12, "higher"),
      description: "يقيس كفاءة الشركة في تحويل المبيعات إلى أرباح",
      calculation: `(${data.operatingIncome.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // معدل نمو الأرباح (يحتاج بيانات السنة السابقة)
    // سيتم حسابه عند توفر البيانات التاريخية

    // ربحية السهم الأساسية
    const basicEPS = data.netIncome / data.sharesOutstanding
    results.push({
      id: "basic_earnings_per_share",
      name: "ربحية السهم الأساسية",
      nameEn: "Basic Earnings Per Share (EPS)",
      category: "نسب الربحية",
      value: basicEPS,
      formula: "الربح الصافي ÷ عدد الأسهم المتداولة",
      interpretation: this.interpretBasicEPS(basicEPS),
      benchmark: 5,
      status: this.getStatus(basicEPS, 5, "higher"),
      description: "نصيب السهم الواحد من الأرباح",
      calculation: `${data.netIncome.toLocaleString()} ÷ ${data.sharesOutstanding.toLocaleString()}`,
    })

    // العائد على الأصول التشغيلية
    const operatingAssets = data.totalAssets - data.cash
    const rooa = (data.operatingIncome / operatingAssets) * 100
    results.push({
      id: "return_on_operating_assets",
      name: "العائد على الأصول التشغيلية",
      nameEn: "Return on Operating Assets (ROOA)",
      category: "نسب الربحية",
      value: rooa,
      formula: "(الربح التشغيلي ÷ الأصول التشغيلية) × 100",
      interpretation: this.interpretROOA(rooa),
      benchmark: 10,
      status: this.getStatus(rooa, 10, "higher"),
      description: "يقيس كفاءة الشركة في استخدام أصولها التشغيلية",
      calculation: `(${data.operatingIncome.toLocaleString()} ÷ ${operatingAssets.toLocaleString()}) × 100`,
    })

    // هامش الربح قبل الفوائد والضرائب (EBIT Margin)
    const ebitMargin = (data.operatingIncome / data.revenue) * 100
    results.push({
      id: "ebit_margin",
      name: "هامش الربح قبل الفوائد والضرائب",
      nameEn: "EBIT Margin",
      category: "نسب الربحية",
      value: ebitMargin,
      formula: "(الربح قبل الفوائد والضرائب ÷ المبيعات) × 100",
      interpretation: this.interpretEBITMargin(ebitMargin),
      benchmark: 15,
      status: this.getStatus(ebitMargin, 15, "higher"),
      description: "يقيس الربحية التشغيلية قبل تأثير التمويل والضرائب",
      calculation: `(${data.operatingIncome.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // العائد على رأس المال العامل
    const workingCapital = data.currentAssets - data.currentLiabilities
    const rowc = (data.netIncome / workingCapital) * 100
    results.push({
      id: "return_on_working_capital",
      name: "العائد على رأس المال العامل",
      nameEn: "Return on Working Capital (ROWC)",
      category: "نسب الربحية",
      value: rowc,
      formula: "(الربح الصافي ÷ رأس المال العامل) × 100",
      interpretation: this.interpretROWC(rowc),
      benchmark: 25,
      status: this.getStatus(rowc, 25, "higher"),
      description: "يقيس كفاءة الشركة في استخدام رأس المال العامل",
      calculation: `(${data.netIncome.toLocaleString()} ÷ ${workingCapital.toLocaleString()}) × 100`,
    })

    // نسبة التكلفة إلى الإيراد
    const costToRevenueRatio = (data.costOfGoodsSold / data.revenue) * 100
    results.push({
      id: "cost_to_revenue_ratio",
      name: "نسبة التكلفة إلى الإيراد",
      nameEn: "Cost to Revenue Ratio",
      category: "نسب الربحية",
      value: costToRevenueRatio,
      formula: "(تكلفة البضاعة المباعة ÷ المبيعات) × 100",
      interpretation: this.interpretCostToRevenueRatio(costToRevenueRatio),
      benchmark: 70,
      status: this.getStatus(costToRevenueRatio, 70, "lower"),
      description: "يقيس نسبة التكاليف المباشرة من الإيرادات",
      calculation: `(${data.costOfGoodsSold.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // معدل النمو المستدام
    const sustainableGrowthRate = roe * (1 - 0.3) // افتراض نسبة توزيع أرباح 30%
    results.push({
      id: "sustainable_growth_rate",
      name: "معدل النمو المستدام",
      nameEn: "Sustainable Growth Rate",
      category: "نسب الربحية",
      value: sustainableGrowthRate,
      formula: "العائد على حقوق الملكية × (1 - نسبة توزيع الأرباح)",
      interpretation: this.interpretSustainableGrowthRate(sustainableGrowthRate),
      benchmark: 10,
      status: this.getStatus(sustainableGrowthRate, 10, "higher"),
      description: "أقصى معدل نمو يمكن للشركة تحقيقه دون تمويل خارجي",
      calculation: `${roe.toFixed(2)} × (1 - 0.30)`,
    })

    // كفاءة استخدام الأصول لتوليد الأرباح
    const assetEfficiency = (data.netIncome / data.totalAssets) * 100
    results.push({
      id: "asset_efficiency",
      name: "كفاءة استخدام الأصول",
      nameEn: "Asset Efficiency",
      category: "نسب الربحية",
      value: assetEfficiency,
      formula: "(الربح الصافي ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretAssetEfficiency(assetEfficiency),
      benchmark: 8,
      status: this.getStatus(assetEfficiency, 8, "higher"),
      description: "يقيس قدرة الشركة على توليد أرباح من أصولها",
      calculation: `(${data.netIncome.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // هامش الربح التشغيلي المعدل
    const adjustedOperatingMargin = ((data.operatingIncome + data.operatingExpenses * 0.1) / data.revenue) * 100
    results.push({
      id: "adjusted_operating_margin",
      name: "هامش الربح التشغيلي المعدل",
      nameEn: "Adjusted Operating Margin",
      category: "نسب الربحية",
      value: adjustedOperatingMargin,
      formula: "((الربح التشغيلي + المصروفات غير المتكررة) ÷ المبيعات) × 100",
      interpretation: this.interpretAdjustedOperatingMargin(adjustedOperatingMargin),
      benchmark: 18,
      status: this.getStatus(adjustedOperatingMargin, 18, "higher"),
      description: "هامش الربح التشغيلي بعد تعديل المصروفات غير المتكررة",
      calculation: `((${data.operatingIncome.toLocaleString()} + ${(data.operatingExpenses * 0.1).toLocaleString()}) ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // العائد النقدي على الأصول
    const cashROA = (data.operatingCashFlow / data.totalAssets) * 100
    results.push({
      id: "cash_return_on_assets",
      name: "العائد النقدي على الأصول",
      nameEn: "Cash Return on Assets",
      category: "نسب الربحية",
      value: cashROA,
      formula: "(التدفق النقدي التشغيلي ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretCashROA(cashROA),
      benchmark: 10,
      status: this.getStatus(cashROA, 10, "higher"),
      description: "يقيس قدرة الشركة على توليد نقد من أصولها",
      calculation: `(${data.operatingCashFlow.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // نسبة الربح إلى التدفق النقدي
    const profitToCashFlowRatio = data.netIncome / data.operatingCashFlow
    results.push({
      id: "profit_to_cash_flow_ratio",
      name: "نسبة الربح إلى التدفق النقدي",
      nameEn: "Profit to Cash Flow Ratio",
      category: "نسب الربحية",
      value: profitToCashFlowRatio,
      formula: "الربح الصافي ÷ التدفق النقدي التشغيلي",
      interpretation: this.interpretProfitToCashFlowRatio(profitToCashFlowRatio),
      benchmark: 0.8,
      status: this.getStatus(profitToCashFlowRatio, 0.8, "optimal"),
      description: "يقيس جودة الأرباح من خلال مقارنتها بالتدفق النقدي",
      calculation: `${data.netIncome.toLocaleString()} ÷ ${data.operatingCashFlow.toLocaleString()}`,
    })

    // معدل العائد الداخلي على الاستثمار
    const internalRateOfReturn = ((data.netIncome + data.interestExpense) / (data.totalEquity + data.longTermDebt)) * 100
    results.push({
      id: "internal_rate_of_return",
      name: "معدل العائد الداخلي",
      nameEn: "Internal Rate of Return",
      category: "نسب الربحية",
      value: internalRateOfReturn,
      formula: "((الربح الصافي + مصروف الفوائد) ÷ إجمالي الاستثمار) × 100",
      interpretation: this.interpretInternalRateOfReturn(internalRateOfReturn),
      benchmark: 12,
      status: this.getStatus(internalRateOfReturn, 12, "higher"),
      description: "يقيس العائد الإجمالي على الاستثمار",
      calculation: `((${data.netIncome.toLocaleString()} + ${data.interestExpense.toLocaleString()}) ÷ ${(data.totalEquity + data.longTermDebt).toLocaleString()}) × 100`,
    })

    return results
  }

  // 2.4 نسب المديونية/الرافعة (15 نسبة)
  static calculateLeverageRatios(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // نسبة الدين إلى حقوق الملكية
    const debtToEquity = data.totalLiabilities / data.totalEquity
    results.push({
      id: "debt_to_equity",
      name: "نسبة الدين إلى حقوق الملكية",
      nameEn: "Debt to Equity Ratio",
      category: "نسب المديونية",
      value: debtToEquity,
      formula: "إجمالي الديون ÷ حقوق الملكية",
      interpretation: this.interpretDebtToEquity(debtToEquity),
      benchmark: 1,
      status: this.getStatus(debtToEquity, 1, "lower"),
      description: "يقيس مستوى المديونية مقارنة بحقوق الملكية",
      calculation: `${data.totalLiabilities.toLocaleString()} ÷ ${data.totalEquity.toLocaleString()}`,
    })

    // نسبة الدين إلى إجمالي الأصول
    const debtToAssets = (data.totalLiabilities / data.totalAssets) * 100
    results.push({
      id: "debt_to_assets",
      name: "نسبة الدين إلى إجمالي الأصول",
      nameEn: "Debt to Assets Ratio",
      category: "نسب المديونية",
      value: debtToAssets,
      formula: "(إجمالي الديون ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretDebtToAssets(debtToAssets),
      benchmark: 50,
      status: this.getStatus(debtToAssets, 50, "lower"),
      description: "يقيس نسبة الأصول الممولة بالديون",
      calculation: `(${data.totalLiabilities.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // نسبة حقوق الملكية إلى إجمالي الأصول
    const equityToAssets = (data.totalEquity / data.totalAssets) * 100
    results.push({
      id: "equity_to_assets",
      name: "نسبة حقوق الملكية إلى إجمالي الأصول",
      nameEn: "Equity to Assets Ratio",
      category: "نسب المديونية",
      value: equityToAssets,
      formula: "(حقوق الملكية ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretEquityToAssets(equityToAssets),
      benchmark: 50,
      status: this.getStatus(equityToAssets, 50, "higher"),
      description: "يقيس نسبة الأصول الممولة بحقوق الملكية",
      calculation: `(${data.totalEquity.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // نسبة الدين طويل الأجل إلى حقوق الملكية
    const longTermDebtToEquity = data.longTermDebt / data.totalEquity
    results.push({
      id: "long_term_debt_to_equity",
      name: "نسبة الدين طويل الأجل إلى حقوق الملكية",
      nameEn: "Long-term Debt to Equity",
      category: "نسب المديونية",
      value: longTermDebtToEquity,
      formula: "الدين طويل الأجل ÷ حقوق الملكية",
      interpretation: this.interpretLongTermDebtToEquity(longTermDebtToEquity),
      benchmark: 0.6,
      status: this.getStatus(longTermDebtToEquity, 0.6, "lower"),
      description: "يقيس مستوى الديون طويلة الأجل مقارنة بحقوق الملكية",
      calculation: `${data.longTermDebt.toLocaleString()} ÷ ${data.totalEquity.toLocaleString()}`,
    })

    // نسبة تغطية الفوائد
    const interestCoverage = data.operatingIncome / data.interestExpense
    results.push({
      id: "interest_coverage",
      name: "نسبة تغطية الفوائد",
      nameEn: "Interest Coverage Ratio",
      category: "نسب المديونية",
      value: interestCoverage,
      formula: "الربح التشغيلي ÷ مصروف الفوائد",
      interpretation: this.interpretInterestCoverage(interestCoverage),
      benchmark: 5,
      status: this.getStatus(interestCoverage, 5, "higher"),
      description: "يقيس قدرة الشركة على سداد فوائد الديون",
      calculation: `${data.operatingIncome.toLocaleString()} ÷ ${data.interestExpense.toLocaleString()}`,
    })

    // نسبة تغطية الدين
    const debtCoverage = data.operatingCashFlow / data.totalLiabilities
    results.push({
      id: "debt_coverage",
      name: "نسبة تغطية الدين",
      nameEn: "Debt Coverage Ratio",
      category: "نسب المديونية",
      value: debtCoverage,
      formula: "التدفق النقدي التشغيلي ÷ إجمالي الديون",
      interpretation: this.interpretDebtCoverage(debtCoverage),
      benchmark: 0.2,
      status: this.getStatus(debtCoverage, 0.2, "higher"),
      description: "يقيس قدرة الشركة على سداد ديونها من التدفق النقدي",
      calculation: `${data.operatingCashFlow.toLocaleString()} ÷ ${data.totalLiabilities.toLocaleString()}`,
    })

    // الرافعة المالية
    const financialLeverage = data.totalAssets / data.totalEquity
    results.push({
      id: "financial_leverage",
      name: "الرافعة المالية",
      nameEn: "Financial Leverage",
      category: "نسب المديونية",
      value: financialLeverage,
      formula: "إجمالي الأصول ÷ حقوق الملكية",
      interpretation: this.interpretFinancialLeverage(financialLeverage),
      benchmark: 2,
      status: this.getStatus(financialLeverage, 2, "lower"),
      description: "يقيس درجة استخدام الديون في تمويل الأصول",
      calculation: `${data.totalAssets.toLocaleString()} ÷ ${data.totalEquity.toLocaleString()}`,
    })

    // نسبة رأس المال إلى إجمالي الأصول
    const capitalToAssets = ((data.totalEquity + data.longTermDebt) / data.totalAssets) * 100
    results.push({
      id: "capital_to_assets",
      name: "نسبة رأس المال إلى إجمالي الأصول",
      nameEn: "Capital to Assets Ratio",
      category: "نسب المديونية",
      value: capitalToAssets,
      formula: "((حقوق الملكية + الدين طويل الأجل) ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretCapitalToAssets(capitalToAssets),
      benchmark: 70,
      status: this.getStatus(capitalToAssets, 70, "higher"),
      description: "يقيس نسبة رأس المال الدائم من إجمالي الأصول",
      calculation: `((${data.totalEquity.toLocaleString()} + ${data.longTermDebt.toLocaleString()}) ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // نسبة الديون قصيرة الأجل إلى إجمالي الديون
    const shortTermDebtRatio = (data.currentLiabilities / data.totalLiabilities) * 100
    results.push({
      id: "short_term_debt_ratio",
      name: "نسبة الديون قصيرة الأجل",
      nameEn: "Short-term Debt Ratio",
      category: "نسب المديونية",
      value: shortTermDebtRatio,
      formula: "(الالتزامات المتداولة ÷ إجمالي الالتزامات) × 100",
      interpretation: this.interpretShortTermDebtRatio(shortTermDebtRatio),
      benchmark: 60,
      status: this.getStatus(shortTermDebtRatio, 60, "lower"),
      description: "يقيس نسبة الديون قصيرة الأجل من إجمالي الديون",
      calculation: `(${data.currentLiabilities.toLocaleString()} ÷ ${data.totalLiabilities.toLocaleString()}) × 100`,
    })

    // معامل الأمان المالي
    const financialSafetyRatio = (data.totalEquity / data.totalAssets) * 100
    results.push({
      id: "financial_safety_ratio",
      name: "معامل الأمان المالي",
      nameEn: "Financial Safety Ratio",
      category: "نسب المديونية",
      value: financialSafetyRatio,
      formula: "(حقوق الملكية ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretFinancialSafetyRatio(financialSafetyRatio),
      benchmark: 40,
      status: this.getStatus(financialSafetyRatio, 40, "higher"),
      description: "يقيس مستوى الأمان المالي للشركة",
      calculation: `(${data.totalEquity.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // نسبة التمويل الذاتي
    const selfFinancingRatio = (data.totalEquity / (data.totalEquity + data.longTermDebt)) * 100
    results.push({
      id: "self_financing_ratio",
      name: "نسبة التمويل الذاتي",
      nameEn: "Self-financing Ratio",
      category: "نسب المديونية",
      value: selfFinancingRatio,
      formula: "(حقوق الملكية ÷ (حقوق الملكية + الدين طويل الأجل)) × 100",
      interpretation: this.interpretSelfFinancingRatio(selfFinancingRatio),
      benchmark: 60,
      status: this.getStatus(selfFinancingRatio, 60, "higher"),
      description: "يقيس اعتماد الشركة على التمويل الذاتي",
      calculation: `(${data.totalEquity.toLocaleString()} ÷ ${(data.totalEquity + data.longTermDebt).toLocaleString()}) × 100`,
    })

    // نسبة الاستقلالية المالية
    const financialIndependenceRatio = data.totalEquity / data.totalLiabilities
    results.push({
      id: "financial_independence_ratio",
      name: "نسبة الاستقلالية المالية",
      nameEn: "Financial Independence Ratio",
      category: "نسب المديونية",
      value: financialIndependenceRatio,
      formula: "حقوق الملكية ÷ إجمالي الالتزامات",
      interpretation: this.interpretFinancialIndependenceRatio(financialIndependenceRatio),
      benchmark: 1,
      status: this.getStatus(financialIndependenceRatio, 1, "higher"),
      description: "يقيس مستوى الاستقلالية المالية للشركة",
      calculation: `${data.totalEquity.toLocaleString()} ÷ ${data.totalLiabilities.toLocaleString()}`,
    })

    // نسبة الملاءة المالية
    const solvencyRatio = ((data.netIncome + data.operatingExpenses * 0.2) / data.totalLiabilities) * 100
    results.push({
      id: "solvency_ratio",
      name: "نسبة الملاءة المالية",
      nameEn: "Solvency Ratio",
      category: "نسب المديونية",
      value: solvencyRatio,
      formula: "((الربح الصافي + الاستهلاك) ÷ إجمالي الالتزامات) × 100",
      interpretation: this.interpretSolvencyRatio(solvencyRatio),
      benchmark: 20,
      status: this.getStatus(solvencyRatio, 20, "higher"),
      description: "يقيس قدرة الشركة على الوفاء بالتزاماتها طويلة الأجل",
      calculation: `((${data.netIncome.toLocaleString()} + ${(data.operatingExpenses * 0.2).toLocaleString()}) ÷ ${data.totalLiabilities.toLocaleString()}) × 100`,
    })

    // معدل خدمة الدين
    const debtServiceRatio = (data.interestExpense + (data.longTermDebt * 0.1)) / data.operatingCashFlow
    results.push({
      id: "debt_service_ratio",
      name: "معدل خدمة الدين",
      nameEn: "Debt Service Ratio",
      category: "نسب المديونية",
      value: debtServiceRatio,
      formula: "(الفوائد + أقساط الدين) ÷ التدفق النقدي التشغيلي",
      interpretation: this.interpretDebtServiceRatio(debtServiceRatio),
      benchmark: 0.4,
      status: this.getStatus(debtServiceRatio, 0.4, "lower"),
      description: "يقيس قدرة الشركة على خدمة ديونها",
      calculation: `(${data.interestExpense.toLocaleString()} + ${(data.longTermDebt * 0.1).toLocaleString()}) ÷ ${data.operatingCashFlow.toLocaleString()}`,
    })

    // نسبة الحماية المالية
    const financialProtectionRatio = (data.totalEquity + data.operatingCashFlow) / data.totalLiabilities
    results.push({
      id: "financial_protection_ratio",
      name: "نسبة الحماية المالية",
      nameEn: "Financial Protection Ratio",
      category: "نسب المديونية",
      value: financialProtectionRatio,
      formula: "(حقوق الملكية + التدفق النقدي التشغيلي) ÷ إجمالي الالتزامات",
      interpretation: this.interpretFinancialProtectionRatio(financialProtectionRatio),
      benchmark: 1.5,
      status: this.getStatus(financialProtectionRatio, 1.5, "higher"),
      description: "يقيس مستوى الحماية المالية ضد المخاطر",
      calculation: `(${data.totalEquity.toLocaleString()} + ${data.operatingCashFlow.toLocaleString()}) ÷ ${data.totalLiabilities.toLocaleString()}`,
    })

    return results
  }

  // 2.5 نسب السوق (15 نسبة)
  static calculateMarketRatios(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // نسبة السعر إلى الأرباح (P/E)
    const eps = data.netIncome / data.sharesOutstanding
    const peRatio = data.stockPrice / eps
    results.push({
      id: "price_to_earnings",
      name: "نسبة السعر إلى الأرباح",
      nameEn: "Price to Earnings Ratio (P/E)",
      category: "نسب السوق",
      value: peRatio,
      formula: "سعر السهم ÷ ربحية السهم",
      interpretation: this.interpretPERatio(peRatio),
      benchmark: 15,
      status: this.getStatus(peRatio, 15, "optimal"),
      description: "يقيس استعداد المستثمرين لدفع مقابل كل ريال من الأرباح",
      calculation: `${data.stockPrice.toLocaleString()} ÷ ${eps.toFixed(2)}`,
    })

    // نسبة السعر إلى القيمة الدفترية (P/B)
    const bookValuePerShare = data.totalEquity / data.sharesOutstanding
    const pbRatio = data.stockPrice / bookValuePerShare
    results.push({
      id: "price_to_book",
      name: "نسبة السعر إلى القيمة الدفترية",
      nameEn: "Price to Book Ratio (P/B)",
      category: "نسب السوق",
      value: pbRatio,
      formula: "سعر السهم ÷ القيمة الدفترية للسهم",
      interpretation: this.interpretPBRatio(pbRatio),
      benchmark: 2,
      status: this.getStatus(pbRatio, 2, "optimal"),
      description: "يقيس تقييم السوق مقارنة بالقيمة الدفترية",
      calculation: `${data.stockPrice.toLocaleString()} ÷ ${bookValuePerShare.toFixed(2)}`,
    })

    // القيمة السوقية إلى المبيعات
    const marketCapToSales = data.marketValue / data.revenue
    results.push({
      id: "market_cap_to_sales",
      name: "القيمة السوقية إلى المبيعات",
      nameEn: "Market Cap to Sales",
      category: "نسب السوق",
      value: marketCapToSales,
      formula: "القيمة السوقية ÷ المبيعات",
      interpretation: this.interpretMarketCapToSales(marketCapToSales),
      benchmark: 3,
      status: this.getStatus(marketCapToSales, 3, "optimal"),
      description: "يقيس تقييم السوق مقارنة بالمبيعات",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.revenue.toLocaleString()}`,
    })

    // العائد على السهم
    const earningsYield = (eps / data.stockPrice) * 100
    results.push({
      id: "earnings_yield",
      name: "العائد على السهم",
      nameEn: "Earnings Yield",
      category: "نسب السوق",
      value: earningsYield,
      formula: "(ربحية السهم ÷ سعر السهم) × 100",
      interpretation: this.interpretEarningsYield(earningsYield),
      benchmark: 8,
      status: this.getStatus(earningsYield, 8, "higher"),
      description: "يقيس العائد المحقق من الاستثمار في السهم",
      calculation: `(${eps.toFixed(2)} ÷ ${data.stockPrice.toLocaleString()}) × 100`,
    })

    // نسبة السعر إلى التدفق النقدي
    const cashFlowPerShare = data.operatingCashFlow / data.sharesOutstanding
    const priceToCashFlow = data.stockPrice / cashFlowPerShare
    results.push({
      id: "price_to_cash_flow",
      name: "نسبة السعر إلى التدفق النقدي",
      nameEn: "Price to Cash Flow",
      category: "نسب السوق",
      value: priceToCashFlow,
      formula: "سعر السهم ÷ التدفق النقدي للسهم",
      interpretation: this.interpretPriceToCashFlow(priceToCashFlow),
      benchmark: 10,
      status: this.getStatus(priceToCashFlow, 10, "optimal"),
      description: "يقيس تقييم السوق مقارنة بالتدفق النقدي",
      calculation: `${data.stockPrice.toLocaleString()} ÷ ${cashFlowPerShare.toFixed(2)}`,
    })

    // القيمة السوقية إلى القيمة الدفترية
    const marketToBookValue = data.marketValue / data.totalEquity
    results.push({
      id: "market_to_book_value",
      name: "القيمة السوقية إلى القيمة الدفترية",
      nameEn: "Market to Book Value",
      category: "نسب السوق",
      value: marketToBookValue,
      formula: "القيمة السوقية ÷ القيمة الدفترية",
      interpretation: this.interpretMarketToBookValue(marketToBookValue),
      benchmark: 2,
      status: this.getStatus(marketToBookValue, 2, "optimal"),
      description: "يقيس تقييم السوق للشركة مقارنة بقيمتها الدفترية",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.totalEquity.toLocaleString()}`,
    })

    // مضاعف الأرباح
    const earningsMultiplier = data.marketValue / data.netIncome
    results.push({
      id: "earnings_multiplier",
      name: "مضاعف الأرباح",
      nameEn: "Earnings Multiplier",
      category: "نسب السوق",
      value: earningsMultiplier,
      formula: "القيمة السوقية ÷ الربح الصافي",
      interpretation: this.interpretEarningsMultiplier(earningsMultiplier),
      benchmark: 15,
      status: this.getStatus(earningsMultiplier, 15, "optimal"),
      description: "يقيس مضاعف تقييم الأرباح في السوق",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.netIncome.toLocaleString()}`,
    })

    // نسبة التوزيعات إلى السعر (افتراضية)
    const assumedDividend = data.netIncome * 0.3 / data.sharesOutstanding
    const dividendYield = (assumedDividend / data.stockPrice) * 100
    results.push({
      id: "dividend_yield",
      name: "عائد التوزيعات",
      nameEn: "Dividend Yield",
      category: "نسب السوق",
      value: dividendYield,
      formula: "(التوزيعات للسهم ÷ سعر السهم) × 100",
      interpretation: this.interpretDividendYield(dividendYield),
      benchmark: 3,
      status: this.getStatus(dividendYield, 3, "higher"),
      description: "يقيس العائد من التوزيعات مقارنة بسعر السهم",
      calculation: `(${assumedDividend.toFixed(2)} ÷ ${data.stockPrice.toLocaleString()}) × 100`,
    })

    // نسبة التوزيعات إلى الأرباح
    const payoutRatio = (assumedDividend / eps) * 100
    results.push({
      id: "payout_ratio",
      name: "نسبة التوزيعات إلى الأرباح",
      nameEn: "Payout Ratio",
      category: "نسب السوق",
      value: payoutRatio,
      formula: "(التوزيعات للسهم ÷ ربحية السهم) × 100",
      interpretation: this.interpretPayoutRatio(payoutRatio),
      benchmark: 40,
      status: this.getStatus(payoutRatio, 40, "optimal"),
      description: "يقيس نسبة الأرباح الموزعة على المساهمين",
      calculation: `(${assumedDividend.toFixed(2)} ÷ ${eps.toFixed(2)}) × 100`,
    })

    // القيمة السوقية للسهم إلى التدفق النقدي الحر
    const freeCashFlowPerShare = data.freeCashFlow / data.sharesOutstanding
    const priceToFreeCashFlow = data.stockPrice / freeCashFlowPerShare
    results.push({
      id: "price_to_free_cash_flow",
      name: "السعر إلى التدفق النقدي الحر",
      nameEn: "Price to Free Cash Flow",
      category: "نسب السوق",
      value: priceToFreeCashFlow,
      formula: "سعر السهم ÷ التدفق النقدي الحر للسهم",
      interpretation: this.interpretPriceToFreeCashFlow(priceToFreeCashFlow),
      benchmark: 12,
      status: this.getStatus(priceToFreeCashFlow, 12, "optimal"),
      description: "يقيس تقييم السوق مقارنة بالتدفق النقدي الحر",
      calculation: `${data.stockPrice.toLocaleString()} ÷ ${freeCashFlowPerShare.toFixed(2)}`,
    })

    // مضاعف المبيعات
    const salesMultiplier = data.marketValue / data.revenue
    results.push({
      id: "sales_multiplier",
      name: "مضاعف المبيعات",
      nameEn: "Sales Multiplier",
      category: "نسب السوق",
      value: salesMultiplier,
      formula: "القيمة السوقية ÷ المبيعات",
      interpretation: this.interpretSalesMultiplier(salesMultiplier),
      benchmark: 2,
      status: this.getStatus(salesMultiplier, 2, "optimal"),
      description: "يقيس مضاعف تقييم المبيعات في السوق",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.revenue.toLocaleString()}`,
    })

    // نسبة القيمة السوقية إلى الأصول
    const marketValueToAssets = data.marketValue / data.totalAssets
    results.push({
      id: "market_value_to_assets",
      name: "القيمة السوقية إلى الأصول",
      nameEn: "Market Value to Assets",
      category: "نسب السوق",
      value: marketValueToAssets,
      formula: "القيمة السوقية ÷ إجمالي الأصول",
      interpretation: this.interpretMarketValueToAssets(marketValueToAssets),
      benchmark: 1.5,
      status: this.getStatus(marketValueToAssets, 1.5, "optimal"),
      description: "يقيس تقييم السوق مقارنة بإجمالي الأصول",
      calculation: `${data.marketValue.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}`,
    })

    // معدل النمو المتوقع (PEG Ratio)
    const assumedGrowthRate = 10 // افتراض معدل نمو 10%
    const pegRatio = peRatio / assumedGrowthRate
    results.push({
      id: "peg_ratio",
      name: "نسبة السعر للأرباح إلى النمو",
      nameEn: "PEG Ratio",
      category: "نسب السوق",
      value: pegRatio,
      formula: "نسبة السعر للأرباح ÷ معدل النمو المتوقع",
      interpretation: this.interpretPEGRatio(pegRatio),
      benchmark: 1,
      status: this.getStatus(pegRatio, 1, "optimal"),
      description: "يقيس تقييم السهم مع مراعاة معدل النمو",
      calculation: `${peRatio.toFixed(2)} ÷ ${assumedGrowthRate}`,
    })

    // العائد الإجمالي للمساهمين
    const totalShareholderReturn = ((data.stockPrice + assumedDividend) / data.stockPrice - 1) * 100
    results.push({
      id: "total_shareholder_return",
      name: "العائد الإجمالي للمساهمين",
      nameEn: "Total Shareholder Return",
      category: "نسب السوق",
      value: totalShareholderReturn,
      formula: "((السعر الحالي + التوزيعات) ÷ السعر السابق - 1) × 100",
      interpretation: this.interpretTotalShareholderReturn(totalShareholderReturn),
      benchmark: 12,
      status: this.getStatus(totalShareholderReturn, 12, "higher"),
      description: "يقيس العائد الإجمالي للمساهمين من السعر والتوزيعات",
      calculation: `((${data.stockPrice.toLocaleString()} + ${assumedDividend.toFixed(2)}) ÷ ${data.stockPrice.toLocaleString()} - 1) × 100`,
    })

    // القيمة المضافة للسوق
    const marketValueAdded = data.marketValue - data.totalEquity
    results.push({
      id: "market_value_added",
      name: "القيمة المضافة للسوق",
      nameEn: "Market Value Added (MVA)",
      category: "نسب السوق",
      value: marketValueAdded,
      formula: "القيمة السوقية - القيمة الدفترية",
      interpretation: this.interpretMarketValueAdded(marketValueAdded),
      benchmark: 0,
      status: this.getStatus(marketValueAdded, 0, "higher"),
      description: "يقيس القيمة المضافة من قبل الإدارة للمساهمين",
      calculation: `${data.marketValue.toLocaleString()} - ${data.totalEquity.toLocaleString()}`,
    })

    return results
  }

  // 3. تحليلات التدفق النقدي (18 تحليل)
  static performCashFlowAnalysis(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // نسبة التدفق النقدي التشغيلي إلى المبيعات
    const operatingCashFlowToSales = (data.operatingCashFlow / data.revenue) * 100
    results.push({
      id: "operating_cash_flow_to_sales",
      name: "نسبة التدفق النقدي التشغيلي إلى المبيعات",
      nameEn: "Operating Cash Flow to Sales",
      category: "تحليل التدفق النقدي",
      value: operatingCashFlowToSales,
      formula: "(التدفق النقدي التشغيلي ÷ المبيعات) × 100",
      interpretation: this.interpretOperatingCashFlowToSales(operatingCashFlowToSales),
      benchmark: 10,
      status: this.getStatus(operatingCashFlowToSales, 10, "higher"),
      description: "يقيس كفاءة الشركة في تحويل المبيعات إلى نقد",
      calculation: `(${data.operatingCashFlow.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // نسبة التدفق النقدي الحر إلى المبيعات
    const freeCashFlowToSales = (data.freeCashFlow / data.revenue) * 100
    results.push({
      id: "free_cash_flow_to_sales",
      name: "نسبة التدفق النقدي الحر إلى المبيعات",
      nameEn: "Free Cash Flow to Sales",
      category: "تحليل التدفق النقدي",
      value: freeCashFlowToSales,
      formula: "(التدفق النقدي الحر ÷ المبيعات) × 100",
      interpretation: this.interpretFreeCashFlowToSales(freeCashFlowToSales),
      benchmark: 8,
      status: this.getStatus(freeCashFlowToSales, 8, "higher"),
      description: "يقيس النقد المتاح بعد الاستثمارات الرأسمالية",
      calculation: `(${data.freeCashFlow.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // نسبة التدفق النقدي التشغيلي إلى الأصول
    const operatingCashFlowToAssets = (data.operatingCashFlow / data.totalAssets) * 100
    results.push({
      id: "operating_cash_flow_to_assets",
      name: "نسبة التدفق النقدي التشغيلي إلى الأصول",
      nameEn: "Operating Cash Flow to Assets",
      category: "تحليل التدفق النقدي",
      value: operatingCashFlowToAssets,
      formula: "(التدفق النقدي التشغيلي ÷ إجمالي الأصول) × 100",
      interpretation: this.interpretOperatingCashFlowToAssets(operatingCashFlowToAssets),
      benchmark: 8,
      status: this.getStatus(operatingCashFlowToAssets, 8, "higher"),
      description: "يقيس كفاءة الأصول في توليد النقد التشغيلي",
      calculation: `(${data.operatingCashFlow.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()}) × 100`,
    })

    // نسبة التدفق النقدي الحر إلى حقوق الملكية
    const freeCashFlowToEquity = (data.freeCashFlow / data.totalEquity) * 100
    results.push({
      id: "free_cash_flow_to_equity",
      name: "نسبة التدفق النقدي الحر إلى حقوق الملكية",
      nameEn: "Free Cash Flow to Equity",
      category: "تحليل التدفق النقدي",
      value: freeCashFlowToEquity,
      formula: "(التدفق النقدي الحر ÷ حقوق الملكية) × 100",
      interpretation: this.interpretFreeCashFlowToEquity(freeCashFlowToEquity),
      benchmark: 12,
      status: this.getStatus(freeCashFlowToEquity, 12, "higher"),
      description: "يقيس العائد النقدي الحر على حقوق الملكية",
      calculation: `(${data.freeCashFlow.toLocaleString()} ÷ ${data.totalEquity.toLocaleString()}) × 100`,
    })

    // نسبة تغطية النقد للديون
    const cashDebtCoverage = data.operatingCashFlow / data.totalLiabilities
    results.push({
      id: "cash_debt_coverage",
      name: "نسبة تغطية النقد للديون",
      nameEn: "Cash Debt Coverage",
      category: "تحليل التدفق النقدي",
      value: cashDebtCoverage,
      formula: "التدفق النقدي التشغيلي ÷ إجمالي الديون",
      interpretation: this.interpretCashDebtCoverage(cashDebtCoverage),
      benchmark: 0.25,
      status: this.getStatus(cashDebtCoverage, 0.25, "higher"),
      description: "يقيس قدرة الشركة على سداد ديونها من التدفق النقدي",
      calculation: `${data.operatingCashFlow.toLocaleString()} ÷ ${data.totalLiabilities.toLocaleString()}`,
    })

    // نسبة التدفق النقدي إلى الاستثمارات الرأسمالية
    const capitalExpenditures = Math.abs(data.investingCashFlow) * 0.7 // تقدير
    const cashFlowToCapex = data.operatingCashFlow / capitalExpenditures
    results.push({
      id: "cash_flow_to_capex",
      name: "نسبة التدفق النقدي إلى الاستثمارات الرأسمالية",
      nameEn: "Cash Flow to Capital Expenditures",
      category: "تحليل التدفق النقدي",
      value: cashFlowToCapex,
      formula: "التدفق النقدي التشغيلي ÷ الاستثمارات الرأسمالية",
      interpretation: this.interpretCashFlowToCapex(cashFlowToCapex),
      benchmark: 2,
      status: this.getStatus(cashFlowToCapex, 2, "higher"),
      description: "يقيس قدرة الشركة على تمويل استثماراتها من التدفق النقدي",
      calculation: `${data.operatingCashFlow.toLocaleString()} ÷ ${capitalExpenditures.toLocaleString()}`,
    })

    // معدل دوران النقدية
    const cashTurnoverRatio = data.revenue / data.cash
    results.push({
      id: "cash_turnover_ratio",
      name: "معدل دوران النقدية",
      nameEn: "Cash Turnover Ratio",
      category: "تحليل التدفق النقدي",
      value: cashTurnoverRatio,
      formula: "المبيعات ÷ النقدية",
      interpretation: this.interpretCashTurnoverRatio(cashTurnoverRatio),
      benchmark: 8,
      status: this.getStatus(cashTurnoverRatio, 8, "higher"),
      description: "يقيس كفاءة استخدام النقدية في توليد المبيعات",
      calculation: `${data.revenue.toLocaleString()} ÷ ${data.cash.toLocaleString()}`,
    })

    // نسبة النقد إلى إجمالي التدفقات
    const totalCashFlows = Math.abs(data.operatingCashFlow) + Math.abs(data.investingCashFlow) + Math.abs(data.financingCashFlow)
    const cashToTotalFlows = (data.cash / totalCashFlows) * 100
    results.push({
      id: "cash_to_total_flows",
      name: "نسبة النقد إلى إجمالي التدفقات",
      nameEn: "Cash to Total Flows",
      category: "تحليل التدفق النقدي",
      value: cashToTotalFlows,
      formula: "(النقدية ÷ إجمالي التدفقات النقدية) × 100",
      interpretation: this.interpretCashToTotalFlows(cashToTotalFlows),
      benchmark: 15,
      status: this.getStatus(cashToTotalFlows, 15, "optimal"),
      description: "يقيس نسبة النقد المحتفظ به من إجمالي التدفقات",
      calculation: `(${data.cash.toLocaleString()} ÷ ${totalCashFlows.toLocaleString()}) × 100`,
    })

    // جودة الأرباح
    const earningsQuality = data.operatingCashFlow / data.netIncome
    results.push({
      id: "earnings_quality",
      name: "جودة الأرباح",
      nameEn: "Earnings Quality",
      category: "تحليل التدفق النقدي",
      value: earningsQuality,
      formula: "التدفق النقدي التشغيلي ÷ الربح الصافي",
      interpretation: this.interpretEarningsQuality(earningsQuality),
      benchmark: 1,
      status: this.getStatus(earningsQuality, 1, "higher"),
      description: "يقيس جودة الأرباح من خلال مقارنتها بالتدفق النقدي",
      calculation: `${data.operatingCashFlow.toLocaleString()} ÷ ${data.netIncome.toLocaleString()}`,
    })

    // نسبة الاستثمار النقدي
    const cashInvestmentRatio = (Math.abs(data.investingCashFlow) / data.operatingCashFlow) * 100
    results.push({
      id: "cash_investment_ratio",
      name: "نسبة الاستثمار النقدي",
      nameEn: "Cash Investment Ratio",
      category: "تحليل التدفق النقدي",
      value: cashInvestmentRatio,
      formula: "(التدفق النقدي الاستثماري ÷ التدفق النقدي التشغيلي) × 100",
      interpretation: this.interpretCashInvestmentRatio(cashInvestmentRatio),
      benchmark: 60,
      status: this.getStatus(cashInvestmentRatio, 60, "optimal"),
      description: "يقيس نسبة الاستثمار من التدفق النقدي التشغيلي",
      calculation: `(${Math.abs(data.investingCashFlow).toLocaleString()} ÷ ${data.operatingCashFlow.toLocaleString()}) × 100`,
    })

    // نسبة التمويل النقدي
    const cashFinancingRatio = (Math.abs(data.financingCashFlow) / data.operatingCashFlow) * 100
    results.push({
      id: "cash_financing_ratio",
      name: "نسبة التمويل النقدي",
      nameEn: "Cash Financing Ratio",
      category: "تحليل التدفق النقدي",
      value: cashFinancingRatio,
      formula: "(التدفق النقدي التمويلي ÷ التدفق النقدي التشغيلي) × 100",
      interpretation: this.interpretCashFinancingRatio(cashFinancingRatio),
      benchmark: 30,
      status: this.getStatus(cashFinancingRatio, 30, "lower"),
      description: "يقيس اعتماد الشركة على التمويل الخارجي",
      calculation: `(${Math.abs(data.financingCashFlow).toLocaleString()} ÷ ${data.operatingCashFlow.toLocaleString()}) × 100`,
    })

    // معدل تحويل النقد
    const cashConversionRate = (data.operatingCashFlow / data.revenue) * 100
    results.push({
      id: "cash_conversion_rate",
      name: "معدل تحويل النقد",
      nameEn: "Cash Conversion Rate",
      category: "تحليل التدفق النقدي",
      value: cashConversionRate,
      formula: "(التدفق النقدي التشغيلي ÷ المبيعات) × 100",
      interpretation: this.interpretCashConversionRate(cashConversionRate),
      benchmark: 12,
      status: this.getStatus(cashConversionRate, 12, "higher"),
      description: "يقيس كفاءة تحويل المبيعات إلى نقد",
      calculation: `(${data.operatingCashFlow.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // نسبة الاكتفاء النقدي
    const cashSufficiencyRatio = data.operatingCashFlow / (capitalExpenditures + (data.netIncome * 0.3))
    results.push({
      id: "cash_sufficiency_ratio",
      name: "نسبة الاكتفاء النقدي",
      nameEn: "Cash Sufficiency Ratio",
      category: "تحليل التدفق النقدي",
      value: cashSufficiencyRatio,
      formula: "التدفق النقدي التشغيلي ÷ (الاستثمارات الرأسمالية + التوزيعات)",
      interpretation: this.interpretCashSufficiencyRatio(cashSufficiencyRatio),
      benchmark: 1.2,
      status: this.getStatus(cashSufficiencyRatio, 1.2, "higher"),
      description: "يقيس كفاية التدفق النقدي لتغطية الاستثمارات والتوزيعات",
      calculation: `${data.operatingCashFlow.toLocaleString()} ÷ (${capitalExpenditures.toLocaleString()} + ${(data.netIncome * 0.3).toLocaleString()})`,
    })

    // مؤشر قوة التدفق النقدي
    const cashFlowStrengthIndex = (data.operatingCashFlow + data.freeCashFlow) / (data.totalAssets * 0.1)
    results.push({
      id: "cash_flow_strength_index",
      name: "مؤشر قوة التدفق النقدي",
      nameEn: "Cash Flow Strength Index",
      category: "تحليل التدفق النقدي",
      value: cashFlowStrengthIndex,
      formula: "(التدفق النقدي التشغيلي + التدفق النقدي الحر) ÷ (إجمالي الأصول × 0.1)",
      interpretation: this.interpretCashFlowStrengthIndex(cashFlowStrengthIndex),
      benchmark: 2,
      status: this.getStatus(cashFlowStrengthIndex, 2, "higher"),
      description: "مؤشر شامل لقوة التدفق النقدي للشركة",
      calculation: `(${data.operatingCashFlow.toLocaleString()} + ${data.freeCashFlow.toLocaleString()}) ÷ ${(data.totalAssets * 0.1).toLocaleString()}`,
    })

    // نسبة النقد المتاح للنمو
    const cashAvailableForGrowth = (data.freeCashFlow / data.revenue) * 100
    results.push({
      id: "cash_available_for_growth",
      name: "نسبة النقد المتاح للنمو",
      nameEn: "Cash Available for Growth",
      category: "تحليل التدفق النقدي",
      value: cashAvailableForGrowth,
      formula: "(التدفق النقدي الحر ÷ المبيعات) × 100",
      interpretation: this.interpretCashAvailableForGrowth(cashAvailableForGrowth),
      benchmark: 8,
      status: this.getStatus(cashAvailableForGrowth, 8, "higher"),
      description: "يقيس النقد المتاح لتمويل النمو والتوسع",
      calculation: `(${data.freeCashFlow.toLocaleString()} ÷ ${data.revenue.toLocaleString()}) × 100`,
    })

    // معدل استدامة التدفق النقدي
    const cashFlowSustainability = data.operatingCashFlow / (data.operatingExpenses + data.interestExpense)
    results.push({
      id: "cash_flow_sustainability",
      name: "معدل استدامة التدفق النقدي",
      nameEn: "Cash Flow Sustainability",
      category: "تحليل التدفق النقدي",
      value: cashFlowSustainability,
      formula: "التدفق النقدي التشغيلي ÷ (المصروفات التشغيلية + الفوائد)",
      interpretation: this.interpretCashFlowSustainability(cashFlowSustainability),
      benchmark: 1.5,
      status: this.getStatus(cashFlowSustainability, 1.5, "higher"),
      description: "يقيس استدامة التدفق النقدي مقارنة بالمصروفات",
      calculation: `${data.operatingCashFlow.toLocaleString()} ÷ (${data.operatingExpenses.toLocaleString()} + ${data.interestExpense.toLocaleString()})`,
    })

    // نسبة التدفق النقدي الحر إلى القيمة السوقية
    const freeCashFlowToMarketValue = (data.freeCashFlow / data.marketValue) * 100
    results.push({
      id: "free_cash_flow_to_market_value",
      name: "نسبة التدفق النقدي الحر إلى القيمة السوقية",
      nameEn: "Free Cash Flow to Market Value",
      category: "تحليل التدفق النقدي",
      value: freeCashFlowToMarketValue,
      formula: "(التدفق النقدي الحر ÷ القيمة السوقية) × 100",
      interpretation: this.interpretFreeCashFlowToMarketValue(freeCashFlowToMarketValue),
      benchmark: 6,
      status: this.getStatus(freeCashFlowToMarketValue, 6, "higher"),
      description: "يقيس العائد النقدي الحر مقارنة بالقيمة السوقية",
      calculation: `(${data.freeCashFlow.toLocaleString()} ÷ ${data.marketValue.toLocaleString()}) × 100`,
    })

    // مؤشر كفاءة إدارة النقد
    const cashManagementEfficiency = (data.operatingCashFlow / data.cash) * (data.revenue / data.totalAssets)
    results.push({
      id: "cash_management_efficiency",
      name: "مؤشر كفاءة إدارة النقد",
      nameEn: "Cash Management Efficiency",
      category: "تحليل التدفق النقدي",
      value: cashManagementEfficiency,
      formula: "(التدفق النقدي التشغيلي ÷ النقدية) × (المبيعات ÷ إجمالي الأصول)",
      interpretation: this.interpretCashManagementEfficiency(cashManagementEfficiency),
      benchmark: 3,
      status: this.getStatus(cashManagementEfficiency, 3, "higher"),
      description: "مؤشر شامل لكفاءة إدارة النقد والأصول",
      calculation: `(${data.operatingCashFlow.toLocaleString()} ÷ ${data.cash.toLocaleString()}) × (${data.revenue.toLocaleString()} ÷ ${data.totalAssets.toLocaleString()})`,
    })

    return results
  }

  // الدالة الرئيسية لتشغيل جميع التحليلات الأساسية
  static performBasicAnalysis(data: FinancialData): AnalysisResult[] {
    const results: AnalysisResult[] = []

    // 1. التحليل الهيكلي (13 تحليل)
    const structuralAnalysis = this.performStructuralAnalysis(data)
    results.push(...structuralAnalysis)

    // 2. النسب المالية (75 نسبة) - جزء منها فقط حالياً
    const ratiosAnalysis = this.performFinancialRatiosAnalysis(data)
    results.push(...ratiosAnalysis)

    // 3. تحليلات التدفق النقدي (18 تحليل)
    const cashFlowAnalysis = this.performCashFlowAnalysis(data)
    results.push(...cashFlowAnalysis)

    return results
  }

  // دوال التفسير والحالة
  static interpretAssetStructure(value: number, type: "current" | "fixed"): string {
    if (type === "current") {
      if (value > 60) return "نسبة عالية من الأصول المتداولة تشير إلى مرونة مالية جيدة"
      if (value > 40) return "نسبة متوازنة من الأصول المتداولة"
      return "نسبة منخفضة من الأصول المتداولة قد تشير إلى مشاكل في السيولة"
    } else {
      if (value > 70) return "نسبة عالية من الأصول الثابتة تشير إلى استثمارات كبيرة في الأصول الإنتاجية"
      if (value > 40) return "نسبة متوازنة من الأصول الثابتة"
      return "نسبة منخفضة من الأصول الثابتة قد تشير إلى نقص في الاستثمارات الرأسمالية"
    }
  }

  static interpretCapitalStructure(value: number): string {
    if (value > 70) return "نسبة عالية من الديون تشير إلى مخاطر مالية مرتفعة"
    if (value > 50) return "نسبة متوسطة من الديون تتطلب مراقبة"
    if (value > 30) return "نسبة معتدلة من الديون تشير إلى هيكل رأس مال متوازن"
    return "نسبة منخفضة من الديون تشير إلى محافظة مالية"
  }

  static interpretEquityStructure(value: number): string {
    if (value > 70) return "نسبة عالية من حقوق الملكية تشير إلى قوة مالية ممتازة"
    if (value > 50) return "نسبة جيدة من حقوق الملكية تشير إلى استقرار مالي"
    if (value > 30) return "نسبة معتدلة من حقوق الملكية"
    return "نسبة منخفضة من حقوق الملكية تشير إلى اعتماد كبير على الديون"
  }

  static interpretGrossMargin(value: number): string {
    if (value > 40) return "هامش ربح إجمالي ممتاز يشير إلى كفاءة عالية في التسعير والتكلفة"
    if (value > 25) return "هامش ربح إجمالي جيد"
    if (value > 15) return "هامش ربح إجمالي متوسط يحتاج تحسين"
    return "هامش ربح إجمالي منخفض يتطلب مراجعة استراتيجية التسعير والتكلفة"
  }

  static interpretOperatingMargin(value: number): string {
    if (value > 25) return "هامش ربح تشغيلي ممتاز يشير إلى كفاءة عالية في العمليات"
    if (value > 15) return "هامش ربح تشغيلي جيد"
    if (value > 8) return "هامش ربح تشغيلي متوسط"
    return "هامش ربح تشغيلي منخفض يتطلب تحسين الكفاءة التشغيلية"
  }

  static interpretNetMargin(value: number): string {
    if (value > 20) return "هامش ربح صافي ممتاز يشير إلى ربحية عالية"
    if (value > 10) return "هامش ربح صافي جيد"
    if (value > 5) return "هامش ربح صافي متوسط"
    return "هامش ربح صافي منخفض يتطلب مراجعة شاملة للاستراتيجية"
  }

  static interpretCurrentRatio(value: number): string {
    if (value > 3) return "نسبة جارية عالية جداً قد تشير إلى عدم كفاءة في استخدام الأصول"
    if (value > 2) return "نسبة جارية ممتازة تشير إلى سيولة قوية"
    if (value > 1.5) return "نسبة جارية جيدة"
    if (value > 1) return "نسبة جارية مقبولة لكن تحتاج مراقبة"
    return "نسبة جارية منخفضة تشير إلى مشاكل في السيولة"
  }

  static interpretQuickRatio(value: number): string {
    if (value > 1.5) return "نسبة سريعة ممتازة تشير إلى سيولة قوية"
    if (value > 1) return "نسبة سريعة جيدة"
    if (value > 0.8) return "نسبة سريعة مقبولة"
    return "نسبة سريعة منخفضة تشير إلى مخاطر في السيولة"
  }

  static getStatus(
    value: number,
    benchmark: number,
    type: "higher" | "lower" | "optimal",
  ): "excellent" | "good" | "average" | "poor" | "critical" {
    const ratio = value / benchmark

    if (type === "higher") {
      if (ratio >= 1.5) return "excellent"
      if (ratio >= 1.2) return "good"
      if (ratio >= 0.8) return "average"
      if (ratio >= 0.6) return "poor"
      return "critical"
    } else if (type === "lower") {
      if (ratio <= 0.5) return "excellent"
      if (ratio <= 0.8) return "good"
      if (ratio <= 1.2) return "average"
      if (ratio <= 1.5) return "poor"
      return "critical"
    } else {
      // optimal
      if (Math.abs(ratio - 1) <= 0.1) return "excellent"
      if (Math.abs(ratio - 1) <= 0.2) return "good"
      if (Math.abs(ratio - 1) <= 0.4) return "average"
      if (Math.abs(ratio - 1) <= 0.6) return "poor"
      return "critical"
    }
  }

  // باقي دوال التفسير...
  static interpretCostRatio(value: number): string {
    if (value < 50) return "نسبة تكلفة ممتازة تشير إلى كفاءة عالية في إدارة التكاليف"
    if (value < 70) return "نسبة تكلفة جيدة"
    if (value < 80) return "نسبة تكلفة متوسطة"
    return "نسبة تكلفة مرتفعة تحتاج تحسين"
  }

  static interpretOpexRatio(value: number): string {
    if (value < 15) return "نسبة مصروفات تشغيلية ممتازة"
    if (value < 25) return "نسبة مصروفات تشغيلية جيدة"
    if (value < 35) return "نسبة مصروفات تشغيلية متوسطة"
    return "نسبة مصروفات تشغيلية مرتفعة"
  }

  static interpretCashRatio(value: number): string {
    if (value > 15) return "نسبة نقدية عالية قد تشير إلى عدم استغلال الفرص الاستثمارية"
    if (value > 8) return "نسبة نقدية جيدة تشير إلى سيولة مناسبة"
    if (value > 5) return "نسبة نقدية متوسطة"
    return "نسبة نقدية منخفضة قد تشير إلى مشاكل في السيولة"
  }

  static interpretInventoryRatio(value: number): string {
    if (value > 25) return "نسبة مخزون عالية قد تشير إلى بطء في الدوران"
    if (value > 15) return "نسبة مخزون متوسطة"
    if (value > 8) return "نسبة مخزون جيدة"
    return "نسبة مخزون منخفضة قد تشير إلى نقص في المخزون"
  }

  static interpretReceivablesRatio(value: number): string {
    if (value > 20) return "نسبة ذمم مدينة عالية قد تشير إلى مشاكل في التحصيل"
    if (value > 12) return "نسبة ذمم مدينة متوسطة"
    if (value > 8) return "نسبة ذمم مدينة جيدة"
    return "نسبة ذمم مدينة منخفضة تشير إلى كفاءة في التحصيل"
  }

  static interpretShortTermDebtRatio(value: number): string {
    if (value > 80) return "نسبة عالية من الديون قصيرة الأجل تشير إلى مخاطر في السيولة"
    if (value > 60) return "نسبة متوسطة من الديون قصيرة الأجل"
    if (value > 40) return "نسبة جيدة من الديون قصيرة الأجل"
    return "نسبة منخفضة من الديون قصيرة الأجل تشير إلى هيكل تمويل جيد"
  }

  // باقي دوال التفسير للنسب الأخرى...
  static interpretCashRatioLiquidity(value: number): string {
    if (value > 0.5) return "نسبة نقدية عالية تشير إلى سيولة ممتازة"
    if (value > 0.2) return "نسبة نقدية جيدة"
    if (value > 0.1) return "نسبة نقدية مقبولة"
    return "نسبة نقدية منخفضة تحتاج تحسين"
