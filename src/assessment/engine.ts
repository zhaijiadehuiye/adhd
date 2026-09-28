import type {
  AnswerMap,
  AnswerValue,
  DimensionId,
  EngineContext,
  StageId,
} from './types'
import { QUESTIONS } from './questions'
import { MODULES } from './modules'
import { scoreItem } from './scoring'

/* -----------------------------------------------------------------
   Build an EngineContext over the current (partial) answers.
----------------------------------------------------------------- */

export function createEngineContext(answers: AnswerMap): EngineContext {
  const dimCache = {} as Record<DimensionId, { sum: number; w: number; count: number }>

  for (const q of QUESTIONS) {
    const s = scoreItem(q, answers[q.id])
    if (s === null) continue
    const targets = q.dims ?? (q.dim ? [{ dim: q.dim, weight: 1 }] : [])
    for (const t of targets) {
      const w = t.weight ?? 1
      const e = (dimCache[t.dim] ??= { sum: 0, w: 0, count: 0 })
      e.sum += s * w
      e.w += w
      e.count += 1
    }
  }

  const itemScore = (id: string): number | null => {
    const q = QUESTIONS.find((x) => x.id === id)
    if (!q) return null
    return scoreItem(q, answers[id])
  }

  return {
    answers,
    itemScore,
    answer: (id: string): AnswerValue | undefined => answers[id],
    dimPreview: (dim: DimensionId): number => {
      const e = dimCache[dim]
      return e ? e.sum / e.w : 0
    },
    dimItemCount: (dim: DimensionId): number => dimCache[dim]?.count ?? 0,
    isAnswered: (id: string): boolean => answers[id] !== undefined,
  }
}

/* -----------------------------------------------------------------
   Adaptive path builder
   Stages run in order; conditional modules are evaluated at the
   point their stage is reached (all earlier stages answered).
----------------------------------------------------------------- */

const STAGE_ORDER: StageId[] = [
  'broad',
  'timeline',
  'deep',
  'confound',
  'impairment',
  'closing',
]

export function buildPath(answers: AnswerMap): string[] {
  const ctx = createEngineContext(answers)
  const path: string[] = []

  for (const stage of STAGE_ORDER) {
    if (stage === 'deep' || stage === 'confound') {
      for (const mod of MODULES.filter((m) => m.stage === stage)) {
        if (mod.trigger(ctx)) path.push(...mod.items)
      }
    } else {
      for (const q of QUESTIONS) {
        if (q.stage === stage && !q.moduleId) path.push(q.id)
      }
    }
  }
  return path
}

/* -----------------------------------------------------------------
   Stage metadata for the progress header
----------------------------------------------------------------- */

export const STAGE_META: Record<StageId, { label: string }> = {
  broad: { label: '宽幅筛查' },
  timeline: { label: '发展史时间线' },
  deep: { label: '特征深入分析' },
  confound: { label: '鉴别分析' },
  impairment: { label: '功能损害评估' },
  closing: { label: '收尾' },
}

/** Average seconds per item, used for the time estimate. */
const SECONDS_PER_ITEM = 16

export function estimateRemainingMinutes(
  path: string[],
  currentIndex: number,
): number {
  const remaining = Math.max(0, path.length - currentIndex - 1)
  return Math.max(1, Math.ceil((remaining * SECONDS_PER_ITEM) / 60))
}
