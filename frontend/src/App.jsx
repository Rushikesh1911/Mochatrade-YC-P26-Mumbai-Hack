import React, { useState } from "react"
import { ThemeProvider } from "@/context/ThemeContext"
import { NavigationProvider, useNavigation } from "@/context/NavigationContext"
import { MainLayout } from "@/components/layout/MainLayout"
import { DashboardPage } from "@/pages/DashboardPage"
import { ChartsPage } from "@/pages/ChartsPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { PlaceholderPage } from "@/pages/PlaceholderPage"

function AppContent() {
  const { activePage } = useNavigation()
  const [selectedPeriod, setSelectedPeriod] = useState("30D")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }

  const renderCurrentPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage selectedPeriod={selectedPeriod} />
      case "charts":
        return <ChartsPage />
      case "settings":
        return <SettingsPage />
      case "exposure":
      case "risk-analysis":
      case "scenarios":
      case "hedge-advisor":
      case "alerts":
      case "reports":
        return <PlaceholderPage moduleId={activePage} />
      default:
        return <DashboardPage selectedPeriod={selectedPeriod} />
    }
  }

  return (
    <MainLayout
      selectedPeriod={selectedPeriod}
      onPeriodChange={setSelectedPeriod}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    >
      {renderCurrentPage()}
    </MainLayout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  )
}
