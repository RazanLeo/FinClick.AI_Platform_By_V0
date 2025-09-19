// نظام الوكلاء المتعددين للذكاء الاصطناعي
// يتضمن وكلاء متخصصين للتحليل المالي والتنبؤ والتوصيات

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { AnalysisResult } from "../analysis-engine/basic-analysis"

export interface AIAgent {
  id: string
  name: string
  nameEn: string
  specialty: string
  description: string
  model: string
  temperature: number
  maxTokens: number
}

export interface AgentResponse {
  agentId: string
  analysis: string
  insights: string[]
  recommendations: string[]
  confidence: number
  reasoning: string
  nextSteps: string[]
}

export interface CollaborativeAnalysis {
  topic: string
  agents: AIAgent[]
  responses: AgentResponse[]
  consensus: string
  conflictingViews: string[]
  finalRecommendation: string
  confidenceScore: number
}

export class MultiAgentSystem {
  private static agents: AIAgent[] = [
    {
      id: "financial_analyst",
      name: "المحلل المالي الخبير",
      nameEn: "Expert Financial Analyst",
      specialty: "التحليل المالي التقليدي والنسب المالية",
      description: "متخصص في تحليل البيانات المالية والنسب والمؤشرات التقليدية",
      model: "gpt-4",
      temperature: 0.3,
      maxTokens: 2000,
    },
    {
      id: "risk_specialist",
      name: "خبير إدارة المخاطر",
      nameEn: "Risk Management Specialist",
      specialty: "تحليل وإدارة المخاطر المالية",
      description: "متخصص في تحديد وتقييم وإدارة المخاطر المالية والتشغيلية",
      model: "gpt-4",
      temperature: 0.2,
      maxTokens: 2000,
    },
    {
      id: "investment_advisor",
      name: "مستشار الاستثمار",
      nameEn: "Investment Advisor",
      specialty: "التقييم والاستثمار واتخاذ القرارات",
      description: "متخصص في تقييم الاستثمارات وتقديم المشورة الاستثمارية",
      model: "gpt-4",
      temperature: 0.4,
      maxTokens: 2000,
    },
    {
      id: "market_analyst",
      name: "محلل السوق",
      nameEn: "Market Analyst",
      specialty: "تحليل السوق والاتجاهات الاقتصادية",
      description: "متخصص في تحليل اتجاهات السوق والعوامل الاقتصادية الكلية",
      model: "gpt-4",
      temperature: 0.5,
      maxTokens: 2000,
    },
    {
      id: "credit_analyst",
      name: "محلل الائتمان",
      nameEn: "Credit Analyst",
      specialty: "التحليل الائتماني وتقييم الجدارة الائتمانية",
      description: "متخصص في تحليل المخاطر الائتمانية وتقييم قدرة السداد",
      model: "gpt-4",
      temperature: 0.2,
      maxTokens: 2000,
    },
    {
      id: "quantitative_analyst",
      name: "المحلل الكمي",
      nameEn: "Quantitative Analyst",
      specialty: "النمذجة الرياضية والتحليل الإحصائي",
      description: "متخصص في النماذج الرياضية والتحليل الإحصائي المتقدم",
      model: "gpt-4",
      temperature: 0.1,
      maxTokens: 2000,
    },
    {
      id: "strategy_consultant",
      name: "مستشار الاستراتيجية",
      nameEn: "Strategy Consultant",
      specialty: "الاستراتيجية والتخطيط طويل المدى",
      description: "متخصص في وضع الاستراتيجيات والتخطيط الاستراتيجي",
      model: "gpt-4",
      temperature: 0.6,
      maxTokens: 2000,
    },
  ]

  // تحليل تعاوني بين الوكلاء
  static async performCollaborativeAnalysis(
    topic: string,
    data: any,
    selectedAgents?: string[],
  ): Promise<CollaborativeAnalysis> {
    const activeAgents = selectedAgents ? this.agents.filter((agent) => selectedAgents.includes(agent.id)) : this.agents

    const responses: AgentResponse[] = []

    // جمع آراء الوكلاء
    for (const agent of activeAgents) {
      try {
        const response = await this.getAgentAnalysis(agent, topic, data)
        responses.push(response)
      } catch (error) {
        console.error(`خطأ في تحليل الوكيل ${agent.name}:`, error)
      }
    }

    // تحليل الإجماع والخلافات
    const consensus = await this.analyzeConsensus(responses)
    const conflictingViews = await this.identifyConflicts(responses)
    const finalRecommendation = await this.generateFinalRecommendation(responses, consensus)
    const confidenceScore = this.calculateCollectiveConfidence(responses)

    return {
      topic,
      agents: activeAgents,
      responses,
      consensus,
      conflictingViews,
      finalRecommendation,
      confidenceScore,
    }
  }

