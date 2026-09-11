import React, { useState } from "react"
import { useApp } from "@/context/AppContext"
import { BentoCard } from "@/components/aceternity/BentoCard"
import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight, Zap, RefreshCw } from "lucide-react"
import { getMitigation } from "@/services/riskService"

export function MitigationPanel() {
  const { liveExposures } = useApp()
  const [recommendations, setRecommendations] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRecommendations = async () => {
    if (!liveExposures || liveExposures.length === 0) {
      setError("No exposures available to mitigate.")
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const primary = liveExposures[0]
      const payload = {
        amount: primary.amount,
        currency: primary.currency,
        days_to_payment: primary.days_to_payment,
        exposure_type: primary.exposure_type || "payable",
        base_rate: 88.5,
        scenario_rate: 92.0, // mock scenario rate
        hedge_ratio: 0.5,
        assumed_hedge_rate: 89.0
      }
      
      const res = await getMitigation(payload)
      setRecommendations(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <BentoCard glowColor="rgba(34, 197, 94, 0.15)">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">AI Hedge Recommendations</h3>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchRecommendations} 
          disabled={isLoading || !liveExposures || liveExposures.length === 0}
          className="h-8 gap-2 border-slate-200 dark:border-slate-800"
        >
          {isLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5 text-orange-500" />}
          <span>{recommendations ? "Recalculate" : "Generate"}</span>
        </Button>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg mb-4">
          {error}
        </div>
      )}

      {!recommendations && !error && (
        <div className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
          {(!liveExposures || liveExposures.length === 0) 
            ? "Upload exposures first to get AI hedging recommendations."
            : "Click generate to see optimal hedge ratios based on your exposure."}
        </div>
      )}

      {recommendations && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
            <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
              Recommended Hedge: {recommendations.hedge_ratio * 100}% Coverage
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mt-3">
              <div>
                <div className="text-slate-500 text-xs">Unhedged Scenario Cost</div>
                <div className="font-mono mt-1 text-red-500">
                  ₹{recommendations.unhedged_scenario_cost.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Hedged Scenario Cost</div>
                <div className="font-mono mt-1 text-green-500">
                  ₹{recommendations.illustrative_hedged_scenario_cost.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-600 dark:text-slate-300">Projected Savings</span>
              <span className="font-bold text-green-500 flex items-center gap-1">
                <ArrowRight className="h-3.5 w-3.5" />
                ₹{recommendations.illustrative_benefit.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 text-center px-4">
            {recommendations.disclaimer}
          </div>
        </div>
      )}
    </BentoCard>
  )
}
