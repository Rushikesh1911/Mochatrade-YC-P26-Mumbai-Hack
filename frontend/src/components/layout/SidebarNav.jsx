import React from "react"
import {
  LayoutDashboard,
  Wallet,
  ShieldAlert,
  ChartNoAxesCombined,
  GitBranch,
  Bell,
  FileText,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

export const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "#dashboard",
    active: true,
    badge: null,
  },
  {
    title: "Exposure",
    icon: Wallet,
    href: "#exposure",
    active: false,
    badge: "Next",
  },
  {
    title: "Risk Analysis",
    icon: ShieldAlert,
    href: "#risk-analysis",
    active: false,
    badge: null,
  },
  {
    title: "Scenarios",
    icon: ChartNoAxesCombined,
    href: "#scenarios",
    active: false,
    badge: null,
  },
  {
    title: "Hedge Advisor",
    icon: GitBranch,
    href: "#hedge-advisor",
    active: false,
    badge: "AI",
  },
  {
    title: "Alerts",
    icon: Bell,
    href: "#alerts",
    active: false,
    badge: "7",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "#reports",
    active: false,
    badge: null,
  },
]

export const bottomNavItems = [
  {
    title: "Settings",
    icon: Settings,
    href: "#settings",
    active: false,
  },
]

export function SidebarNav({ onItemClick }) {
  return (
    <div className="flex flex-1 flex-col justify-between space-y-4">
      {/* Primary Navigation */}
      <nav className="space-y-1.5 px-3">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Core Platform
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.active

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => onItemClick && onItemClick(item.title)}
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 text-left cursor-pointer",
                isActive
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive
                      ? "text-blue-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  )}
                />
                <span className="truncate">{item.title}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide",
                    isActive
                      ? "bg-blue-500/20 text-blue-300"
                      : item.badge === "7"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-slate-800 text-slate-400"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Nav / Settings */}
      <div className="px-3 pt-4 border-t border-slate-800/80">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          System
        </p>
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => onItemClick && onItemClick(item.title)}
              className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-150 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent cursor-pointer"
            >
              <Icon className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-slate-300" />
              <span>{item.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