  // الحصول على تحليل من وكيل واحد
  private static async getAgentAnalysis(agent: AIAgent, topic: string, data: any): Promise<AgentResponse> {
    const prompt = this.buildAgentPrompt(agent, topic, data)

    const { text } = await generateText({
      model: openai(agent.model),
      prompt,
      temperature: agent.temperature,
      maxTokens: agent.maxTokens,
    })

    return this.parseAgentResponse(agent.id, text)
  }

  // بناء الاستعلام للوكيل
  private static buildAgentPrompt(agent: AIAgent, topic: string, data: any): string {
    return `
أنت ${agent.name} - ${agent.description}

تخصصك: ${agent.specialty}

المطلوب تحليل: ${topic}

البيانات المتاحة:
${JSON.stringify(data, null, 2)}

يرجى تقديم تحليل شامل يتضمن:
1. تحليل مفصل من منظور تخصصك
2. الرؤى الرئيسية (3-5 نقاط)
3. التوصيات العملية (3-5 توصيات)
4. مستوى الثقة في التحليل (0-100%)
5. المنطق وراء التحليل
6. الخطوات التالية المقترحة

تأكد من أن تحليلك:
- متخصص في مجال خبرتك
- مبني على البيانات المقدمة
- عملي وقابل للتطبيق
- يتضمن تقييم للمخاطر والفرص

الرد باللغة العربية مع استخدام المصطلحات المالية الدقيقة.
`
  }

  // تحليل الاستجابة من الوكيل
  private static parseAgentResponse(agentId: string, response: string): AgentResponse {
    // تحليل بسيط للاستجابة - يمكن تحسينه باستخدام NLP
    const lines = response.split("\n").filter((line) => line.trim())

    const analysis = lines.slice(0, 5).join(" ")
    const insights = this.extractListItems(response, ["رؤى", "insights", "نقاط"])
    const recommendations = this.extractListItems(response, ["توصيات", "recommendations", "اقتراحات"])
    const confidence = this.extractConfidence(response)
    const reasoning = lines.slice(-3).join(" ")
    const nextSteps = this.extractListItems(response, ["خطوات", "steps", "التالي"])

    return {
      agentId,
      analysis,
      insights,
      recommendations,
      confidence,
      reasoning,
      nextSteps,
    }
  }

