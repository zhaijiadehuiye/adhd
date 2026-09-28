import type {
  AnswerMap,
  AnswerValue,
  DimensionId,
  Item,
} from '@/assessment/types'
import { getQuestion } from '@/assessment/questions'
import { buildPath } from '@/assessment/engine'
import { IMPAIRMENT_DOMAINS } from '@/assessment/impairment'

/* Persona = target difficulty per dimension + explicit non-scale answers */

export interface Persona {
  id: string
  dim: Partial<Record<DimensionId, number>>
  timeline: Record<string, string>
  choice: Record<string, string>
  multi: Record<string, string[]>
  impairment: number
}

function levelFor(item: Item, p: Persona): number {
  if (item.dims) {
    const vals = item.dims.map((d) => p.dim[d.dim] ?? 0)
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }
  return item.dim ? (p.dim[item.dim] ?? 0) : 0
}

function nearest(options: Array<{ value: number }>, target: number): number {
  return options.reduce((best, o) =>
    Math.abs(o.value - target) < Math.abs(best.value - target) ? o : best,
  ).value
}

function answerItem(item: Item, p: Persona): AnswerValue {
  const lvl = levelFor(item, p)

  switch (item.type) {
    case 'frequency':
    case 'agreement':
      return nearest(item.options ?? [], lvl)

    case 'scenario':
      return nearest(item.cards ?? [], lvl)

    case 'timeline':
      return p.timeline[item.id] ?? 'never'

    case 'choice':
      return p.choice[item.id] ?? 'unknown'

    case 'multi':
      return p.multi[item.id] ?? [item.noneValue ?? 'none']

    case 'slider': {
      if (item.id === 'b_sleep_hours') return 8.5 - lvl * 4
      if (item.id === 'c_media_time') return lvl * 7
      return lvl
    }

    case 'text':
      return ''

    case 'impairmentGrid': {
      const out: Record<string, number> = {}
      for (const d of IMPAIRMENT_DOMAINS) out[d.id] = p.impairment
      return out
    }
  }
}

/** Walk the adaptive path to completion, answering each new item. */
export function simulate(p: Persona): AnswerMap {
  let answers: AnswerMap = {}
  for (let guard = 0; guard < 120; guard += 1) {
    const path = buildPath(answers)
    const next = path.find((id) => answers[id] === undefined)
    if (!next) break
    const item = getQuestion(next)
    answers = { ...answers, [next]: answerItem(item, p) }
  }
  return answers
}

/* ------------------------------------------------------------------ */

export const PERSONAS: Persona[] = [
  // A · childhood ADHD
  {
    id: 'A_childhood_adhd',
    dim: {
      attention: 0.9,
      executive: 0.85,
      impulsivity: 0.7,
      socialCommunication: 0.1,
      socialIntuition: 0.1,
      routine: 0.2,
      sensory: 0.2,
      emotional: 0.3,
      sleep: 0.15,
      connection: 0.2,
    },
    timeline: {
      t_attn_start: 'primary',
      t_others: 'primary',
      t_social_start: 'never',
      t_sleep_start: 'never',
      t_function_decline: 'high',
    },
    choice: { g_good_before: 'always', g_age: '25-34' },
    multi: {
      t_child_patterns: ['hyper', 'careless'],
      b_settings: ['everywhere'],
      g_priority: ['attention', 'executive', 'assessment'],
    },
    impairment: 0.6,
  },

  // B · ASD
  {
    id: 'B_asd',
    dim: {
      attention: 0.3,
      executive: 0.3,
      impulsivity: 0.1,
      socialCommunication: 0.8,
      socialIntuition: 0.85,
      routine: 0.8,
      sensory: 0.8,
      emotional: 0.25,
      sleep: 0.2,
      connection: 0.35,
    },
    timeline: {
      t_attn_start: 'never',
      t_others: 'never',
      t_social_start: 'primary',
      t_sleep_start: 'never',
      t_function_decline: 'earlyAdult',
    },
    choice: { g_good_before: 'always', g_age: '25-34' },
    multi: {
      t_child_patterns: ['rigid', 'special', 'sensory', 'change'],
      b_settings: ['none'],
      g_priority: ['social', 'sensory', 'assessment'],
    },
    impairment: 0.55,
  },

  // C · dual
  {
    id: 'C_dual',
    dim: {
      attention: 0.8,
      executive: 0.75,
      impulsivity: 0.6,
      socialCommunication: 0.75,
      socialIntuition: 0.8,
      routine: 0.7,
      sensory: 0.7,
      emotional: 0.4,
      sleep: 0.3,
      connection: 0.35,
    },
    timeline: {
      t_attn_start: 'primary',
      t_others: 'primary',
      t_social_start: 'primary',
      t_sleep_start: 'never',
      t_function_decline: 'high',
    },
    choice: { g_good_before: 'always', g_age: '25-34' },
    multi: {
      t_child_patterns: ['rigid', 'special', 'sensory', 'hyper', 'careless'],
      b_settings: ['everywhere'],
      g_priority: ['attention', 'social', 'assessment'],
    },
    impairment: 0.65,
  },

  // D · recent attention decline + severe sleep loss
  {
    id: 'D_recent_sleep',
    dim: {
      attention: 0.85,
      executive: 0.6,
      impulsivity: 0.2,
      socialCommunication: 0.15,
      socialIntuition: 0.15,
      routine: 0.1,
      sensory: 0.1,
      emotional: 0.55,
      sleep: 0.95,
      connection: 0.35,
    },
    timeline: {
      t_attn_start: 'last6m',
      t_others: 'never',
      t_social_start: 'never',
      t_sleep_start: 'recentYears',
      t_function_decline: 'last6m',
    },
    choice: { g_good_before: 'recent', g_age: '25-34' },
    multi: {
      t_child_patterns: ['none'],
      b_settings: ['work', 'home'],
      g_priority: ['sleep', 'attention', 'assessment'],
    },
    impairment: 0.35,
  },

  // E · long loneliness + social withdrawal, no childhood ASD
  {
    id: 'E_lonely',
    dim: {
      attention: 0.3,
      executive: 0.3,
      impulsivity: 0.1,
      socialCommunication: 0.6,
      socialIntuition: 0.35,
      routine: 0.15,
      sensory: 0.15,
      emotional: 0.55,
      sleep: 0.25,
      connection: 0.85,
    },
    timeline: {
      t_attn_start: 'never',
      t_others: 'never',
      t_social_start: 'recentYears',
      t_sleep_start: 'never',
      t_function_decline: 'never',
    },
    choice: { g_good_before: 'recent', g_age: '35-44' },
    multi: {
      t_child_patterns: ['none'],
      b_settings: ['none'],
      g_priority: ['connection', 'social'],
    },
    impairment: 0.2,
  },

  // F · no abnormalities
  {
    id: 'F_healthy',
    dim: {
      attention: 0.1,
      executive: 0.1,
      impulsivity: 0.1,
      socialCommunication: 0.1,
      socialIntuition: 0.1,
      routine: 0.1,
      sensory: 0.1,
      emotional: 0.1,
      sleep: 0.1,
      connection: 0.1,
    },
    timeline: {
      t_attn_start: 'never',
      t_others: 'never',
      t_social_start: 'never',
      t_sleep_start: 'never',
      t_function_decline: 'never',
    },
    choice: { g_good_before: 'always', g_age: '25-34' },
    multi: {
      t_child_patterns: ['none'],
      b_settings: ['none'],
      g_priority: ['curious'],
    },
    impairment: 0,
  },
]
