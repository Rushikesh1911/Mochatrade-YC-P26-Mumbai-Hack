import { describe, expect, it } from 'vitest'
import { inr, usd } from '../../src/utils/formatters'

describe('formatters', () => {
  it('formats the Phase 1 demo exposure for Indian and US currency', () => {
    expect(inr.format(4_350_000)).toBe('₹43,50,000')
    expect(usd.format(50_000)).toBe('$50,000')
  })
})