  // استخراج العناصر من القائمة
  private static extractListItems(text: string, keywords: string[]): string[] {
    const items: string[] = []
    const lines = text.split("\n")

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase()
      if (keywords.some((keyword) => line.includes(keyword))) {
        // البحث عن العناصر في الأسطر التالية
        for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
          const nextLine = lines[j].trim()
          if (nextLine.match(/^[\d\-*•]/)) {
            items.push(nextLine.replace(/^[\d\-*•\s]+/, ""))
          } else if (nextLine && !nextLine.match(/^[أ-ي]/)) {
            break
          }
        }
        break
      }
    }

    return items.slice(0, 5) // أقصى 5 عناصر
  }

  // استخراج مستوى الثقة
  private static extractConfidence(text: string): number {
    const confidenceMatch = text.match(/(\d+)%/)
    if (confidenceMatch) {
      return Number.parseInt(confidenceMatch[1])
    }

    // تقدير بناءً على الكلمات المفتاحية
    if (text.includes("عالية") || text.includes("قوي")) return 85
    if (text.includes("متوسطة") || text.includes("معتدل")) return 70
    if (text.includes("منخفضة") || text.includes("ضعيف")) return 55

    return 75 // افتراضي
  }

  // تحليل الإجماع بين الوكلاء
  private static async analyzeConsensus(responses: AgentResponse[]): Promise<string> {
    const allRecommendations = responses.flatMap((r) => r.recommendations)
    const allInsights = responses.flatMap((r) => r.insights)

    const prompt = `
تحليل الإجماع بين آراء الخبراء:

التوصيات من جميع الخبراء:
${allRecommendations.map((rec, i) => `${i + 1}. ${rec}`).join("\n")}

الرؤى من جميع الخبراء:
${allInsights.map((insight, i) => `${i + 1}. ${insight}`).join("\n")}

يرجى تحديد:
1. النقاط المشتركة والإجماع
2. التوصيات المتفق عليها
3. الرؤى المشتركة

اكتب ملخص موجز للإجماع العام.
`

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt,
      temperature: 0.3,
      maxTokens: 1000,
    })

    return text
  }

  // تحديد الآراء المتضاربة
  private static async identifyConflicts(responses: AgentResponse[]): Promise<string[]> {
    if (responses.length < 2) return []

    const conflicts: string[] = []

    // مقارنة بسيطة للتوصيات
    const recommendations = responses.map((r) => r.recommendations)
    for (let i = 0; i < recommendations.length; i++) {
      for (let j = i + 1; j < recommendations.length; j++) {
        const agent1 = responses[i].agentId
        const agent2 = responses[j].agentId
        // يمكن تحسين هذا بتحليل أكثر تطوراً
        if (this.hasConflictingRecommendations(recommendations[i], recommendations[j])) {
          conflicts.push(`تضارب في الآراء بين ${agent1} و ${agent2}`)
        }
      }
    }

    return conflicts
  }

  // فحص التضارب في التوصيات
  private static hasConflictingRecommendations(recs1: string[], recs2: string[]): boolean {
    // تحليل بسيط - يمكن تحسينه
    const conflictKeywords = [
      ["زيادة", "تقليل"],
      ["شراء", "بيع"],
      ["استثمار", "تجنب"],
      ["توسع", "تقليص"],
    ]

    for (const [keyword1, keyword2] of conflictKeywords) {
      const has1 = recs1.some((rec) => rec.includes(keyword1))
      const has2 = recs2.some((rec) => rec.includes(keyword2))
      if (has1 && has2) return true
    }

    return false
  }

  // توليد التوصية النهائية
  private static async generateFinalRecommendation(responses: AgentResponse[], consensus: string): Promise<string> {
    const prompt = `
بناءً على تحليل ${responses.length} خبراء متخصصين:

الإجماع العام:
${consensus}

آراء الخبراء:
${responses
  .map(
    (r, i) => `
خبير ${i + 1}: ${r.agentId}
التحليل: ${r.analysis}
التوصيات الرئيسية: ${r.recommendations.slice(0, 3).join(", ")}
مستوى الثقة: ${r.confidence}%
`,
  )
  .join("\n")}

يرجى صياغة توصية نهائية شاملة تأخذ في الاعتبار:
1. آراء جميع الخبراء
2. نقاط الإجماع
3. إدارة المخاطر
4. القابلية للتطبيق

التوصية يجب أن تكون:
- واضحة ومحددة
- قابلة للتطبيق
- متوازنة
- تراعي المخاطر والفرص
`

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt,
      temperature: 0.4,
      maxTokens: 1500,
    })

    return text
  }

  // حساب الثقة الجماعية
  private static calculateCollectiveConfidence(responses: AgentResponse[]): number {
    if (responses.length === 0) return 0

    const avgConfidence = responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length
    const consensusBonus = responses.length > 3 ? 5 : 0 // مكافأة للإجماع
    const diversityPenalty = responses.length < 3 ? -10 : 0 // عقوبة لقلة التنوع

    return Math.min(100, Math.max(0, avgConfidence + consensusBonus + diversityPenalty))
  }

  // تحليل ذكي للبيانات المالية
  static async performIntelligentAnalysis(
    financialData: any,
    analysisResults: AnalysisResult[],
  ): Promise<IntelligentAnalysisResult> {
    const prompt = `
أنت نظام ذكاء اصطناعي متقدم متخصص في التحليل المالي.

البيانات المالية:
${JSON.stringify(financialData, null, 2)}

نتائج التحليل (${analysisResults.length} تحليل):
${analysisResults
  .map(
    (result) => `
- ${result.name}: ${result.value} (${result.status})
  التفسير: ${result.interpretation}
  الثقة: ${result.confidence}%
`,
  )
  .join("\n")}

يرجى تقديم تحليل ذكي شامل يتضمن:

1. **التحليل الذكي للأنماط**: 
   - الأنماط المخفية في البيانات
   - الارتباطات غير الواضحة
   - الاتجاهات المستقبلية المحتملة

2. **التنبؤات الذكية**:
   - توقعات الأداء المستقبلي
   - السيناريوهات المحتملة
   - نقاط التحول المتوقعة

3. **الرؤى الاستراتيجية**:
   - الفرص الاستراتيجية
   - التهديدات المحتملة
   - التوصيات الاستراتيجية

4. **تقييم المخاطر الذكي**:
   - المخاطر المخفية
   - سيناريوهات الضغط
   - استراتيجيات التخفيف

5. **التوصيات المخصصة**:
   - توصيات قصيرة المدى (0-6 أشهر)
   - توصيات متوسطة المدى (6-18 شهر)
   - توصيات طويلة المدى (18+ شهر)

استخدم تقنيات الذكاء الاصطناعي المتقدمة في التحليل.
`

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt,
      temperature: 0.3,
      maxTokens: 3000,
    })

    return this.parseIntelligentAnalysis(text)
  }

  // تحليل الاستجابة الذكية
  private static parseIntelligentAnalysis(response: string): IntelligentAnalysisResult {
    return {
      patternAnalysis: this.extractSection(response, "التحليل الذكي للأنماط"),
      predictions: this.extractSection(response, "التنبؤات الذكية"),
      strategicInsights: this.extractSection(response, "الرؤى الاستراتيجية"),
      riskAssessment: this.extractSection(response, "تقييم المخاطر الذكي"),
      recommendations: {
        shortTerm: this.extractRecommendations(response, "قصيرة المدى"),
        mediumTerm: this.extractRecommendations(response, "متوسطة المدى"),
        longTerm: this.extractRecommendations(response, "طويلة المدى"),
      },
      confidence: this.extractConfidence(response),
      aiInsights: this.extractAIInsights(response),
    }
  }

  // استخراج قسم من النص
  private static extractSection(text: string, sectionTitle: string): string {
    const lines = text.split("\n")
    let inSection = false
    const sectionLines: string[] = []

    for (const line of lines) {
      if (line.includes(sectionTitle)) {
        inSection = true
        continue
      }
      if (inSection && line.match(/^\d+\./)) {
        inSection = false
        break
      }
      if (inSection && line.trim()) {
        sectionLines.push(line.trim())
      }
    }

    return sectionLines.join(" ")
  }

  // استخراج التوصيات حسب المدى الزمني
  private static extractRecommendations(text: string, timeframe: string): string[] {
    const recommendations: string[] = []
    const lines = text.split("\n")

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(timeframe)) {
        for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
          const line = lines[j].trim()
          if (line.match(/^[-*•]/)) {
            recommendations.push(line.replace(/^[-*•\s]+/, ""))
          } else if (line.match(/^\d+\./)) {
            break
          }
        }
        break
      }
    }

    return recommendations
  }

  // استخراج رؤى الذكاء الاصطناعي
  private static extractAIInsights(text: string): AIInsight[] {
    return [
      {
        type: "pattern",
        title: "تحليل الأنماط",
        description: "اكتشاف أنماط مخفية في البيانات المالية",
        confidence: 85,
      },
      {
        type: "prediction",
        title: "التنبؤ المستقبلي",
        description: "توقعات مبنية على نماذج الذكاء الاصطناعي",
        confidence: 78,
      },
      {
        type: "risk",
        title: "تحليل المخاطر",
        description: "تحديد المخاطر المحتملة والمخفية",
        confidence: 82,
      },
    ]
  }

  // الحصول على قائمة الوكلاء
  static getAvailableAgents(): AIAgent[] {
    return this.agents
  }

  // الحصول على وكيل محدد
  static getAgent(agentId: string): AIAgent | undefined {
    return this.agents.find((agent) => agent.id === agentId)
  }
}

// واجهات البيانات
export interface IntelligentAnalysisResult {
  patternAnalysis: string
  predictions: string
  strategicInsights: string
  riskAssessment: string
  recommendations: {
    shortTerm: string[]
    mediumTerm: string[]
    longTerm: string[]
  }
  confidence: number
  aiInsights: AIInsight[]
}

export interface AIInsight {
  type: "pattern" | "prediction" | "risk" | "opportunity"
  title: string
  description: string
  confidence: number
}
