import type { AnswerMap, TimelineMark } from './types'
import { createEngineContext } from './engine'

function resolvePeriod(value: unknown): string | null {
  if (typeof value !== 'string') return null
  if (value === 'never') return null
  return value
}

function selected(answers: AnswerMap, id: string): string[] {
  const v = answers[id]
  return Array.isArray(v) ? v : []
}

/* ==================================================================
   Build the symptom timeline — when each category first appeared.
   Direct onset items win; sensory/routine are inferred from the
   childhood patterns question when no direct item exists.
================================================================== */

export function buildTimeline(answers: AnswerMap): TimelineMark[] {
  const ctx = createEngineContext(answers)
  const childhood = selected(answers, 't_child_patterns')

  const sensoryPeriod: string | null = childhood.includes('sensory')
    ? 'primary'
    : ctx.dimPreview('sensory') >= 0.4
      ? 'recentYears'
      : null

  const routinePeriod: string | null = childhood.some((v) =>
    ['rigid', 'special', 'change'].includes(v),
  )
    ? 'primary'
    : ctx.dimPreview('routine') >= 0.4
      ? 'recentYears'
      : null

  const marks: Array<[string, string, string | null]> = [
    ['attention', '注意力 / 执行功能', resolvePeriod(answers.t_attn_start)],
    ['social', '社交困惑', resolvePeriod(answers.t_social_start)],
    ['sensory', '感官敏感', sensoryPeriod],
    ['routine', '固定模式 / 兴趣', routinePeriod],
    ['sleep', '睡眠 / 作息', resolvePeriod(answers.t_sleep_start)],
    ['function', '生活功能下降', resolvePeriod(answers.t_function_decline)],
  ]

  return marks.map(([categoryId, categoryLabel, periodId]) => ({
    categoryId,
    categoryLabel,
    periodId,
  }))
}
