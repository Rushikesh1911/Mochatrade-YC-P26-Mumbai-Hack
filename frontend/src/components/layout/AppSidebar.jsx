import React from "react"
import { SidebarNav } from "./SidebarNav"
import { ShieldCheck, Cpu, Building2 } from "lucide-react"

export function AppSidebar({ className = "", onItemClick }) {
  return (
    <aside
      className={`flex h-full w-full flex-col justify-between border-r border-slate-800/80 bg-slate-950/80 backdrop-blur-xl ${className}`}
    >
      {/* Top Header & Branding */}
      <div>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-900/30 text-white font-bold text-lg">
            H
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">
                HedgeMind
              </span>
              <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                COPILOT
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-tight">
              Corporate Financial Risk
            </span>
          </div>
        </div>

        {/* Engine Status Pill */}
        <div className="mx-4 my-3 flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/50 px-3 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium text-[11px]">AI Risk Engine</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
            ACTIVE
          </span>
        </div>

        {/* Navigation List */}
        <div className="mt-2">
          <SidebarNav onItemClick={onItemClick} />
        </div>
      </div>

      {/* Bottom Account / Session Context */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="flex items-center gap-3 rounded-lg border border-slate-800/60 bg-slate-900/40 p-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-800 text-slate-300">
            <Building2 className="h-4 w-4 text-blue-400" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-xs font-semibold text-slate-200">
              Corporate Treasury Desk
            </span>
            <span className="truncate text-[10px] text-slate-500">
              Enterprise Multi-Currency
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
