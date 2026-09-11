import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import RiskAnalysis from '../../src/components/RiskAnalysis'

const result = { amount: 50_000, currency: 'USD', days_to_payment: 45, counterparty: 'ABC Electronics', exposure_type: 'payable', base_rate: 87, current_inr_exposure: 4_350_000, risk_score: 36, risk_level: 'medium' }

describe('RiskAnalysis', () => {
  it('shows a useful empty state before an analysis', () => {
    render(<RiskAnalysis result={null} />)
    expect(screen.getByText('Your FX exposure will appear here')).toBeInTheDocument()
  })

  it('renders the analyzed FX exposure and score', () => {
    render(<RiskAnalysis result={result} />)
    expect(screen.getByText('ABC Electronics payable')).toBeInTheDocument()
    expect(screen.getByText('₹43,50,000')).toBeInTheDocument()
    expect(screen.getByText('36')).toBeInTheDocument()
    expect(screen.getByText('medium risk')).toBeInTheDocument()
  })
})
