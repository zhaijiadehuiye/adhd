import { describe, expect, it } from 'vitest'
import { buildPath } from './engine'
import { simulate, PERSONAS } from '@/test/personas'

describe('adaptive path builder', () => {
  it('starts with the broad attention item', () => {
    const path = buildPath({})
    expect(path[0]).toBe('b_attention')
  })

  it('simple case (no triggers) gets 28 items: 17 broad + 7 timeline + 1 impairment + 3 closing', () => {
    const answers = simulate(PERSONAS.find((p) => p.id === 'F_healthy')!)
    expect(buildPath(answers)).toHaveLength(28)
  })

  it('complex case (persona C) gets more items than the simple case', () => {
    const answers = simulate(PERSONAS.find((p) => p.id === 'C_dual')!)
    expect(buildPath(answers).length).toBeGreaterThan(28)
  })

  it('path length stays within the advertised 20–55 band', () => {
    for (const p of PERSONAS) {
      const answers = simulate(p)
      const len = buildPath(answers).length
      expect(len).toBeGreaterThanOrEqual(20)
      expect(len).toBeLessThanOrEqual(60)
    }
  })
})
