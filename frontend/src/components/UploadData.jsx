import { useRef } from 'react'

export default function UploadData({ onDemo, onUpload, loading }) {
  const input = useRef()
  return <section className="card upload-card">
    <span className="eyebrow">1 · Provide data</span>
    <h2>Start with a payable</h2>
    <p>Upload a CSV/Excel file or load the demo exposure.</p>
    <div className="actions">
      <button onClick={onDemo} disabled={loading}>Use demo data</button>
      <button className="secondary" onClick={() => input.current.click()} disabled={loading}>Upload CSV / Excel</button>
      <input ref={input} hidden type="file" accept=".csv,.xlsx,.xls" onChange={(event) => event.target.files[0] && onUpload(event.target.files[0])} />
    </div>
  </section>
}
