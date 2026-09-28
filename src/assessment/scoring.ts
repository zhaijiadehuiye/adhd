import type {
  AnswerValue,
  DimensionId,
  Item,
} from './types'
import { QUESTIONS } from './questions'

/* -----------------------------------------------------------------
   Answer normalization
   Every scored item resolves to 0..1 (more = more difficulty).
   Timeline / text items are not dimension-scored.
----------------------------------------------------------------- */

/** Per-item choice → score maps (single-choice items) */
const CHOICE_SCORES: Record<string, Record<string, number>> = {
  c_friends: { '0': 1, '1': 0.67, '2-3': 0.33, '4+': 0 },
  c_contact: { rarely: 1, monthly: 0.6, weekly: 0.3, daily: 0 },
}

export function scoreItem(item: Item, value: AnswerValue | undefined): number | null {
  if (value === undefined) return null

  switch (item.type) {
    case 'frequency':
    case 'agreement':
    case 'scenario': {
      if (typeof value !== 'number') return null
      return clamp01(value)
    }

    case 'slider': {
      if (typeof value !== 'number') return null
      return clamp01(item.slider?.scoreMap ? item.slider.scoreMap(value) : value)
    }

    case 'choice': {
      if (typeof value !== 'string') return null
      return CHOICE_SCORES[item.id]?.[value] ?? null
    }

    case 'multi': {
      const selected = Array.isArray(value) ? value : []
      if (item.noneValue && selected.includes(item.noneValue)) return 0
      const options = item.multiOptions ?? []
      const positive = options.filter((o) => (o.weight ?? 1) > 0)
      const total = positive.reduce((s, o) => s + (o.weight ?? 1), 0)
      if (total === 0) return 0
      const got = positive
        .filter((o) => selected.includes(o.value))
        .reduce((s, o) => s + (o.weight ?? 1), 0)
      return clamp01(got / total)
    }

    case 'impairmentGrid': {
      if (!value || typeof value !== 'object') return null
      const map = value as Record<string, number>
      const vals = Object.values(map)
      if (vals.length === 0) return null
      return clamp01(vals.reduce((s, v) => s + v, 0) / vals.length)
    }

    case 'timeline':
    case 'text':
      return null
  }
}

export function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0
  return Math.min(1, Math.max(0, n))
}

/* -----------------------------------------------------------------
   Dimension aggregation
----------------------------------------------------------------- */

interface Accumulator {
  weighted: number
  weight: number
  count: number
}

export function dimensionScores(
  answers: Record<string, AnswerValue>,
): Record<DimensionId, number> {
  const acc = {} as Record<DimensionId, Accumulator>

  for (const item of QUESTIONS) {
    const score = scoreItem(item, answers[item.id])
    if (score === null) continue
    const targets = item.dims ?? (item.dim ? [{ dim: item.dim, weight: 1 }] : [])
    for (const t of targets) {
      const w = t.weight ?? 1
      const a = (acc[t.dim] ??= { weighted: 0, weight: 0, count: 0 })
      a.weighted += score * w
      a.weight += w
      a.count += 1
    }
  }

  const out = {} as Record<DimensionId, number>
  for (const item of QUESTIONS) {
    // ensure every key exists
    if (item.dim) out[item.dim] ??= 0
    item.dims?.forEach((d) => (out[d.dim] ??= 0))
  }
  ;(Object.keys(acc) as DimensionId[]).forEach((dim) => {
    const a = acc[dim]
    out[dim] = Math.round((a.weighted / a.weight) * 100)
  })
  return out
}

/** Items in the bank that contribute to a given dimension. */
export function itemsForDimension(dim: DimensionId): Item[] {
  return QUESTIONS.filter(
    (q) => q.dim === dim || q.dims?.some((d) => d.dim === dim),
  )
}
