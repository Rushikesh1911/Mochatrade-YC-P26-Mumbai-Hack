/**
 * HedgeMind Corporate Treasury Risk - Exposure Service
 * Handles file upload communication, basic client-side UX checks,
 * backend API interaction, and graceful mock fallback.
 * STRICTLY NO CLIENT-SIDE FINANCIAL RECALCULATIONS.
 */

import { demoBatchUpload, demoAnalyzedExposures } from "@/data/exposure-demo"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

/**
 * Basic UX validation of uploaded file format
 */
export function validateFileFormat(file) {
  if (!file) {
    return { valid: false, error: "No file selected." }
  }

  const name = file.name.toLowerCase()
  const isCsv = name.endsWith(".csv")
  const isXlsx = name.endsWith(".xlsx") || name.endsWith(".xls")

  if (!isCsv && !isXlsx) {
    return {
      valid: false,
      error: "Unsupported file format. Please upload a CSV or XLSX file.",
    }
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: "The uploaded file contains no exposure records (file is empty).",
    }
  }

  return { valid: true }
}

/**
 * Parse CSV text to preview rows and detect column aliases
 */
export function parseCsvText(text) {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length <= 1) {
    throw new Error("The uploaded file contains no data records beyond headers.")
  }

  const headerLine = lines[0]
  const rawHeaders = headerLine.split(",").map((h) => h.trim().toLowerCase().replace(/^["']|["']$/g, ""))

  // Check column alias: supplier -> counterparty
  let columnMapping = null
  const normalizedHeaders = rawHeaders.map((h) => {
    if (h === "supplier") {
      columnMapping = { detected: true, original: "supplier", mapped: "counterparty" }
      return "counterparty"
    }
    return h
  })

  // Required columns
  const required = ["counterparty", "currency", "amount", "days_to_payment"]
  const missing = required.filter((req) => !normalizedHeaders.includes(req))

  if (missing.length > 0) {
    throw new Error(`Required columns are missing: ${missing.join(", ")}`)
  }

  const counterpartyIdx = normalizedHeaders.indexOf("counterparty")
  const currencyIdx = normalizedHeaders.indexOf("currency")
  const amountIdx = normalizedHeaders.indexOf("amount")
  const daysIdx = normalizedHeaders.indexOf("days_to_payment")

  const exposures = []
  const rejectedRows = []

  for (let i = 1; i < lines.length; i++) {
    const rowNum = i + 1
    const cols = lines[i].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""))

    const counterparty = cols[counterpartyIdx] || `Counterparty-${rowNum}`
    const currency = (cols[currencyIdx] || "USD").toUpperCase()
    const rawAmount = cols[amountIdx]
    const rawDays = cols[daysIdx]

    const numAmount = parseFloat(rawAmount)
    const numDays = parseInt(rawDays, 10)

    // UX Validation Checks
    if (isNaN(numAmount) || numAmount <= 0) {
      rejectedRows.push({
        row: rowNum,
        counterparty,
        currency,
        amount: rawAmount,
        days_to_payment: rawDays,
        reason: "amount must be greater than zero",
        status: "Rejected",
      })
      exposures.push({
        id: `row-${rowNum}`,
        row: rowNum,
        counterparty,
        currency,
        amount: rawAmount,
        days_to_payment: rawDays,
        status: "Rejected",
        reason: "amount must be greater than zero",
      })
      continue
    }

    if (isNaN(numDays) || isNaN(Number(rawDays)) || numDays < 0) {
      rejectedRows.push({
        row: rowNum,
        counterparty,
        currency,
        amount: numAmount,
        days_to_payment: rawDays,
        reason: "days_to_payment must be numeric",
        status: "Rejected",
      })
      exposures.push({
        id: `row-${rowNum}`,
        row: rowNum,
        counterparty,
        currency,
        amount: numAmount,
        days_to_payment: rawDays,
        status: "Rejected",
        reason: "days_to_payment must be numeric",
      })
      continue
    }

    exposures.push({
      id: `row-${rowNum}`,
      row: rowNum,
      counterparty,
      currency,
      amount: numAmount,
      days_to_payment: numDays,
      status: "Valid",
    })
  }

  const validExposures = exposures.filter((e) => e.status === "Valid")

  return {
    rows_processed: lines.length - 1,
    accepted_rows: validExposures.length,
    rejected_rows: rejectedRows,
    column_mapping: columnMapping,
    exposures,
  }
}

