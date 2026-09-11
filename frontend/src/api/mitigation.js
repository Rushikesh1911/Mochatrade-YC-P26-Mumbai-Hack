import { apiFetch } from './client'

export function mitigateExposure(exposure) {
  return apiFetch('/api/mitigate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(exposure) })
}
