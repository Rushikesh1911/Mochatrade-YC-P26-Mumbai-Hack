import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { dashboardData } from "@/data/dashboard-demo"

export function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30D")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }

  return (
    <MainLayout
      selectedPeriod={selectedPeriod}
      onPeriodChange={setSelectedPeriod}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    >
      <Dashboard data={dashboardData} selectedPeriod={selectedPeriod} />
    </MainLayout>
  )
}

export default DashboardPage
