import { afterEach, describe, expect, it, vi } from 'vitest'
import { analyzeExposure, uploadExposure } from '../../src/api/exposures'

afterEach(() => vi.unstubAllGlobals())

describe('exposure API client', () => {
  it('posts an analysis payload as JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ risk_score: 36 }) })
    vi.stubGlobal('fetch', fetchMock)

    await expect(analyzeExposure({ amount: 50_000 })).resolves.toEqual({ risk_score: 36 })
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/api/analyze', expect.objectContaining({ method: 'POST', headers: { 'Content-Type': 'application/json' } }))
  })

  it('surfaces a server validation error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ detail: 'only USD exposures are supported in this prototype' }) }))

    await expect(analyzeExposure({ currency: 'EUR' })).rejects.toThrow('only USD exposures are supported in this prototype')
  })

  it('sends files as multipart form data', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ rows_processed: 1 }) })
    vi.stubGlobal('fetch', fetchMock)

    await uploadExposure(new File(['amount,currency,days_to_payment\n1,USD,1'], 'exposure.csv', { type: 'text/csv' }), 87)
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/api/upload?base_rate=87', expect.objectContaining({ method: 'POST', body: expect.any(FormData) }))
  })
})
