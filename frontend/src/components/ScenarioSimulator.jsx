import { useState } from 'react'
import { inr } from '../utils/formatters'

export default function ScenarioSimulator({ analysis, result, onSimulate, loading }) {
  const [scenarioRate, setScenarioRate] = useState(93)
  if (!analysis) return <section className="card muted"><span className="eyebrow">3 · Simulate</span><h2>Test a USD/INR scenario</h2><p>Analyze an exposure first to test how a rate movement changes its INR cost.</p></section>
  function submit(event) { event.preventDefault(); onSimulate({ ...analysis, scenario_rate: Number(scenarioRate) }) }
  return <section className="card"><span className="eyebrow">3 · Scenario simulator</span><h2>What if USD/INR changes?</h2><form className="control-row" onSubmit={submit}><label>Scenario USD/INR rate<input aria-label="Scenario USD/INR rate" type="number" min="0.01" step="0.01" value={scenarioRate} onChange={(event) => setScenarioRate(event.target.value)} /></label><button disabled={loading}>Run scenario</button></form>{result && <div className="metrics two-columns"><div><small>Scenario cost</small><strong>{inr.format(result.unhedged_scenario_cost)}</strong></div><div><small>Change from base</small><strong className={result.additional_unhedged_cost > 0 ? 'negative' : 'positive'}>{result.additional_unhedged_cost > 0 ? '+' : ''}{inr.format(result.additional_unhedged_cost)}</strong><span>{result.rate_change > 0 ? '+' : ''}{result.rate_change.toFixed(2)} INR/USD · {result.rate_change_percent.toFixed(2)}%</span></div></div>}</section>
}
