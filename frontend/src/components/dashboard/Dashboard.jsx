import React from "react"
import { DashboardBentoGrid } from "./DashboardBentoGrid"
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react"

export function Dashboard({ data, selectedPeriod = "30D" }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Executive Copilot Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-900/40 p-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                Copilot Insight
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium">
                SEE Layer Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              High USD concentration (&gt;65% of net exposure) creates elevated volatility vulnerability for Q3 supplier payables.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-400 hidden lg:inline">
            Workflow: <strong className="text-blue-400 font-semibold">SEE</strong> → SIMULATE → DECIDE
          </span>
        </div>
      </div>

      {/* Main Bento Grid */}
      <DashboardBentoGrid data={data} selectedPeriod={selectedPeriod} />
    </div>
  )
}
export default Dashboard
