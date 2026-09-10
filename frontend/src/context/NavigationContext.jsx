import React, { createContext, useContext, useState, useEffect } from "react"

const NavigationContext = createContext({
  activePage: "dashboard",
  navigate: () => null,
})

const VALID_PAGES = [
  "dashboard",
  "exposure",
  "risk-analysis",
  "scenarios",
  "hedge-advisor",
  "alerts",
  "reports",
  "settings",
]

export function NavigationProvider({ children }) {
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase()
      if (VALID_PAGES.includes(hash)) {
        return hash
      }
    }
    return "dashboard"
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase()
      if (VALID_PAGES.includes(hash)) {
        setActivePage(hash)
      } else if (!hash) {
        setActivePage("dashboard")
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigate = (pageId) => {
    const normalized = pageId.toLowerCase().replace(/\s+/g, "-")
    if (VALID_PAGES.includes(normalized)) {
      setActivePage(normalized)
      window.location.hash = `#${normalized}`
    } else {
      setActivePage("dashboard")
      window.location.hash = "#dashboard"
    }
  }

  return (
    <NavigationContext.Provider value={{ activePage, navigate }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
