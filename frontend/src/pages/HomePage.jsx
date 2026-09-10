import { useState } from 'react'
import { analyzeExposure, uploadExposure } from '../api/exposures'
import { Footer, Header, Loading } from '../components/Common'
import RiskAnalysis from '../components/RiskAnalysis'
import UploadData from '../components/UploadData'

const DEMO = { amount: 50000, currency: 'USD', days_to_payment: 45, counterparty: 'ABC Electronics', exposure_type: 'payable', base_rate: 87 }

export default function HomePage() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function analyze(exposure) { setLoading(true); setError(''); try { setResult(await analyzeExposure(exposure)) } catch (err) { setError(err.message) } finally { setLoading(false) } }
  async function handleUpload(file) { setLoading(true); setError(''); try { const { exposure } = await uploadExposure(file, DEMO.base_rate); setResult(await analyzeExposure(exposure)) } catch (err) { setError(err.message) } finally { setLoading(false) } }
  return <main><Header /><div className="intro"><span className="eyebrow">Understand → quantify</span><h2>See your USD payable in INR.</h2><p>Upload a simple exposure file, or try the $50,000 supplier-payment demo.</p></div><UploadData onDemo={() => analyze(DEMO)} onUpload={handleUpload} loading={loading} />{loading && <Loading label="Calculating exposure…" />}{error && <p className="error" role="alert">{error}. Is the API running on port 8000?</p>}<RiskAnalysis result={result} /><Footer /></main>
}
