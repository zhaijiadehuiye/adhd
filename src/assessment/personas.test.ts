import { describe, expect, it } from 'vitest'
import { evaluateEvidence } from './rules'
import { PERSONAS, simulate } from '@/test/personas'
import { buildPath } from './engine'

describe('six persona routes produce distinct, clinically sensible results', () => {
  const results = PERSONAS.map((p) => {
    const answers = simulate(p)
    const path = buildPath(answers)
    const unanswered = path.filter((id) => answers[id] === undefined)
    expect(unanswered, `${p.id} should finish every question`).toEqual([])
    return { p, result: evaluateEvidence(answers) }
  })

  const byId = Object.fromEntries(results.map((r) => [r.p.id, r.result]))

  it('A · childhood ADHD → adhd outcome, prominent ADHD signal', () => {
    const r = byId.A_childhood_adhd!
    expect(r.outcome).toBe('adhd')
    expect(['high', 'moderate']).toContain(r.signals.adhd)
    expect(['none', 'slight']).toContain(r.signals.asd)
  })

  it('B · ASD → asd outcome, prominent autistic signal', () => {
    const r = byId.B_asd!
    expect(r.outcome).toBe('asd')
    expect(['high', 'moderate']).toContain(r.signals.asd)
    expect(['none', 'slight']).toContain(r.signals.adhd)
  })

  it('C · dual → dual outcome with both prominent', () => {
    const r = byId.C_dual!
    expect(r.outcome).toBe('dual')
    expect(['high', 'moderate']).toContain(r.signals.adhd)
    expect(['high', 'moderate']).toContain(r.signals.asd)
  })

  it('D · recent decline + sleep loss → contextual, NOT an ADHD label', () => {
    const r = byId.D_recent_sleep!
    expect(r.outcome).toBe('contextual')
    expect(['none', 'slight']).toContain(r.signals.adhd)
    // sleep must appear as a confounder
    expect(r.confounders.some((c) => c.id === 'sleep')).toBe(true)
  })

  it('E · lonely / withdrawn → not an ASD label', () => {
    const r = byId.E_lonely!
    expect(['contextual', 'neither']).toContain(r.outcome)
    expect(['none', 'slight']).toContain(r.signals.asd)
  })

  it('F · healthy → neither, level 1, no manufactured disorder', () => {
    const r = byId.F_healthy!
    expect(r.outcome).toBe('neither')
    expect(r.actionLevel).toBe(1)
    expect(r.dimensionScores.impairment).toBe(0)
  })

  it('all six outcomes are not identical', () => {
    const set = new Set(results.map((r) => r.result.outcome))
    expect(set.size).toBeGreaterThanOrEqual(4)
  })
})
