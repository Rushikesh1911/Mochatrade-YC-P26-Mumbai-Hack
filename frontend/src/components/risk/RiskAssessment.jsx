import React from "react"
import { BentoCard } from "@/components/aceternity/BentoCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ShieldAlert,
  SlidersHorizontal,
  GitBranch,
  ArrowRight,
  AlertCircle,
  Eye,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { useNavigation } from "@/context/NavigationContext"
import { riskAssessmentData } from "@/data/risk-analysis-demo"

export function RiskAssessment({ data = riskAssessmentData }) {
  const { navigate } = useNavigation()

  const {
    overallRisk,
    overallScore,
    primaryConcern,
    keyObservation,
    currentStatus,
    recommendedAction,
    scenariosRoute,
    hedgeAdvisorRoute,
  } = data

  const handleOpenScenarios = () => {
    navigate(scenariosRoute || "scenarios")
  }

  const handleOpenHedgeAdvisor = () => {
    navigate(hedgeAdvisorRoute || "hedge-advisor")
  }

  return (
    <BentoCard
      glowColor="rgba(37, 99, 235, 0.15)"
      className="flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Risk Assessment
              </h3>
              <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                EXECUTIVE SUMMARY
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Holistic downside risk diagnosis and next steps in the treasury workflow.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Overall Risk:
            </span>
            <Badge
              variant="destructive"
              className="text-xs font-mono font-bold px-2.5 py-0.5 uppercase tracking-wider"
            >
              {overallRisk} ({overallScore}/100)
            </Badge>
          </div>
        </div>

        {/* 3 Core Assessment Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
          {/* 1. Primary Concern */}
          <div className="rounded-xl border border-red-500/20 bg-red-50/50 dark:bg-red-950/20 p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Primary Concern</span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {primaryConcern}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-mono">
              Driver: USD/INR Delta Weight
            </span>
          </div>

          {/* 2. Key Observation */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Eye className="h-4 w-4 shrink-0" />
                <span>Key Observation</span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {keyObservation}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-mono">
              Stress Impact: +₹82 L
            </span>
          </div>

          {/* 3. Current Status */}
          <div className="rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Current Status</span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {currentStatus}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-mono">
              Buffer Remaining: 9%
            </span>
          </div>
        </div>

        {/* Recommended Action Pill */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">
                Treasury Action Item:
              </span>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                {recommendedAction}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Workflow Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          Workflow Transition: <strong>QUANTIFY RISK</strong> → SIMULATE → DECIDE
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Open Scenario Analysis Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenScenarios}
            className="h-9 gap-2 text-xs font-semibold border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-slate-700 dark:text-slate-200"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-blue-500" />
            <span>Open Scenario Analysis</span>
            <ArrowRight className="h-3 w-3 text-slate-400" />
          </Button>

          {/* Open Hedge Advisor Button */}
          <Button
            variant="default"
            size="sm"
            onClick={handleOpenHedgeAdvisor}
            className="h-9 gap-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/20"
          >
            <GitBranch className="h-3.5 w-3.5" />
            <span>Open Hedge Advisor</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </BentoCard>
  )
}

export default RiskAssessment
