import React, { useState } from "react"
import {
  ShieldAlert,
  RefreshCw,
  Calendar,
  Activity,
  Info,
  Layers,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiskMetricCards } from "@/components/risk/RiskMetricCards"
import { VaRAnalysis } from "@/components/risk/VaRAnalysis"
import { RiskDecomposition } from "@/components/risk/RiskDecomposition"
import { StressTesting } from "@/components/risk/StressTesting"
import { RiskDrivers } from "@/components/risk/RiskDrivers"
import { SensitivityAnalysis } from "@/components/risk/SensitivityAnalysis"
import { RiskCorrelationMatrix } from "@/components/risk/RiskCorrelationMatrix"
import { TailRiskAnalysis } from "@/components/risk/TailRiskAnalysis"
import { RiskConcentration } from "@/components/risk/RiskConcentration"
import { RiskThresholds } from "@/components/risk/RiskThresholds"
import { RiskAssessment } from "@/components/risk/RiskAssessment"
import { topRiskMetrics } from "@/data/risk-analysis-demo"

export function RiskAnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30 Days")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header (Section 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 shadow-sm shadow-red-500/5">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Risk Analysis
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Activity className="h-3 w-3" />
                QUANTIFY LAYER
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Quantify downside risk, stress-test exposures, and identify key risk drivers.
            </p>
          </div>
        </div>

        {/* Header Actions: Period & Refresh */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Period Selector Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs font-semibold border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
                aria-label="Select Period"
              >
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>{selectedPeriod}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => setSelectedPeriod("7 Days")}
                className={`cursor-pointer text-xs ${selectedPeriod === "7 Days" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
              >
                7 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedPeriod("30 Days")}
                className={`cursor-pointer text-xs ${selectedPeriod === "30 Days" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
              >
                30 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedPeriod("90 Days")}
                className={`cursor-pointer text-xs ${selectedPeriod === "90 Days" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
              >
                90 Days
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 gap-1.5 text-xs font-semibold border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
            aria-label="Refresh Risk Analysis"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-blue-600 dark:text-blue-400 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Risk Metrics (Section 5: 4 Compact Bento Cards) */}
      <RiskMetricCards metrics={topRiskMetrics} />

      {/* 3. Bento Grid Workspace (Section 6) */}
      <div className="space-y-5">
        {/* ROW 1: Large Value at Risk (8 cols) + Medium Risk Decomposition (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8">
            <VaRAnalysis />
          </div>
          <div className="lg:col-span-4">
            <RiskDecomposition />
          </div>
        </div>

        {/* ROW 2: Large Stress Testing (8 cols) + Medium Risk Drivers (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8">
            <StressTesting />
          </div>
          <div className="lg:col-span-4">
            <RiskDrivers />
          </div>
        </div>

        {/* ROW 3: Medium Sensitivity Analysis (6 cols) + Medium Correlation Matrix (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6">
            <SensitivityAnalysis />
          </div>
          <div className="lg:col-span-6">
            <RiskCorrelationMatrix />
          </div>
        </div>

        {/* ROW 4: Large Tail Risk Analysis (8 cols) + Medium Risk Concentration (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8">
            <TailRiskAnalysis />
          </div>
          <div className="lg:col-span-4">
            <RiskConcentration />
          </div>
        </div>

        {/* ROW 5: Medium Risk Thresholds (5 cols) + Large Risk Assessment (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <RiskThresholds />
          </div>
          <div className="lg:col-span-7">
            <RiskAssessment />
          </div>
        </div>
      </div>

      {/* 4. Financial Disclaimer Footnote (Section 25) */}
      <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 text-xs text-slate-500 dark:text-slate-400">
        <Info className="h-4 w-4 text-blue-500 shrink-0" />
        <p className="leading-relaxed">
          <strong>Illustrative Demo Data:</strong> This financial risk terminal is a prototype evaluation workspace. All Value at Risk (VaR), Expected Shortfall, stress scenarios, correlation coefficients, and factor attributions represent simulated quantitative models. This software does not execute trades, provide investment advice, or guarantee loss prevention.
        </p>
      </div>
    </div>
  )
}

export default RiskAnalysisPage
