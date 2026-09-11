import { apiFetch } from './client'

export function simulateExposure(exposure) {
  return apiFetch('/api/simulate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(exposure) })
}
