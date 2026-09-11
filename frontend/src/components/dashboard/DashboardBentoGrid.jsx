import React from "react"
import { useApp } from "@/context/AppContext"
import { RiskScoreCard } from "./RiskScoreCard"
import { ExposureCard } from "./ExposureCard"
import { PotentialImpactCard } from "./PotentialImpactCard"
import { AlertsCard } from "./AlertsCard"
import { ExposureTrend } from "./ExposureTrend"
import { RiskBreakdown } from "./RiskBreakdown"
import { CurrencyExposure } from "./CurrencyExposure"
import { RecentAlerts } from "./RecentAlerts"
import { UpcomingPayments } from "./UpcomingPayments"

export function DashboardBentoGrid({
  data,
  selectedPeriod,
}) {
  const { kpis, exposureTrend, riskBreakdown, currencyExposure, recentAlerts, upcomingPayments } = data
  const { liveRiskScore, liveRiskLevel } = useApp()

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ROW 1: KPI Metrics (4 Cards) */}
      <section aria-label="Key Risk Indicators" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        <RiskScoreCard
          score={liveRiskScore !== null ? liveRiskScore : kpis.overallRisk.score}
          maxScore={kpis.overallRisk.maxScore}
          level={liveRiskLevel || kpis.overallRisk.level}
          change={liveRiskScore !== null ? "Live" : kpis.overallRisk.change}
          period={liveRiskScore !== null ? "from uploaded file" : kpis.overallRisk.period}
        />
        <ExposureCard
          value={kpis.totalExposure.value}
          currencyBreakdown={kpis.totalExposure.currencyBreakdown}
        />
        <PotentialImpactCard
          value={kpis.potentialImpact.value}
          description={kpis.potentialImpact.description}
          stressScenario={kpis.potentialImpact.stressScenario}
        />
        <AlertsCard
          total={kpis.activeAlerts.total}
          critical={kpis.activeAlerts.critical}
          medium={kpis.activeAlerts.medium}
          description={kpis.activeAlerts.description}
        />
      </section>

      {/* ROW 2: Exposure Trend (Large) + Risk Breakdown (Medium) */}
      <section aria-label="Exposure Analysis" className="grid grid-cols-1 gap-4 lg:grid-cols-12 sm:gap-5">
        <div className="lg:col-span-7 xl:col-span-8">
          <ExposureTrend
            trendData={exposureTrend}
            defaultPeriod={selectedPeriod}
          />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <RiskBreakdown riskData={riskBreakdown} />
        </div>
      </section>

      {/* ROW 3: Currency Exposure + Recent Alerts */}
      <section aria-label="Currency Breakdown and Alerts" className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-5">
        <CurrencyExposure currencies={currencyExposure} />
        <RecentAlerts alerts={recentAlerts} />
      </section>

      {/* ROW 4: Upcoming Payments Schedule */}
      <section aria-label="Scheduled Payables">
        <UpcomingPayments payments={upcomingPayments} />
      </section>
    </div>
  )
}
