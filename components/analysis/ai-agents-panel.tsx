"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  Brain,
  TrendingUp,
  Shield,
  Target,
  BarChart3,
  Calculator,
  Lightbulb,
  Users,
  MessageSquare,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import {
  MultiAgentSystem,
  type CollaborativeAnalysis,
  type IntelligentAnalysisResult,
} from "@/lib/ai/multi-agent-system"

interface AIAgentsPanelProps {
  financialData: any
  analysisResults: any[]
  onAnalysisComplete?: (result: any) => void
}

export function AIAgentsPanel({ financialData, analysisResults, onAnalysisComplete }: AIAgentsPanelProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [collaborativeResult, setCollaborativeResult] = useState<CollaborativeAnalysis | null>(null)
  const [intelligentResult, setIntelligentResult] = useState<IntelligentAnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState("agents")

  const agents = MultiAgentSystem.getAvailableAgents()

  const getAgentIcon = (agentId: string) => {
    const icons = {
      financial_analyst: BarChart3,
      risk_specialist: Shield,
      investment_advisor: TrendingUp,
      market_analyst: Target,
      credit_analyst: Calculator,
      quantitative_analyst: Brain,
      strategy_consultant: Lightbulb,
    }
    const IconComponent = icons[agentId as keyof typeof icons] || Bot
    return <IconComponent className="h-5 w-5" />
  }

  const getAgentColor = (agentId: string) => {
    const colors = {
      financial_analyst: "bg-blue-500",
      risk_specialist: "bg-red-500",
      investment_advisor: "bg-green-500",
      market_analyst: "bg-purple-500",
      credit_analyst: "bg-orange-500",
      quantitative_analyst: "bg-indigo-500",
      strategy_consultant: "bg-pink-500",
    }
    return colors[agentId as keyof typeof colors] || "bg-gray-500"
  }

  const handleAgentSelection = (agentId: string, checked: boolean) => {
    if (checked) {
      setSelectedAgents([...selectedAgents, agentId])
    } else {
      setSelectedAgents(selectedAgents.filter((id) => id !== agentId))
    }
  }

  const handleCollaborativeAnalysis = async () => {
    if (selectedAgents.length === 0) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    try {
      // محاكاة تقدم التحليل
      const progressSteps = [
        { step: "تحضير البيانات", progress: 20 },
        { step: "تحليل الوكلاء", progress: 60 },
        { step: "تحليل الإجماع", progress: 80 },
        { step: "التوصية النهائية", progress: 100 },
      ]

      for (const { step, progress } of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setAnalysisProgress(progress)
      }

      const result = await MultiAgentSystem.performCollaborativeAnalysis(
        "تحليل شامل للوضع المالي",
        { financialData, analysisResults },
        selectedAgents,
      )

      setCollaborativeResult(result)
      onAnalysisComplete?.(result)
    } catch (error) {
      console.error("خطأ في التحليل التعاوني:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleIntelligentAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    try {
      // محاكاة تقدم التحليل الذكي
      const progressSteps = [
        { step: "تحليل الأنماط", progress: 25 },
        { step: "التنبؤات الذكية", progress: 50 },
        { step: "الرؤى الاستراتيجية", progress: 75 },
        { step: "التوصيات المخصصة", progress: 100 },
      ]

      for (const { step, progress } of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setAnalysisProgress(progress)
      }

      const result = await MultiAgentSystem.performIntelligentAnalysis(financialData, analysisResults)
      setIntelligentResult(result)
      onAnalysisComplete?.(result)
    } catch (error) {
      console.error("خطأ في التحليل الذكي:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* عنوان القسم */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-600" />
            نظام الوكلاء المتعددين والذكاء الاصطناعي
          </CardTitle>
          <CardDescription>
            استخدم فريق من الخبراء الافتراضيين المتخصصين لتحليل شامل ومتعدد الأبعاد للوضع المالي
          </CardDescription>
        </CardHeader>
      </Card>

      {/* تقدم التحليل */}
      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">جاري التحليل بالذكاء الاصطناعي...</span>
                <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 animate-spin" />
                يتم تحليل البيانات بواسطة الوكلاء المتخصصين...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">الوكلاء المتخصصين</TabsTrigger>
          <TabsTrigger value="collaborative">التحليل التعاوني</TabsTrigger>
          <TabsTrigger value="intelligent">التحليل الذكي</TabsTrigger>
        </TabsList>

        {/* تبويب الوكلاء */}
        <TabsContent value="agents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className={`cursor-pointer transition-all ${
                  selectedAgents.includes(agent.id) ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        checked={selectedAgents.includes(agent.id)}
                        onCheckedChange={(checked) => handleAgentSelection(agent.id, checked as boolean)}
                      />
                      <Avatar className={`h-10 w-10 ${getAgentColor(agent.id)}`}>
                        <AvatarFallback className="text-white">{getAgentIcon(agent.id)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{agent.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{agent.specialty}</p>
                      <p className="text-xs text-muted-foreground mt-2">{agent.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {agent.model}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          T: {agent.temperature}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCollaborativeAnalysis}
              disabled={selectedAgents.length === 0 || isAnalyzing}
              className="flex-1"
            >
              <Users className="h-4 w-4 mr-2" />
              تحليل تعاوني ({selectedAgents.length} وكيل)
            </Button>
            <Button
              onClick={handleIntelligentAnalysis}
              disabled={isAnalyzing}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <Zap className="h-4 w-4 mr-2" />
              تحليل ذكي متقدم
            </Button>
          </div>
        </TabsContent>

        {/* تبويب التحليل التعاوني */}
        <TabsContent value="collaborative" className="space-y-4">
          {collaborativeResult ? (
            <div className="space-y-4">
              {/* نظرة عامة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    نتائج التحليل التعاوني
                  </CardTitle>
                  <CardDescription>
                    تحليل من {collaborativeResult.agents.length} خبراء متخصصين بثقة{" "}
                    {collaborativeResult.confidenceScore}%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{collaborativeResult.agents.length}</div>
                      <div className="text-sm text-muted-foreground">خبراء مشاركين</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{collaborativeResult.confidenceScore}%</div>
                      <div className="text-sm text-muted-foreground">مستوى الثقة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{collaborativeResult.responses.length}</div>
                      <div className="text-sm text-muted-foreground">تحليلات مفصلة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* الإجماع */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    الإجماع العام
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{collaborativeResult.consensus}</p>
                </CardContent>
              </Card>

              {/* التوصية النهائية */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    التوصية النهائية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{collaborativeResult.finalRecommendation}</p>
                </CardContent>
              </Card>

              {/* آراء الخبراء */}
              <Card>
                <CardHeader>
                  <CardTitle>آراء الخبراء المفصلة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {collaborativeResult.responses.map((response, index) => {
                      const agent = agents.find((a) => a.id === response.agentId)
                      return (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className={`h-8 w-8 ${getAgentColor(response.agentId)}`}>
                              <AvatarFallback className="text-white text-xs">
                                {getAgentIcon(response.agentId)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-sm">{agent?.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                ثقة {response.confidence}%
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">التحليل: </span>
                              <span className="text-muted-foreground">{response.analysis}</span>
                            </div>
                            {response.recommendations.length > 0 && (
                              <div>
                                <span className="font-medium">التوصيات الرئيسية:</span>
                                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                                  {response.recommendations.slice(0, 3).map((rec, i) => (
                                    <li key={i}>{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* الآراء المتضاربة */}
              {collaborativeResult.conflictingViews.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      الآراء المتضاربة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {collaborativeResult.conflictingViews.map((conflict, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          {conflict}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">لا توجد نتائج تحليل تعاوني</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  اختر الوكلاء المتخصصين وابدأ التحليل التعاوني للحصول على رؤى شاملة
                </p>
                <Button onClick={() => setActiveTab("agents")}>اختيار الوكلاء</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* تبويب التحليل الذكي */}
        <TabsContent value="intelligent" className="space-y-4">
          {intelligentResult ? (
            <div className="space-y-4">
              {/* نظرة عامة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    التحليل الذكي المتقدم
                  </CardTitle>
                  <CardDescription>تحليل بالذكاء الاصطناعي بثقة {intelligentResult.confidence}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {intelligentResult.aiInsights.map((insight, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{insight.confidence}%</div>
                        <div className="text-sm text-muted-foreground">{insight.title}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* تحليل الأنماط */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    تحليل الأنماط الذكي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{intelligentResult.patternAnalysis}</p>
                </CardContent>
              </Card>

              {/* التنبؤات */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    التنبؤات الذكية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{intelligentResult.predictions}</p>
                </CardContent>
              </Card>

              {/* الرؤى الاستراتيجية */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-orange-600" />
                    الرؤى الاستراتيجية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{intelligentResult.strategicInsights}</p>
                </CardContent>
              </Card>

              {/* التوصيات المخصصة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    التوصيات المخصصة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="short" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="short">قصيرة المدى</TabsTrigger>
                      <TabsTrigger value="medium">متوسطة المدى</TabsTrigger>
                      <TabsTrigger value="long">طويلة المدى</TabsTrigger>
                    </TabsList>
                    <TabsContent value="short" className="mt-4">
                      <ul className="space-y-2">
                        {intelligentResult.recommendations.shortTerm.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="medium" className="mt-4">
                      <ul className="space-y-2">
                        {intelligentResult.recommendations.mediumTerm.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="long" className="mt-4">
                      <ul className="space-y-2">
                        {intelligentResult.recommendations.longTerm.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">لا توجد نتائج تحليل ذكي</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ابدأ التحليل الذكي المتقدم للحصول على رؤى عميقة وتنبؤات مستقبلية
                </p>
                <Button onClick={handleIntelligentAnalysis} disabled={isAnalyzing}>
                  <Zap className="h-4 w-4 mr-2" />
                  بدء التحليل الذكي
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
