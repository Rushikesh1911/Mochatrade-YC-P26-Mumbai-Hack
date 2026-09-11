import React from "react"
import { HeroContent } from "@/components/landing/HeroContent"
import { Hero3D } from "@/components/landing/Hero3D"

/**
 * LandingPage - HedgeMind 3D Animated Hero Landing Page
 * Root route: /
 * Deep cinematic interface (#050816) with 3D financial intelligence engine,
 * minimal enterprise typography, and single [ View Dashboard → ] CTA.
 */
export function LandingPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#050816] text-[#F8FAFC] overflow-x-hidden flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background Ambience & Atmospheric Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle top-left soft blue atmospheric glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-900/15 blur-[128px]" />

        {/* Center-right 3D visualization glow */}
        <div className="absolute top-1/2 -translate-y-1/2 right-10 lg:right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        {/* Faint financial grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Subtle radial dark mask to soften edges */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050816]/40 to-[#050816]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full min-h-[calc(100vh-6rem)]">
          {/* Left Column: Authoritative Financial Copilot Messaging */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start order-1">
            <HeroContent />
          </div>

          {/* Right Column: 3D Financial Risk & Intelligence Engine */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full h-[400px] sm:h-[480px] lg:h-[620px] order-2">
            <Hero3D />
          </div>
        </div>
      </div>
    </main>
  )
}

export default LandingPage
