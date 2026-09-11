import React, { useState } from "react"
import { useApp } from "@/context/AppContext"
import { BentoCard } from "@/components/aceternity/BentoCard"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SlidersHorizontal,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
} from "lucide-react"
import { stressTestingScenarios } from "@/data/risk-analysis-demo"
import { simulateScenario } from "@/services/riskService"

export function StressTesting() {
  const { liveRiskScore, liveVolatility, liveExposures } = useApp()
  const [selectedScenarioId, setSelectedScenarioId] = useState("usd-plus-5")
  const [customShift, setCustomShift] = useState(6) // for custom scenario slider
  const [simulationResult, setSimulationResult] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)

  // Debounced Simulation Effect
  React.useEffect(() => {
    if (selectedScenarioId !== "custom" || !liveExposures || liveExposures.length === 0) return

    const timeoutId = setTimeout(async () => {
      setIsSimulating(true)
      try {
        const primary = liveExposures[0]
        const baseRate = 88.5
        const scenarioRate = baseRate * (1 + (customShift / 100))
        
        const res = await simulateScenario({
          amount: primary.amount,
          currency: primary.currency,
          days_to_payment: primary.days_to_payment,
          exposure_type: primary.exposure_type || "payable",
          base_rate: baseRate,
          scenario_rate: scenarioRate
        })
        setSimulationResult(res)
      } catch(err) {
        console.error("Simulation failed:", err)
      } finally {
        setIsSimulating(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [customShift, selectedScenarioId, liveExposures])

  const selectedScenario =
    stressTestingScenarios.find((s) => s.id === selectedScenarioId) ||
    stressTestingScenarios[0]

  // Calculate dynamic values if custom
  const isCustom = selectedScenario.id === "custom"
  
  // Use live data if available and we are on the first scenario, else fallback
  const baseScore = liveRiskScore || 72
  const hasLiveVol = !!liveVolatility
  const liveStressScore = hasLiveVol ? Math.min(100, baseScore + Math.round((liveVolatility.stress_cost_ratio || 0.05) * 200)) : null
  
  const stressedScore = hasLiveVol && selectedScenarioId === "usd-plus-5"
    ? liveStressScore
    : isCustom
    ? (simulationResult ? simulationResult.risk_score : Math.min(100, Math.max(30, baseScore + Math.round(customShift * 2.4))))
    : selectedScenario.stressedScore

  const additionalImpact = hasLiveVol && selectedScenarioId === "usd-plus-5"
    ? `+₹${Math.round(liveVolatility.potential_additional_cost).toLocaleString()}`
    : isCustom
    ? (simulationResult ? `${simulationResult.rate_change > 0 ? "+" : ""}₹${Math.round(simulationResult.additional_unhedged_cost).toLocaleString()}` : `${customShift >= 0 ? "+" : "-"}₹${Math.abs(customShift * 14).toFixed(0)} L`)
    : selectedScenario.additionalImpact

  const riskLevel =
    stressedScore >= 85
      ? "CRITICAL"
      : stressedScore >= 70
      ? "HIGH"
      : stressedScore >= 55
      ? "ELEVATED"
      : "MODERATE"

  const riskLevelColor =
    riskLevel === "CRITICAL"
      ? "text-red-600 dark:text-red-400 bg-red-500/15 border-red-500/30"
      : riskLevel === "HIGH"
      ? "text-orange-600 dark:text-orange-400 bg-orange-500/15 border-orange-500/30"
      : riskLevel === "ELEVATED"
      ? "text-amber-600 dark:text-amber-400 bg-amber-500/15 border-amber-500/30"
      : "text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border-emerald-500/30"

  return (
    <BentoCard
      glowColor="rgba(239, 68, 68, 0.12)"
      className="flex flex-col justify-between"
    >
      <div>
        {/* Header and Scenario Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                <SlidersHorizontal className="h-4 w-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Stress Testing
              </h3>
              <span className="rounded bg-orange-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 border border-orange-500/20">
                SCENARIO ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Evaluate how adverse market conditions could affect financial risk.
            </p>
          </div>

          {/* Scenario Selector Dropdown */}
          <div className="w-full sm:w-64 shrink-0">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Select Scenario
            </label>
            <Select
              value={selectedScenarioId}
              onValueChange={setSelectedScenarioId}
            >
              <SelectTrigger className="h-9 text-xs font-semibold">
                <SelectValue placeholder="Select stress scenario" />
              </SelectTrigger>
              <SelectContent align="end" className="max-h-72">
                {stressTestingScenarios.map((scenario) => (
                  <SelectItem
                    key={scenario.id}
                    value={scenario.id}
                    className="text-xs py-2"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {scenario.name}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2">
                      ({scenario.category})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Custom Scenario Interactive Slider (shown when Custom is selected) */}
        {isCustom && (
          <div className="mt-3 p-3 rounded-lg border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-blue-500" />
                Adjust Macroeconomic Shock (% shift):
              </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {customShift >= 0 ? `+${customShift}%` : `${customShift}%`}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="15"
              step="1"
              value={customShift}
              onChange={(e) => setCustomShift(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        )}

        {/* Scenario Result Panel (4 Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
          {/* Current Risk Score */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-3">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Current Risk Score
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {baseScore}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 100</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
              Baseline Position
            </span>
          </div>

          {/* Stressed Risk Score */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-3">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Stressed Risk Score
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span
                className={`text-2xl font-black font-mono ${
                  stressedScore >= 80
                    ? "text-red-600 dark:text-red-400"
                    : stressedScore >= 70
                    ? "text-orange-500"
                    : "text-emerald-500"
                }`}
              >
                {stressedScore}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 100</span>
            </div>
            <span className="text-[10px] font-mono text-red-600 dark:text-red-400 mt-1 block">
              {stressedScore > baseScore ? `+${stressedScore - baseScore} pts shock` : `${stressedScore - baseScore} pts relief`}
            </span>
          </div>

          {/* Risk Level */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-3">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Risk Level
            </span>
            <div className="mt-1">
              <span
                className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-mono font-bold tracking-wider uppercase border ${riskLevelColor}`}
              >
                {riskLevel}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block truncate">
              Scenario: {selectedScenario.name}
            </span>
          </div>

          {/* Additional Impact */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-3">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Est. Additional Impact
            </span>
            <span
              className={`text-xl font-black font-mono mt-0.5 block ${
                selectedScenario.impactDirection === "positive"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {additionalImpact}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block truncate">
              Incremental liability shift
            </span>
          </div>
        </div>

        {/* Visual Baseline vs Stressed Comparison Gauge */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
              Score Shift Comparison:
            </span>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-600 dark:text-slate-400">
                Baseline: <strong className="text-slate-900 dark:text-white">{baseScore}</strong>
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-red-600 dark:text-red-400">
                Stressed: <strong>{stressedScore}</strong>
              </span>
            </div>
          </div>

          {/* Baseline Bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
              <span>BASELINE</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{baseScore} / 100</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${baseScore}%` }}
              />
            </div>
          </div>

          {/* Stressed Bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-red-600 dark:text-red-400 font-semibold">
                STRESSED ({selectedScenario.name})
              </span>
              <span className="font-mono font-bold text-red-600 dark:text-red-400">
                {stressedScore} / 100
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  stressedScore >= 85 ? "bg-red-600" : stressedScore >= 70 ? "bg-orange-500" : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(100, stressedScore)}%` }}
              />
            </div>
          </div>

          {/* Scenario Context Note */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <Info className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
            <p>
              <strong>Impact Pathway:</strong> {selectedScenario.description}{" "}
              <span className="text-slate-400 dark:text-slate-500">
                Primary book impacted: {selectedScenario.driverAffected}.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span>Deterministic stress matrix</span>
        <span className="font-mono text-slate-600 dark:text-slate-400">
          Threshold Alert: {stressedScore >= 80 ? "CRITICAL RISK LEVEL" : "ELEVATED LEVEL"}
        </span>
      </div>
    </BentoCard>
  )
}

export default StressTesting
