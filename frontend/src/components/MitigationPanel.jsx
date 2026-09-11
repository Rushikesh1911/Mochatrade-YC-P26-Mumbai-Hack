import { useEffect, useState } from 'react'
import { inr, usd } from '../utils/formatters'

export default function MitigationPanel({ scenario, result, onMitigate, loading }) {
  const [hedgePercent, setHedgePercent] = useState(50)
  const [hedgeRate, setHedgeRate] = useState(87)
  const payload = scenario ? { ...scenario, hedge_ratio: Number(hedgePercent) / 100, assumed_hedge_rate: Number(hedgeRate) } : null

  useEffect(() => {
    if (!payload || Number(hedgeRate) <= 0) return undefined
    const timer = window.setTimeout(() => onMitigate(payload), 250)
    return () => window.clearTimeout(timer)
  }, [scenario, hedgePercent, hedgeRate, onMitigate])

  if (!scenario) return <section className="card muted"><span className="eyebrow">4 · Mitigate</span><h2>Compare an illustrative partial hedge</h2><p>Run a scenario first to compare the position with a simplified partial hedge.</p></section>

  function submit(event) { event.preventDefault(); onMitigate(payload) }

  return <section className="card"><span className="eyebrow">4 · Illustrative mitigation</span><h2>Reduce sensitivity with an illustrative hedge</h2><form onSubmit={submit}><div className="range-row"><label htmlFor="hedge-ratio">Hedge percentage<span>Percentage of your USD exposure protected from the scenario FX rate.</span></label><output>{hedgePercent}%</output><input id="hedge-ratio" type="range" min="0" max="100" step="5" value={hedgePercent} onChange={(event) => setHedgePercent(event.target.value)} /></div><div className="amount-split"><div><small>Total exposure</small><strong>{usd.format(scenario.amount)}</strong></div><div><small>Protected</small><strong>{result ? usd.format(result.hedged_portion) : '—'}</strong></div><div><small>Unprotected</small><strong>{result ? usd.format(result.unhedged_portion) : '—'}</strong></div></div><div className="control-row"><label>Assumed protected rate<input aria-label="Assumed protected rate" type="number" min="0.01" step="0.01" value={hedgeRate} onChange={(event) => setHedgeRate(event.target.value)} /><span>Rate assumed for the protected portion. This is an illustrative prototype assumption, not a live market quote.</span></label><button disabled={loading}>Update comparison</button></div></form>{result && <><div className="calculation"><div><small>Without hedge</small><strong>{usd.format(result.amount)} × ₹{result.scenario_rate} = {inr.format(result.unhedged_scenario_cost)}</strong></div><div><small>With {hedgePercent}% illustrative hedge</small><strong>{usd.format(result.hedged_portion)} × ₹{result.assumed_hedge_rate} + {usd.format(result.unhedged_portion)} × ₹{result.scenario_rate} = {inr.format(result.illustrative_hedged_scenario_cost)}</strong></div></div><div className="metrics three-columns"><div><small>Unhedged cost</small><strong>{inr.format(result.unhedged_scenario_cost)}</strong></div><div><small>Illustrative hedged cost</small><strong>{inr.format(result.illustrative_hedged_scenario_cost)}</strong></div><div><small>Illustrative benefit</small><strong className={result.illustrative_benefit >= 0 ? 'positive' : 'negative'}>{inr.format(result.illustrative_benefit)}</strong></div></div><p className="warning" role="note">{result.disclaimer}</p></>}</section>
}
