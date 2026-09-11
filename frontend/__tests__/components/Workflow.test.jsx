import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import MitigationPanel from '../../src/components/MitigationPanel'
import ScenarioSimulator from '../../src/components/ScenarioSimulator'

const analysis = { amount: 50_000, currency: 'USD', days_to_payment: 45, base_rate: 87, counterparty: 'ABC Electronics', exposure_type: 'payable' }
const scenario = { ...analysis, scenario_rate: 93, unhedged_scenario_cost: 4_650_000, additional_unhedged_cost: 300_000, rate_change: 6, rate_change_percent: 6.896551724 }

describe('Phase 2 and 3 controls', () => {
  it('submits a selected scenario rate using the analyzed exposure', () => {
    const onSimulate = vi.fn()
    render(<ScenarioSimulator analysis={analysis} onSimulate={onSimulate} loading={false} />)

    fireEvent.change(screen.getByLabelText('Scenario USD/INR rate'), { target: { value: '94' } })
    fireEvent.click(screen.getByRole('button', { name: 'Run scenario' }))

    expect(onSimulate).toHaveBeenCalledWith({ ...analysis, scenario_rate: 94 })
  })

  it('shows the mitigation disclaimer returned by the API', () => {
    render(<MitigationPanel scenario={scenario} loading={false} onMitigate={vi.fn()} result={{ ...scenario, illustrative_hedged_scenario_cost: 4_500_000, illustrative_benefit: 150_000, disclaimer: 'Illustrative model only: assumed hedge rate is not live pricing.' }} />)

    expect(screen.getByText(/Illustrative model only/)).toBeInTheDocument()
    expect(screen.getByText('₹45,00,000')).toBeInTheDocument()
  })
})
