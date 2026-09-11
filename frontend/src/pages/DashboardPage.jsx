import React from "react"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { dashboardData } from "@/data/dashboard-demo"

export function DashboardPage({ selectedPeriod = "30D" }) {
  return <Dashboard data={dashboardData} selectedPeriod={selectedPeriod} />
}

export default DashboardPage
