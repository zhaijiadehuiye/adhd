import { describe, expect, it } from 'vitest'
import { scoreItem, dimensionScores } from './scoring'
import { getQuestion } from './questions'

describe('scoreItem', () => {
  it('maps frequency answers directly', () => {
    const item = getQuestion('b_attention')
    expect(scoreItem(item, 0.75)).toBe(0.75)
  })

  it('severe sleep deprivation (4h) scores 1; adequate sleep (9h) scores 0', () => {
    const item = getQuestion('b_sleep_hours')
    expect(scoreItem(item, 4)).toBe(1)
    expect(scoreItem(item, 9)).toBe(0)
  })

  it('multi "none" scores 0', () => {
    const item = getQuestion('t_child_patterns')
    expect(scoreItem(item, ['none'])).toBe(0)
  })

  it('multi selections scale by positive options', () => {
    const item = getQuestion('t_child_patterns')
    // 2 of 6 positive flags → ~0.33
    expect(scoreItem(item, ['hyper', 'careless'])).toBeCloseTo(2 / 6, 5)
  })

  it('impairment grid averages all domain values', () => {
    const item = getQuestion('i_grid')
    const grid = { a: 0.5, b: 1, c: 0 }
    expect(scoreItem(item, grid)).toBeCloseTo(0.5, 5)
  })

  it('timeline items are not dimension-scored', () => {
    const item = getQuestion('t_attn_start')
    expect(scoreItem(item, 'primary')).toBeNull()
  })
})

describe('dimensionScores', () => {
  it('returns all eleven dimensions in 0..100', () => {
    const scores = dimensionScores({})
    expect(Object.keys(scores)).toHaveLength(11)
    for (const v of Object.values(scores)) {
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(100)
    }
  })
})
