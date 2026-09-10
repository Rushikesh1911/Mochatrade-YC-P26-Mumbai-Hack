import { inr, usd } from '../utils/formatters'

export default function RiskAnalysis({ result }) {
  if (!result) return <section className="card muted"><span className="eyebrow">2 · Analyze</span><h2>Your FX exposure will appear here</h2><p>Choose demo data or upload a supported file to calculate the current INR liability.</p></section>
  return <section className="card result-card">
    <span className="eyebrow">2 · Analysis complete</span>
    <div className="analysis-heading"><div><h2>{result.counterparty ?? 'Supplier'} payable</h2><p>{usd.format(result.amount)} due in {result.days_to_payment} days at ₹{result.base_rate}/USD</p></div><span className={`badge ${result.risk_level}`}>{result.risk_level} risk</span></div>
    <div className="metrics"><div><small>Current INR exposure</small><strong>{inr.format(result.current_inr_exposure)}</strong></div><div><small>Risk score</small><strong>{result.risk_score}<em>/100</em></strong></div><div><small>Exposure type</small><strong className="capitalize">{result.exposure_type}</strong></div></div>
    <p className="disclaimer">Deterministic prototype result · USD payables only · not financial advice.</p>
  </section>
}