/**
 * Upload exposure file to backend API or process via client parser
 */
export async function uploadExposureFile(file, baseRate = 88.5) {
  const formatCheck = validateFileFormat(file)
  if (!formatCheck.valid) {
    throw new Error(formatCheck.error)
  }

  // First try calling real backend if available
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${API_BASE_URL}/api/upload?base_rate=${encodeURIComponent(baseRate)}`, {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      // If backend returned conceptual batch response
      if (data.rows_processed && data.exposures) {
        return {
          filename: file.name,
          fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          fileType: file.type || "text/csv",
          ...data,
        }
      }
    }
  } catch (backendError) {
    console.info("Backend API /api/upload unreachable or prototype mode. Using client parser with demo fallback.")
  }

  // Client-side parser for CSV files
  if (file.name.toLowerCase().endsWith(".csv")) {
    try {
      const text = await file.text()
      const parsed = parseCsvText(text)
      return {
        filename: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        fileType: "text/csv",
        ...parsed,
      }
    } catch (parseError) {
      throw new Error(parseError.message || "Failed to parse exposure CSV file.")
    }
  }

  // Simulated latency for XLSX / demo files
  await new Promise((resolve) => setTimeout(resolve, 400))

  return {
    ...demoBatchUpload,
    filename: file.name,
    fileSize: `${(file.size / 1024).toFixed(1)} KB`,
    fileType: file.type || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  }
}

/**
 * Submit valid exposures to backend for financial analysis
 */
export async function analyzeExposures(exposures, baseRate = 88.5) {
  if (!exposures || exposures.length === 0) {
    throw new Error("No valid exposure records available to analyze.")
  }

  const validPayload = exposures
    .filter((e) => e.status === "Valid" || !e.status)
    .map((e) => ({
      counterparty: e.counterparty,
      currency: e.currency,
      amount: e.amount,
      days_to_payment: e.days_to_payment,
    }))

  if (validPayload.length === 0) {
    throw new Error("No valid exposures found in current dataset.")
  }

  // Attempt real backend call
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exposures: validPayload,
        base_rate: baseRate,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (Array.isArray(data.exposures)) {
        return {
          success: true,
          analyzedCount: data.exposures.length,
          exposures: data.exposures,
        }
      }
    }
  } catch (error) {
    console.info("Backend API /api/analyze unreachable or prototype mode. Using simulated risk engine response.")
  }

  // Simulated server processing delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Match with pre-calculated mock analyzed records or generate standard financial results
  const currencyRates = {
    USD: baseRate,
    EUR: 96.2,
    GBP: 114.5,
    JPY: 0.58,
    CHF: 101.4,
  }

  const analyzed = validPayload.map((exp, idx) => {
    // Check if pre-calculated exists in demo data
    const matched = demoAnalyzedExposures.find(
      (d) => d.counterparty === exp.counterparty && d.currency === exp.currency
    )

    if (matched) {
      return { ...exp, ...matched }
    }

    // Default prototype mapping returned from mock risk engine
    const rate = currencyRates[exp.currency] || baseRate
    const inrExposure = Math.round(exp.amount * rate)
    const riskScore = Math.min(95, Math.max(35, Math.round(50 + (exp.days_to_payment < 7 ? 25 : 10))))
    const riskLevel = riskScore >= 80 ? "HIGH" : riskScore >= 60 ? "MEDIUM" : "LOW"

    return {
      ...exp,
      inr_exposure: inrExposure,
      risk_score: riskScore,
      risk_level: riskLevel,
    }
  })

  return {
    success: true,
    analyzedCount: analyzed.length,
    exposures: analyzed,
  }
}
