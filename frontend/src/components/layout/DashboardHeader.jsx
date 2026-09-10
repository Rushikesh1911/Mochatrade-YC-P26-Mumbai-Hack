import React, { useState } from "react"
import { RefreshCw, Calendar, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppSidebar } from "./AppSidebar"

export function DashboardHeader({
  selectedPeriod = "30D",
  onPeriodChange,
  onRefresh,
  isRefreshing = false,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const periodLabels = {
    "7D": "7 Days",
    "30D": "30 Days",
    "90D": "90 Days",
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-6 backdrop-blur-xl">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden h-8 w-8 text-slate-300 border-slate-800"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-slate-950 border-r border-slate-800">
            <AppSidebar onItemClick={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
            Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Financial risk overview
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
              className="h-8 gap-1.5 border-slate-800 bg-slate-900/80 px-2.5 text-xs font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-800"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{periodLabels[selectedPeriod] || selectedPeriod}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 opacity-80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 border-slate-800 bg-slate-900">
            <DropdownMenuItem
              onClick={() => onPeriodChange && onPeriodChange("7D")}
              className={`cursor-pointer text-xs ${selectedPeriod === "7D" ? "text-blue-400 font-semibold" : "text-slate-300"}`}
            >
              7 Days
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onPeriodChange && onPeriodChange("30D")}
              className={`cursor-pointer text-xs ${selectedPeriod === "30D" ? "text-blue-400 font-semibold" : "text-slate-300"}`}
            >
              30 Days
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onPeriodChange && onPeriodChange("90D")}
              className={`cursor-pointer text-xs ${selectedPeriod === "90D" ? "text-blue-400 font-semibold" : "text-slate-300"}`}
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
          className="h-8 gap-1.5 border-slate-800 bg-slate-900/80 px-3 text-xs font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-800"
          aria-label="Refresh Risk Data"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 text-blue-400 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>
    </header>
  )
}
