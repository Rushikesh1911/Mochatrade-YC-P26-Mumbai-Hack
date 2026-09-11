import { useCallback, useState } from 'react'
import { analyzeExposure, uploadExposure } from '../api/exposures'
import { mitigateExposure } from '../api/mitigation'
import { simulateExposure } from '../api/scenarios'
import { Footer, Header, Loading } from '../components/Common'
import MitigationPanel from '../components/MitigationPanel'
import RiskAnalysis from '../components/RiskAnalysis'
import ScenarioSimulator from '../components/ScenarioSimulator'
import UploadData from '../components/UploadData'

const DEMO = { amount: 50000, currency: 'USD', days_to_payment: 45, counterparty: 'ABC Electronics', exposure_type: 'payable', base_rate: 87 }

export default function HomePage() {
  const [result, setResult] = useState(null)
  const [scenario, setScenario] = useState(null)
  const [mitigation, setMitigation] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function analyze(exposure) { setLoading(true); setError(''); try { setResult(await analyzeExposure(exposure)); setScenario(null); setMitigation(null) } catch (err) { setError(err.message) } finally { setLoading(false) } }
  async function handleUpload(file) { setLoading(true); setError(''); try { const { exposure } = await uploadExposure(file, DEMO.base_rate); const nextResult = await analyzeExposure(exposure); setResult(nextResult); setScenario(null); setMitigation(null) } catch (err) { setError(err.message) } finally { setLoading(false) } }
  const simulate = useCallback(async (payload) => { setLoading(true); setError(''); try { setScenario(await simulateExposure(payload)); setMitigation(null) } catch (err) { setError(err.message) } finally { setLoading(false) } }, [])
  const mitigate = useCallback(async (payload) => { setLoading(true); setError(''); try { setMitigation(await mitigateExposure(payload)) } catch (err) { setError(err.message) } finally { setLoading(false) } }, [])
  return <main><Header /><div className="intro"><span className="eyebrow">Understand → quantify → simulate → mitigate</span><h2>See and manage your USD payable risk.</h2><p>Upload a simple exposure file, test USD/INR scenarios, then compare an illustrative partial hedge.</p></div><UploadData onDemo={() => analyze(DEMO)} onUpload={handleUpload} loading={loading} />{loading && <Loading label="Calculating exposure…" />}{error && <p className="error" role="alert">{error}. Is the API running on port 8000?</p>}<RiskAnalysis result={result} /><ScenarioSimulator analysis={result} result={scenario} onSimulate={simulate} loading={loading} /><MitigationPanel scenario={scenario} result={mitigation} onMitigate={mitigate} loading={loading} /><Footer /></main>
}
