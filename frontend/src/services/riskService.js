// riskService.js
// Handles all risk, volatility, and AI explanation endpoints

const API_BASE = "http://127.0.0.1:8000/api/v1"

export async function calculateVolatility(currency, targetCurrency = "INR", days = 30, amount = 0) {
  try {
    const response = await fetch(`${API_BASE}/volatility`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency,
        target_currency: targetCurrency,
        days,
        amount
      }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.detail || "Failed to calculate volatility")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("RiskService - Volatility Error:", error)
    throw error
  }
}
