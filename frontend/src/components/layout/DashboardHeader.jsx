import React, { useState } from "react"
import { RefreshCw, Calendar, ChevronDown, Menu, PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppSidebar } from "./AppSidebar"
import { useNavigation } from "@/context/NavigationContext"

const pageTitles = {
  dashboard: { title: "Dashboard", subtitle: "Financial risk overview" },
  exposure: { title: "Exposure", subtitle: "Foreign exchange & market exposure mapping" },
  "risk-analysis": { title: "Risk Analysis", subtitle: "Value at Risk & stress analytics" },
  scenarios: { title: "Scenarios", subtitle: "What-if scenario simulation engine" },
  "hedge-advisor": { title: "Hedge Advisor", subtitle: "AI hedging recommendations & trade-offs" },
  charts: { title: "Charts & Analytics", subtitle: "Financial risk visualizations and exposure insights" },
  alerts: { title: "Alerts", subtitle: "Threshold monitoring & corporate risk alerts" },
  reports: { title: "Reports", subtitle: "Treasury board summaries & audit trail" },
  settings: { title: "Settings", subtitle: "Appearance & platform preferences" },
}

export function DashboardHeader({
  selectedPeriod = "30D",
  onPeriodChange,
  onRefresh,
  isRefreshing = false,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { activePage } = useNavigation()

  const periodLabels = {
    "7D": "7 Days",
    "30D": "30 Days",
    "90D": "90 Days",
  }

  const currentMeta = pageTitles[activePage] || {
    title: activePage.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    subtitle: "Financial risk platform",
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/70 px-4 sm:px-6 backdrop-blur-xl transition-colors duration-200">
      {/* Left: Mobile Drawer Trigger, Desktop Collapse Toggle & Page Title */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile menu trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden h-8 w-8 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900"
              aria-label="Open Mobile Navigation Menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
            <AppSidebar onItemClick={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Desktop Hamburger Toggle (visible on desktop to quickly toggle sidebar) */}
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hidden md:flex h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}

        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
            {currentMeta.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Period selector & Refresh */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Period Selector Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{periodLabels[selectedPeriod] || selectedPeriod}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 opacity-80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
            <DropdownMenuItem
              onClick={() => onPeriodChange && onPeriodChange("7D")}
              className={`cursor-pointer text-xs ${selectedPeriod === "7D" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300"}`}
            >
              7 Days
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onPeriodChange && onPeriodChange("30D")}
              className={`cursor-pointer text-xs ${selectedPeriod === "30D" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300"}`}
            >
              30 Days
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onPeriodChange && onPeriodChange("90D")}
              className={`cursor-pointer text-xs ${selectedPeriod === "90D" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300"}`}
            >
              90 Days
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-8 gap-1.5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-3 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Refresh Risk Data"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 text-blue-600 dark:text-blue-400 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>
    </header>
  )
}

export default DashboardHeader
