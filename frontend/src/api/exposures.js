import { apiFetch } from './client'

export function analyzeExposure(exposure) {
  return apiFetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exposure),
  })
}

export function uploadExposure(file, baseRate) {
  const form = new FormData()
  form.append('file', file)
  return apiFetch(`/api/upload?base_rate=${encodeURIComponent(baseRate)}`, { method: 'POST', body: form })
}
