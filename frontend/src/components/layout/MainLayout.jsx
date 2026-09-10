import React from "react"
import { AppSidebar } from "./AppSidebar"
import { DashboardHeader } from "./DashboardHeader"
import { Spotlight } from "@/components/aceternity/Spotlight"

export function MainLayout({
  children,
  selectedPeriod,
  onPeriodChange,
  onRefresh,
  isRefreshing,
}) {
  return (
    <div className="relative flex min-h-screen w-full bg-[#060911] text-slate-100 antialiased">
      {/* Subtle enterprise background spotlight */}
      <Spotlight fill="#3b82f6" />

      {/* Desktop Fixed Left Sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-72 md:flex-col md:fixed md:inset-y-0 z-40">
        <AppSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:pl-64 lg:pl-72">
        <DashboardHeader
          selectedPeriod={selectedPeriod}
          onPeriodChange={onPeriodChange}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
