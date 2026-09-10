const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options)
  const body = await response.json()
  if (!response.ok) throw new Error(body.detail ?? 'Request failed')
  return body
}
